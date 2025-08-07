import {
  Category,
  Chart,
  Currency,
  KeySkill,
  KeySkillServer,
  SalaryChart,
  ServerFilters,
  ServerOrderBy,
  Stats,
  TrendChart,
} from '@/interfaces';
import { API, SkillsOrderBy } from '@/interfaces/api';
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

  async relatedSkills(
    skillName: string,
    period: number,
    experience?: Experience,
    order_by?: {
      order_by: string;
      descending: boolean;
    },
    limit: number = 10,
    offset: number = 0
  ): Promise<KeySkillServer> {
    const response = await axios.get(`/api/key-skills/related/${skillName}`, {
      params: {
        days_period: period,
        experience,
        order_by: order_by?.order_by,
        descending: order_by?.descending,
        limit: limit,
        offset: offset,
      },
    });
    return response.data as Promise<KeySkillServer>;
  }

  async similarSkills(
    skillName: string,
    period: number,
    experience?: Experience,
    order_by?: {
      order_by: string;
      descending: boolean;
    },
    limit: number = 10,
    offset: number = 0
  ): Promise<KeySkillServer> {
    const response = await axios.get(`/api/key-skills/similar/${skillName}`, {
      params: {
        days_period: period,
        experience,
        order_by: order_by?.order_by,
        descending: order_by?.descending,
        limit: limit,
        offset: offset,
      },
    });
    return response.data as Promise<KeySkillServer>;
  }

  async skillDetails(
    skillName: string,
    period: number,
    experience?: Experience
  ): Promise<KeySkill> {
    const response = await axios.get(`/api/key-skills/details/${skillName}`, {
      params: {
        days_period: period,
        experience,
      },
    });
    return response.data;
  }

  async domainDetails(
    domainName: string,
    period: number,
    experience?: Experience
  ): Promise<Category> {
    const response = await axios.get(`/api/domains/details/${domainName}`, {
      params: {
        days_period: period,
        experience,
      },
    });
    return response.data;
  }

  async categoryDetails(
    category: string,
    period: number,
    experience?: Experience
  ): Promise<Category> {
    const response = await axios.get(`/api/categories/details/${category}`, {
      params: {
        days_period: period,
        experience,
      },
    });
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

  async currencyList(): Promise<Currency[]> {
    const response = await axios.get('/api/general/currency');
    return response.data;
  }

  async categoriesList(
    period: number | null,
    experience?: Experience,
    limit: number = 10,
    offset: number = 0,
    order_by?: ServerOrderBy
  ): Promise<DomainsServer> {
    const response = await axios.get('/api/categories/list', {
      params: {
        experience,
        period,
        limit,
        offset,
        order_by: order_by?.order_by,
        descending: order_by?.descending,
      },
    });
    return response.data;
  }

  async domainsList(
    period: number | null,
    experience?: Experience,
    limit: number = 10,
    offset: number = 0,
    order_by?: ServerOrderBy
  ): Promise<DomainsServer> {
    const response = await axios.get('/api/domains/list', {
      params: {
        experience,
        period,
        limit,
        offset,
        order_by: order_by?.order_by,
        descending: order_by?.descending,
      },
    });
    return response.data;
  }

  async skillPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number,
    relatedTo?: string | null
  ): Promise<TrendChart> {
    const response = await axios.get('/api/charts/skill', {
      params: {
        skill_name: name,
        period,
        experience,
        number_of_bins: numberOfBins,
        related_to: relatedTo,
      },
    });
    return response.data as TrendChart;
  }

  async domainPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number
  ): Promise<TrendChart> {
    const response = await axios.get('/api/charts/category', {
      params: {
        category: name,
        period,
        experience,
        number_of_bins: numberOfBins,
      },
    });
    return response.data as Chart[];
  }

  async categoryPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number
  ): Promise<Chart[]> {
    const response = await axios.get('/api/charts/technology', {
      params: {
        technology: name,
        period,
        experience,
        number_of_bins: numberOfBins,
      },
    });
    return response.data as Chart[];
  }

  async salaryPlot(
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number,
    relatedTo?: string | null
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/salary', {
      params: {
        skill_name: name,
        period,
        experience,
        number_of_bins: numberOfBins,
        related_to: relatedTo,
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
    experience?: Experience,
    number_of_bins?: number
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/technology-salary', {
      params: {
        technology: name,
        period,
        experience,
        number_of_bins,
      },
    });
    return response.data;
  }

  async skillsList(
    period: number,
    experience?: Experience,
    limit: number = 10,
    offset: number = 0,
    order_by?: ServerOrderBy,
    filter?: ServerFilters
  ): Promise<KeySkillServer> {
    const response = await axios.get('/api/key-skills/list', {
      params: {
        experience,
        period,
        limit,
        offset,
        domain: filter?.domain,
        category: filter?.category,
        strict: filter?.strict,
        related_to: filter?.related_to,
        similar_to: filter?.similar_to,
        order_by: order_by?.order_by,
        descending: order_by?.descending,
        skill_name: filter?.skillName,
      },
    });
    return response.data;
  }

  async favouriteSkills(
    names: string[],
    period: number | null,
    experience: Experience,
    orderBy: ServerOrderBy,
    limit: number,
    offset: number
  ): Promise<KeySkillServer> {
    const response = await axios.post(
      '/api/key-skills/favourites',
      {
        names: names,
      },
      {
        params: {
          experience,
          period,
          limit,
          offset,
          order_by: orderBy?.order_by,
          descending: orderBy?.descending,
        },
      }
    );
    return response.data;
  }

  async favouriteDomains(
    names: string[],
    period: number | null,
    experience: Experience,
    orderBy: ServerOrderBy,
    limit: number,
    offset: number
  ): Promise<KeySkillServer> {
    const response = await axios.post(
      '/api/domains/favourites',
      {
        names: names,
      },
      {
        params: {
          experience,
          period,
          limit,
          offset,
          order_by: orderBy?.order_by,
          descending: orderBy?.descending,
        },
      }
    );
    return response.data;
  }

  async favouriteCategories(
    names: string[],
    period: number | null,
    experience: Experience,
    orderBy: ServerOrderBy,
    limit: number,
    offset: number
  ): Promise<KeySkillServer> {
    const response = await axios.post(
      '/api/categories/favourites',
      {
        names: names,
      },
      {
        params: {
          experience,
          period,
          limit,
          offset,
          order_by: orderBy?.order_by,
          descending: orderBy?.descending,
        },
      }
    );
    return response.data;
  }

  async highlightByType(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]> {
    const response = await axios.get(`/api/highlights/${name}`, {
      params: {
        experience,
        period,
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
