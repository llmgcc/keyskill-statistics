import {
  Categories,
  CategoryDescription,
  CategoryShort,
} from '@/config/categories';
import { DomainDescription, Domains, DomainShort } from '@/config/domains';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';

export default {
  translation: {
    navigation: {
      uniqueSkills: 'Unique Key Skills (All Time)',
      lastUpdate: 'Last update',
      tooltips: {
        theme: 'Theme',
        currency: 'Currency',
        language: 'Language',
      },
    },
    currency: {
      EUR: 'Euro',
      USD: 'US Dollar',
      RUB: 'Russian Ruble',
    },
    mainText: {
      title: 'Analysis of <badge>key skills</badge> in the IT Sector',
      subtitle:
        'Skills and salary data were collected by analyzing <text>{{vacancies}}</text> IT job postings via the <linkto>HeadHunter API</linkto> from <text>{{dateFrom}}</text> to <text>{{dateTo}}</text>.',
      enumeration:
        'Key skills were classified using machine learning methods into:',
      domains: '- <linkto>{{count}} domains</linkto>, such as',
      categories: '- <linkto>{{count}} categories</linkto>, including',
      end: 'Classification helps to gauge which skills are in demand and to observe differences in salary ranges across IT domains.',
    },
    filters: {
      title: 'Filters',
    },
    categoryFilter: {
      allDomains: 'All domains',
      allCategories: 'All categories',
      all: 'All',
      placeholder: 'Title',
      placeholderForSkill: 'Search for a skill',
      strictMatch: 'Strict match',
      strictModeTooltipCategory:
        'Show only skills where the selected category is the primary category (highest confidence score)',
    },
    common: {
      and: 'and',
      days: 'days',
      experience: 'Experience',
      period: 'Period',
      unknownCategory: 'Unknown',
      domains: 'Domains',
      categories: 'Categories',
      skills: 'Key skills',
    },
    domains: Domains,
    domainsShort: DomainShort,
    domainDescription: DomainDescription,
    categories: Categories,
    categoriesShort: CategoryShort,
    categoryDescription: CategoryDescription,
    experience: {
      [Experience.any]: 'Any',
      [Experience.noExperience]: 'No experience',
      [Experience.between1And3]: '1-3 years',
      [Experience.between3And6]: '3-6 years',
      [Experience.moreThan6]: 'More than 6 years',
    },
    experienceShort: {
      [Experience.any]: 'Any',
      [Experience.noExperience]: 'No',
      [Experience.between1And3]: '1-3',
      [Experience.between3And6]: '3-6',
      [Experience.moreThan6]: '>6',
    },
    highlights: Highlights,
    pagination: {
      text: 'Showing {{currentPage}} - {{totalPages}} of {{totalRows}} results',
      show: 'Show',
    },
    columns: {
      name: 'Name',
      salary: 'Salary',
      mentions: 'Mentions',
      trend: 'Trend',
      skills: 'Skills',
    },
  },
};
