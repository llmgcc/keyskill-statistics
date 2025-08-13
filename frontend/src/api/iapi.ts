import {
  CategoriesServer,
  Category,
  CategoryFilter,
  Currency,
  DomainsServer,
  KeySkill,
  KeySkillServer,
  OrderBy,
  Pagination,
  SalaryChart,
  SkillFilter,
  Stats,
  TrendChart,
  TrendFilter,
} from '@/interfaces';

export default interface API {
  general: {
    mainStats: () => Promise<Stats>;
    currencyList: () => Promise<Currency[]>;
  };
  categories: {
    categoriesList: (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => Promise<CategoriesServer>;
    categoryDetails: (filter: CategoryFilter) => Promise<Category>;
    favoriteCategories: (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => Promise<CategoriesServer>;
  };
  domains: {
    domainsList: (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => Promise<DomainsServer>;
    domainDetails: (filter: CategoryFilter) => Promise<Category>;
    favoriteDomains: (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => Promise<DomainsServer>;
  };
  charts: {
    skillTrend: (filter: TrendFilter) => Promise<TrendChart>;
    domainTrend: (filter: TrendFilter) => Promise<TrendChart>;
    categoryTrend: (filter: TrendFilter) => Promise<TrendChart>;
    skillSalary: (filter: TrendFilter) => Promise<SalaryChart>;
    domainSalary: (filter: TrendFilter) => Promise<SalaryChart>;
    categorySalary: (filter: TrendFilter) => Promise<SalaryChart>;
  };
  skills: {
    skillsList: (
      pagination?: Pagination,
      filter?: SkillFilter,
      orderBy?: OrderBy
    ) => Promise<KeySkillServer>;
    skillDetails: (filter: SkillFilter) => Promise<KeySkill>;
    favoriteSkills: (
      names: string[],
      pagination: Pagination,
      filter: SkillFilter,
      orderBy: OrderBy
    ) => Promise<KeySkillServer>;
  };
}
