import { Experience } from '@/config/experience';

import {
  Category,
  Chart,
  Currency,
  KeySkill,
  SalaryChart,
  Stats,
} from './index';

export interface SkillsOrderBy {
  column: string;
  type?: 'default' | 'domain-confidence' | 'category-confidence';
  asc: boolean;
  category?: string;
  domain?: string;
}

export interface API {
  mainStats: () => Promise<Stats>;
  currencyList: () => Promise<Currency[]>;
  categoriesList: (
    period: number,
    experience?: Experience,
  ) => Promise<Category[]>;
  domainsList: (period: number, experience?: Experience) => Promise<Category[]>;

  skill: (skillName: string) => Promise<KeySkillServer>;

  skillsList: (
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
  ) => Promise<KeySkillServer>;

  skillPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<Chart[]>;

  domainPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<Chart[]>;

  domainPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<Chart[]>;

  technologyPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<Chart[]>;

  salaryPlot: (
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins: number,
  ) => Promise<SalaryChart>;

  categorySalaryPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<SalaryChart>;

  technologySalaryPlot: (
    name: string,
    period: number,
    experience?: Experience,
  ) => Promise<SalaryChart>;

  highlightsHighestSalary: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
  highlightsLowestSalary: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
  highlightsUndefinedSalary: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
  highlightsGainers: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
  highlightsDecliners: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
  highlightsNewSkills: (
    period: number,
    experience?: Experience,
  ) => Promise<KeySkill[]>;
}
