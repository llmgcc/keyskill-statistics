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
import { API } from '@/interfaces/api';
import { Experience } from '@/config/experience';

import { axiosHTTP as axios } from './axiosHttp';

export class ServerAPI implements API {
  async mainStats(): Promise<Stats> {
    const response = await axios.get('/api/general/stats');
    return response.data;
  }

  async skill(skillName: string): Promise<KeySkill> {
    const response = await axios.get(`/api/key-skills/skill/${skillName}`);
    return response.data;
  }

  async skillDetails(
    skillName: string,
    period: number,
    experience?: Experience
  ): Promise<KeySkill> {
    const response = await axios.get(
      `/api/key-skills/skill_details/${skillName}`,
      {
        params: {
          days_period: period,
          experience,
        },
      }
    );
    return response.data;
  }

  async domain(
    domain: string,
    period: number,
    experience?: Experience
  ): Promise<Category> {
    const response = await axios.get(`/api/domains/${domain}`, {
      params: {
        period,
        experience,
      },
    });
    return response.data;
  }

  async category(
    category: string,
    period: number,
    experience?: Experience
  ): Promise<Category> {
    const response = await axios.get(`/api/categories/${category}`, {
      params: {
        period,
        experience,
      },
    });
    return response.data;
  }

  async currencyList(): Promise<Currency[]> {
    const response = await axios.get('/api/general/currency');
    return response.data;
  }

  async categoriesList(
    period: number = 10,
    experience?: Experience
  ): Promise<Category[]> {
    const response = await axios.get('/api/categories/list', {
      params: {
        period,
        experience,
      },
    });
    return response.data;
  }

  async domainsList(
    period: number = 10,
    experience?: Experience
  ): Promise<Category[]> {
    const response = await axios.get('/api/domains/list', {
      params: {
        period,
        experience,
      },
    });
    return response.data;
  }

  async skillPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number
  ): Promise<TrendChart> {
    const response = await axios.get('/api/charts/skill', {
      params: {
        skill_name: name,
        period,
        experience,
        number_of_bins: numberOfBins,
      },
    });
    return response.data as TrendChart;
  }

  async domainPlot(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<Chart[]> {
    const response = await axios.get('/api/charts/category', {
      params: {
        category: name,
        period,
        experience,
      },
    });
    return response.data as Chart[];
  }

  async technologyPlot(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<Chart[]> {
    const response = await axios.get('/api/charts/technology', {
      params: {
        technology: name,
        period,
        experience,
      },
    });
    return response.data as Chart[];
  }

  async salaryPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/salary', {
      params: {
        skill_name: name,
        period,
        experience,
        number_of_bins: numberOfBins,
      },
    });
    return response.data;
  }

  async categorySalaryPlot(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/category-salary', {
      params: {
        category: name,
        period,
        experience,
      },
    });
    return response.data;
  }

  async technologySalaryPlot(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/technology-salary', {
      params: {
        technology: name,
        period,
        experience,
      },
    });
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
    skillName?: string
    // orderBy?: SkillsOrderBy
  ): Promise<KeySkillServer> {
    const response = await axios.get('/api/key-skills/list', {
      params: {
        experience,
        period,
        limit,
        offset,
        domain,
        domain_strict: domainStrict,
        category,
        categoryStrict,
        skill_name: skillName || null,
      },
    });
    return response.data;
  }

  async highlightsHighestSalary(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/highest-salary', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }

  async highlightsLowestSalary(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/lowest-salary', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }

  async highlightsUndefinedSalary(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/undefined-salary', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }

  async highlightsGainers(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/gainers', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }

  async highlightsDecliners(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/decliners', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }

  async highlightsNewSkills(
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get('/api/highlights/new', {
      params: {
        experience,
        period,
      },
    });
    return response.data;
  }
}
