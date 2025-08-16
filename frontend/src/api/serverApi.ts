import {
  CategoryFilter,
  OrderBy,
  Pagination,
  SkillFilter,
  TrendFilter,
} from '@/interfaces';

import { axiosHTTP as axios } from './axiosHttp';
import API from './iapi';

export const ServerAPI: API = {
  general: {
    mainStats: async () => {
      const response = await axios.get('/api/general/stats');
      return response.data;
    },
    currencyList: async () => {
      const response = await axios.get('/api/general/currency');
      return response.data;
    },
  },
  categories: {
    categoriesList: async (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => {
      const response = await axios.get('/api/categories/list', {
        params: {
          ...pagination,
          ...filter,
          ...orderBy,
        },
      });
      return response.data;
    },
    categoryDetails: async (filter: CategoryFilter) => {
      const response = await axios.get(
        `/api/categories/details/${filter.name}`,
        {
          params: {
            ...filter,
          },
        }
      );
      return response.data;
    },
    favoriteCategories: async (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => {
      const response = await axios.post(
        '/api/categories/favorites',
        {
          names: names,
        },
        {
          params: {
            ...pagination,
            ...filter,
            ...orderBy,
          },
        }
      );
      return response.data;
    },
  },
  domains: {
    domainsList: async (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => {
      const response = await axios.get('/api/domains/list', {
        params: {
          ...pagination,
          ...filter,
          ...orderBy,
        },
      });
      return response.data;
    },
    domainDetails: async (filter: CategoryFilter) => {
      const response = await axios.get(`/api/domains/details/${filter.name}`, {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
    favoriteDomains: async (
      names: string[],
      pagination: Pagination,
      filter: CategoryFilter,
      orderBy: OrderBy
    ) => {
      const response = await axios.post(
        '/api/domains/favorites',
        {
          names: names,
        },
        {
          params: {
            ...pagination,
            ...filter,
            ...orderBy,
          },
        }
      );
      return response.data;
    },
  },
  charts: {
    skillTrend: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/skill', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
    domainTrend: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/category', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
    categoryTrend: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/technology', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },

    skillSalary: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/salary', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
    domainSalary: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/category-salary', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
    categorySalary: async (filter: TrendFilter) => {
      const response = await axios.get('/api/charts/technology-salary', {
        params: {
          ...filter,
        },
      });
      return response.data;
    },
  },

  skills: {
    skillsList: async (
      pagination?: Pagination,
      filter?: CategoryFilter,
      orderBy?: OrderBy
    ) => {
      const response = await axios.get('/api/key-skills/list', {
        params: {
          ...pagination,
          ...filter,
          ...orderBy,
        },
      });
      return response.data;
    },
    skillDetails: async (filter: SkillFilter) => {
      const response = await axios.get(
        `/api/key-skills/details/${filter.skill}`,
        {
          params: {
            ...filter,
          },
        }
      );
      return response.data;
    },
    favoriteSkills: async (
      names: string[],
      pagination: Pagination,
      filter: SkillFilter,
      orderBy: OrderBy
    ) => {
      const response = await axios.post(
        '/api/key-skills/favorites',
        {
          names: names,
        },
        {
          params: {
            ...pagination,
            ...filter,
            ...orderBy,
          },
        }
      );
      return response.data;
    },
  },
};
