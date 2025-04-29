import { Experience } from '@/config/experience';

import {
  Category,
  Chart,
  Currency,
  KeySkill,
  SalaryChart,
  Stats,
} from './index';

export interface API {
  mainStats: () => Promise<Stats>;
  currencyList: () => Promise<Currency[]>;
  categoriesList: () => Promise<Category[]>;
  domainsList: () => Promise<Category[]>;

  skillsList: (
    experience?: Experience,
    period?: number,
    limit?: number,
    offset?: number,
  ) => Promise<KeySkillServer>;

  skillPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<Chart[]>;
  salaryPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<SalaryChart>;

  highlightsHighestSalary: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
  highlightsLowestSalary: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
  highlightsUndefinedSalary: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
  highlightsGainers: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
  highlightsDecliners: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
  highlightsNewSkills: (
    experience?: Experience,
    period?: number,
  ) => Promise<KeySkill[]>;
}
