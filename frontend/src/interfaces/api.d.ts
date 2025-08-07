import { Experience } from '@/config/experience';

import {
  Category,
  Chart,
  Currency,
  KeySkill,
  SalaryChart,
  Stats,
  TrendChart,
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
    period?: number,
    experience?: Experience
  ) => Promise<Category[]>;
  domainsList: (
    period?: number,
    experience?: Experience
  ) => Promise<Category[]>;

  highlightByType(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<KeySkill[]>;

  skill: (skillName: string) => Promise<KeySkill>;

  skillDetails: (
    skillName: string,
    period: number,
    experience?: Experience
  ) => Promise<KeySkill>;

  domainDetails: (
    domainName: string,
    period: number,
    experience?: Experience
  ) => Promise<Category>;

  categoryDetails: (
    categoryName: string,
    period: number,
    experience?: Experience
  ) => Promise<Category>;

  relatedSkills: (
    skillName: string,
    period: number,
    experience?: Experience
  ) => Promise<KeySkillServer>;

  skillsList: (
    limit: number,
    offset: number,
    period: number | null,
    experience?: Experience,
    domain?: string,
    domainStrict?: boolean,
    category?: string,
    categoryStrict?: boolean,
    skillName?: string,
    orderBy?: SkillsOrderBy
  ) => Promise<KeySkillServer>;

  favouriteSkills: (
    names: string[],
    period: number | null,
    experience: Experience,
    orderBy: ServerOrderBy,
    limit: number,
    offset: number
  ) => Promise<KeySkillServer>;

  favouriteDomains: (
    names: string[],
    period: number | null,
    experience?: Experience,
    orderBy?: SkillsOrderBy,
    limit: number,
    offset: number
  ) => Promise<KeySkillServer>;

  favouriteCategories: (
    names: string[],
    period: number | null,
    experience?: Experience,
    orderBy?: SkillsOrderBy,
    limit: number,
    offset: number
  ) => Promise<KeySkillServer>;

  skillPlot: (
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins?: number
  ) => Promise<TrendChart>;

  domainPlot: (
    name: string,
    period: number,
    experience?: Experience
  ) => Promise<Chart[]>;

  domainPlot: (
    name: string,
    period: number,
    experience?: Experience
  ) => Promise<Chart[]>;

  technologyPlot: (
    name: string,
    period: number,
    experience?: Experience
  ) => Promise<Chart[]>;

  salaryPlot: (
    name: string,
    period: number,
    experience?: Experience,
    numberOfBins: number
  ) => Promise<SalaryChart>;

  categorySalaryPlot: (
    name: string,
    period: number,
    experience?: Experience
  ) => Promise<SalaryChart>;

  technologySalaryPlot: (
    name: string,
    period: number,
    experience?: Experience
  ) => Promise<SalaryChart>;

  highlightsHighestSalary: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
  highlightsLowestSalary: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
  highlightsUndefinedSalary: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
  highlightsGainers: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
  highlightsDecliners: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
  highlightsNewSkills: (
    period: number,
    experience?: Experience
  ) => Promise<KeySkill[]>;
}
