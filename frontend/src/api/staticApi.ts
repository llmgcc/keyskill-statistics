import {
  Category,
  Chart,
  Currency,
  KeySkill,
  KeySkillServer,
  SalaryChart,
  Stats,
} from '@/interfaces';
import { API } from '@/interfaces/api';
import axios from 'axios';

import { Experience } from '@/config/experience';

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
    const response = await fetch('/static-api/main-page/stats.json');
    return response.json();
  }

  async currencyList(): Promise<Currency[]> {
    const response = await fetch('/static-api/main-page/currency.json');
    return response.json();
  }

  async categoriesList(
    period?: number,
    experience?: Experience,
  ): Promise<Category[]> {
    const response = await fetch(
      `/static-api/technologies/technologies_${period}_${experience ?? 'any'}.json`,
    );
    return response.json();
  }

  async domainsList(
    period?: number,
    experience?: Experience,
  ): Promise<Category[]> {
    const response = await fetch(
      `/static-api/categories/categories_${period}_${experience ?? 'any'}.json`,
    );
    return response.json();
  }

  async skillsList(
    experience?: Experience,
    period?: number,
    limit?: number,
    offset?: number,
  ): Promise<KeySkillServer> {
    const skills = await getSkills(experience, period);
    return {
      skills: skills.slice(
        offset ?? 0,
        (offset ?? 0) + (limit ?? skills.length),
      ),
      rows: skills.length,
    };
  }

  async skillPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]> {
    const response = await axios.get(
      `/static-api/charts/skills_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as Chart[];
  }

  async domainPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]> {
    const response = await axios.get(
      `/static-api/charts/categories_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as Chart[];
  }

  async technologyPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]> {
    const response = await axios.get(
      `/static-api/charts/technologies_${period}_${experience ?? 'any'}.json`,
    );
    return response.data[name] as Chart[];
  }

  async technologySalaryPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/technologies_salary_${period}_${experience ?? 'any'}.json`,
    );
    return { max_salary: 1, chart: response.data[name][0] };
  }

  async categorySalaryPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/categories_salary_${period}_${experience ?? 'any'}.json`,
    );
    return { max_salary: 1, chart: response.data[name][0] };
  }

  async salaryPlot(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart> {
    const response = await axios.get(
      `/static-api/charts/salary_${period}_${experience ?? 'any'}.json`,
    );
    return { max_salary: 1, chart: response.data[name] };
  }

  async highlightsHighestSalary(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .sort((a, b) => (b?.average_salary ?? 0) - (a?.average_salary ?? 0))
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsLowestSalary(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.average_salary)
      .sort((a, b) => (a?.average_salary ?? 0) - (b?.average_salary ?? 0))
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsUndefinedSalary(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);

    return skills
      .filter((s) => !s.average_salary)
      .sort((a, b) => a.place - b.place)
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsGainers(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.prev_count)
      .sort(
        (a, b) => change(b.count, b.prev_count) - change(a.count, a.prev_count),
      )
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsDecliners(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => s.prev_count)
      .sort(
        (a, b) => change(a.count, a.prev_count) - change(b.count, b.prev_count),
      )
      .slice(0, HIGHLIGHTS_LIMIT);
  }

  async highlightsNewSkills(
    experience?: Experience,
    period?: number,
  ): Promise<KeySkill[]> {
    const skills = await getSkills(experience, period);
    return skills
      .filter((s) => !s.prev_count)
      .sort((a, b) => b.count - a.count)
      .slice(0, HIGHLIGHTS_LIMIT);
  }
}
