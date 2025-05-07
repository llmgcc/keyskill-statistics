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
    const response = await axios.get('/static-api/general/stats.json');
    return response.data;
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
      `/static-api/technologies/technologies_${period}_${experience ?? 'any'}.json`,
    );
    return response.data;
  }

  async domainsList(
    period: number,
    experience?: Experience,
  ): Promise<Category[]> {
    const response = await axios.get(
      `/static-api/categories/categories_${period}_${experience ?? 'any'}.json`,
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
  ): Promise<KeySkillServer> {
    const skills = await getSkills(experience, period);

    const getCategoryConfidence = (
      skill: KeySkill,
      category: string,
      key: 'categories' | 'technologies',
    ) => {
      const foundCategory = skill[key].find((c) => c.name == category);

      const strictMode = key == 'categories' ? domainStrict : categoryStrict;
      if (strictMode) {
        const maxConfidence = skill[key].reduce(
          (a, b) => Math.max(a, b.confidence),
          0,
        );
        const maxConfidenceCategory = skill[key].find(
          (c) => c.confidence == maxConfidence,
        );
        if (maxConfidenceCategory?.name !== category) {
          return null;
        }
        return maxConfidenceCategory.confidence;
      } else {
        return foundCategory?.confidence ?? null;
      }
    };

    let skillsData = skills;
    if (domain) {
      skillsData = skillsData.filter(
        (c) => getCategoryConfidence(c, domain, 'categories') !== null,
      );
    }
    if (category) {
      skillsData = skillsData.filter(
        (c) => getCategoryConfidence(c, category, 'technologies') !== null,
      );
    }

    if (skillName) {
      skillsData = skillsData.filter((c) =>
        c.name.toLowerCase().includes(skillName.toLowerCase()),
      );
    }

    return {
      skills: skillsData.slice(
        offset ?? 0,
        (offset ?? 0) + (limit ?? skills.length),
      ),
      rows: skillsData.length,
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
      .filter((s) => s.prev_count)
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
      .filter((s) => s.prev_count)
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
