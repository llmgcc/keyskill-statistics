import {
  Category,
  CategoryFilter,
  Chart,
  KeySkill,
  OrderBy,
  Pagination,
  SalaryChart,
  SkillFilter,
  TrendChart,
  TrendFilter,
} from '@/interfaces';

import { axiosHTTP as axios } from './axiosHttp';
import API from './iapi';
import {
  ALL_TIME_FILTER,
  DEFAULT_ORDER,
  getCategories,
  getDomains,
  getSkills,
} from './utils';

interface TrendChartStatic extends TrendChart {
  charts: Record<string, Chart[]>;
}
interface SalaryChartStatic extends SalaryChart {
  charts: Record<string, Chart[]>;
}
type ChartData = TrendChartStatic | SalaryChartStatic;

const chartCache = new Map<string, Promise<ChartData>>();

export function getChartData(url: string): Promise<ChartData> {
  if (!chartCache.has(url)) {
    chartCache.set(
      url,
      axios.get(url).then(response => response.data)
    );
  }
  return chartCache.get(url)!;
}

export const StaticAPI: API = {
  general: {
    mainStats: async () => {
      const response = await axios.get('/static-api/general/stats.json');
      return response.data;
    },
    currencyList: async () => {
      const response = await axios.get('/static-api/general/currency.json');
      return response.data;
    },
  },
  categories: {
    categoriesList: async (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => {
      const categories = await getCategories(
        filter ?? ALL_TIME_FILTER,
        orderBy ?? DEFAULT_ORDER
      );
      return {
        categories: categories.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? categories.length)
        ) as Category[],
        rows: categories.length,
      };
    },
    categoryDetails: async (filter: CategoryFilter) => {
      const allTimeCategories = await getCategories(
        ALL_TIME_FILTER,
        DEFAULT_ORDER
      );
      const categories = await getCategories(filter, DEFAULT_ORDER);
      const category = allTimeCategories.find(
        c => c.name === decodeURIComponent(filter?.name ?? '')
      );
      if (!category) {
        throw new Error('Not found');
      }
      return {
        name: category?.name,
        image: category?.image,
        categories: category?.categories,
        domains: category?.domains,
        ...categories.find(
          c => c.name === decodeURIComponent(filter?.name ?? '')
        ),
        all_time_place: category?.all_time_place,
      } as Category;
    },
    favoriteCategories: async (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => {
      const categories = await getCategories(filter, orderBy ?? DEFAULT_ORDER);
      const favorites = categories.filter(c => names.includes(c.name));
      return {
        categories: favorites.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? favorites.length)
        ) as Category[],
        rows: favorites.length,
      };
    },
  },
  domains: {
    domainsList: async (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => {
      const domains = await getDomains(filter ?? ALL_TIME_FILTER, orderBy);
      return {
        domains: domains.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? domains.length)
        ) as Category[],
        rows: domains.length,
      };
    },
    domainDetails: async (filter: CategoryFilter) => {
      const allTimeDomains = await getDomains(ALL_TIME_FILTER, DEFAULT_ORDER);
      const domains = await getDomains(filter, DEFAULT_ORDER);
      const domain = allTimeDomains.find(
        c => c.name === decodeURIComponent(filter?.name ?? '')
      );
      if (!domain) {
        throw new Error('Not found');
      }
      return {
        name: domain?.name,
        image: domain?.image,
        categories: domain?.categories,
        domains: domain?.domains,
        ...domains.find(c => c.name === decodeURIComponent(filter?.name ?? '')),
        all_time_place: domain?.all_time_place,
      } as Category;
    },
    favoriteDomains: async (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => {
      const domains = await getDomains(filter, orderBy ?? DEFAULT_ORDER);
      const favorites = domains.filter(c => names.includes(c.name));
      return {
        domains: favorites.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? favorites.length)
        ) as Category[],
        rows: favorites.length,
      };
    },
  },
  charts: {
    skillTrend: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/skills_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as TrendChartStatic;
      return {
        date_from: charts.date_from,
        date_to: charts.date_to,
        chart: charts.charts[filter.name],
      };
    },
    domainTrend: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/domains_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as TrendChartStatic;
      return {
        date_from: charts.date_from,
        date_to: charts.date_to,
        chart: charts.charts[filter.name],
      };
    },
    categoryTrend: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/categories_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as TrendChartStatic;
      return {
        date_from: charts.date_from,
        date_to: charts.date_to,
        chart: charts.charts[filter.name],
      };
    },
    skillSalary: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/skills_salary_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as SalaryChartStatic;
      return {
        salary_from: charts.salary_from,
        salary_to: charts.salary_to,
        chart: charts.charts[filter.name],
      };
    },
    domainSalary: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/domains_salary_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as SalaryChartStatic;
      return {
        salary_from: charts.salary_from,
        salary_to: charts.salary_to,
        chart: charts.charts[filter.name],
      };
    },
    categorySalary: async (filter: TrendFilter) => {
      const charts = (await getChartData(
        `/static-api/charts/categories_salary_${filter?.period}_${filter?.experience ?? 'any'}.json`
      )) as SalaryChartStatic;
      return {
        salary_from: charts.salary_from,
        salary_to: charts.salary_to,
        chart: charts.charts[filter.name],
      };
    },
  },
  skills: {
    skillsList: async (
      pagination?: Pagination,
      filter?: SkillFilter,
      orderBy?: OrderBy
    ) => {
      const skills = await getSkills(filter, orderBy ?? DEFAULT_ORDER);
      return {
        skills: skills.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? skills.length)
        ),
        rows: skills.length,
      };
    },
    skillDetails: async (filter: SkillFilter) => {
      const allTimeSkills = await getSkills(ALL_TIME_FILTER, DEFAULT_ORDER);
      const skills = await getSkills(
        { period: filter.period, experience: filter.experience },
        DEFAULT_ORDER
      );
      const skill = allTimeSkills.find(
        c => c.name === decodeURIComponent(filter?.skill ?? '')
      );
      if (!skill) {
        throw new Error('Not found');
      }
      return {
        name: skill?.name,
        image: skill?.image,
        categories: skill?.categories,
        domains: skill?.domains,
        ...skills.find(c => c.name === decodeURIComponent(filter?.skill ?? '')),
        all_time_place: skill?.all_time_place,
      } as KeySkill;
    },
    favoriteSkills: async (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => {
      const skills = await getSkills(
        filter ?? ALL_TIME_FILTER,
        orderBy ?? DEFAULT_ORDER
      );
      const favorites = skills.filter(c => names.includes(c.name));
      return {
        skills: favorites.slice(
          pagination?.offset,
          (pagination?.offset ?? 0) + (pagination?.limit ?? favorites.length)
        ),
        rows: favorites.length,
      };
    },
  },
};
