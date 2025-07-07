import {
  Category,
  Chart,
  Currency,
  KeySkill,
  KeySkillServer,
  SalaryChart,
  Stats,
  TrendChart,
} from '@/interfaces';
import { API, SkillsOrderBy } from '@/interfaces/api';

import { Experience } from '@/config/experience';

import { axiosHTTP as axios } from './axiosHttp';
import { filterSkills, sortSkills } from './utils';

const HIGHLIGHTS_LIMIT = 5;

async function getSkills(
  experience?: Experience,
  period?: number,
): Promise<KeySkill[]> {
  const path = `skills_${period}_${experience ?? 'any'}.json`;
  const response = await axios.get(`/static-api/skills/${path}`);
  return response.data;
}

function change(current: number, prev?: number) {
  if (!prev) return 0;
  return ((current - prev) / prev) * 100;
}

export class StaticAPI implements API {
  async mainStats(): Promise<Stats> {
    const response = await axios.get('/static-api/general/stats.json');
    return response.data;
  }

  async skill() // skillName: string,
  // period: number,
  // experience?: Experience,
  : Promise<KeySkill> {
    return new Promise(() => []);
  }

  async currencyList(): Promise<Currency[]> {
    const response = await axios.get('/static-api/general/currency.json');
    return response.data;
  }

  async categoriesList(
    period: number,
    experience?: Experience,
  ): Promise<Category[]> {
    const response = await axios.get(
      `/static-api/categories/categories_${period}_${experience ?? 'any'}.json`,
    );
    return response.data;
  }

  async domainsList(
    period: number,
    experience?: Experience,
  ): Promise<Category[]> {
    const response = await axios.get(
      `/static-api/domains/domains_${period}_${experience ?? 'any'}.json`,
    );
    return response.data;
  }

  async skillsList(
    limit: number,
    offset: number,
    period: number,
    experience?: Experience,
    domain?: string,
    domainStrict?: boolean,
    category?: string,
    categoryStrict?: boolean,
    skillName?: string,
    orderBy?: SkillsOrderBy,
  ): Promise<KeySkillServer> {
    const skills = await getSkills(experience, period);

    const filteredSkills = filterSkills(
      skills,
      domain,
      domainStrict,
      category,
      categoryStrict,
      skillName,
    );

    const sortedSkills = orderBy
      ? sortSkills(filteredSkills, orderBy)
      : filteredSkills;

    return {
      skills: sortedSkills.slice(
        offset ?? 0,
        (offset ?? 0) + (limit ?? skills.length),
      ),
      rows: sortedSkills.length,
    };
  }

  async skillPlot(
    name: string,
    period: number,
    experience?: Experience,
    // numberOfBins?: number
  ): Promise<TrendChart> {
    const response = await axios.get(
      `/static-api/charts/skills_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as TrendChart;
  }

  async domainPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]> {
    const response = await axios.get(
      `/static-api/charts/domains_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as Chart[];
  }

  async technologyPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]> {
    const response = await axios.get(
      `/static-api/charts/categories_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as Chart[];
  }

  async technologySalaryPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/categories_salary_${period}_${experience ?? 'any'}.json`,
    );
    return {
      chart: response.data[name][0],
      salary_from: 0,
      salary_to: 1_000_000,
    };
  }

  async categorySalaryPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/domains_salary_${period}_${experience ?? 'any'}.json`,
    );
    return {
      chart: response.data[name][0],
      salary_from: 0,
      salary_to: 1_000_000,
    };
  }

  async salaryPlot(
    name: string,
    period: number,
    experience?: Experience,
    // numberOfBins: number,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/salary_${period}_${experience ?? 'any'}.json`,
    );
    return { chart: response.data[name], salary_from: 0, salary_to: 1_000_000 };
  }

  async highlightsHighestSalary(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .sort((a, b) => (b?.average_salary ?? 0) - (a?.average_salary ?? 0))
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsLowestSalary(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.average_salary)
      .sort((a, b) => (a?.average_salary ?? 0) - (b?.average_salary ?? 0))
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsUndefinedSalary(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);

    return skills
      .filter((s) => !s.average_salary)
      .sort((a, b) => a.place - b.place)
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsGainers(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.prev_count && s.prev_count >= 5)
      .sort(
        (a, b) => change(b.count, b.prev_count) - change(a.count, a.prev_count),
      )
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsDecliners(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.prev_count && s.count >= 5)
      .sort(
        (a, b) => change(a.count, a.prev_count) - change(b.count, b.prev_count),
      )
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsNewSkills(
    period: number,
    experience?: Experience,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => !s.prev_count)
      .sort((a, b) => b.count - a.count)
      .slice(0, HIGHLIGHTS_LIMIT);
  }
}
