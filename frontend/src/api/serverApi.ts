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

export class ServerAPI implements API {
  async mainStats(): Promise<Stats> {
    const response = await fetch('/api/main-page/stats');
    return response.json();
  }

  async currencyList(): Promise<Currency[]> {
    const response = await fetch('/api/main-page/currency');
    return response.json();
  }

  async categoriesList(
    period: number = 10,
    experience?: Experience = undefined,
  ): Promise<Category[]> {
    const response = await axios.get('/api/technologies/list',
      {
        params: {
          period,
          experience,
        },
      }
    );
    return response.data;
  }

  async domainsList(
    period: number = 10,
    experience?: Experience = undefined,
  ): Promise<Category[]> {
    const response = await axios.get('/api/categories/list', {
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
  ): Promise<Chart[]> {
    const response = await axios.get('/api/charts/skill', {
      params: {
        skill_name: name,
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
  ): Promise<SalaryChart> {
    const response = await axios.get('/api/charts/salary', {
      params: {
        skill_name: name,
        period,
        experience,
      },
    });
    return response.data;
  }

  async skillsList(
    experience?: Experience,
    period?: number,
    limit?: number,
    offset?: number,
  ): Promise<KeySkillServer> {
    const response = await axios.get('/api/key-skills/list', {
      params: {
        experience,
        period,
        limit,
        offset,
      },
    });
    return response.data;
  }

  async highlightsHighestSalary(
    experience?: Experience,
    period?: number,
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
    experience?: Experience,
    period?: number,
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
    experience?: Experience,
    period?: number,
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
    experience?: Experience,
    period?: number,
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
    experience?: Experience,
    period?: number,
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
    experience?: Experience,
    period?: number,
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
