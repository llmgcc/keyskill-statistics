import {
  Categories,
  CategoryDescription,
  CategoryShort,
} from '@/config/categories';
import { DomainDescription, Domains, DomainShort } from '@/config/domains';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';
import { LevelDescription } from '@/config/level';

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
      skills: 'Skills',
      highlights: 'Highlights',
      favourites: 'Favourites',
      search: 'Search',
      all: 'All',
      navigate: 'Navigate',
      navigation: 'Navigation',
      links: 'Links',
      close: 'Close',
      domainsPrimary: 'Primary domain',
      categoriesPrimary: 'Primary category',
      skillOfAllTime: 'of all time',
      loading: 'Loading',
      popular: 'Popular',
      trending: 'Trending',
      similar: 'Similar',
      highestSalary: 'Highest salary',
      noData: 'No results found',
      showMore: 'Show more',
      showLess: 'Show less',
      github: 'GitHub',
      mentions: 'mentions',
      last: 'last',
      previous: 'previous',
      change: 'change',
      confidence: 'Confidence',
    },
    favorites: {
      removed: 'removed from favorites',
      added: 'added to favorites',
      favorites: 'Favorites',
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
      [Experience.unknown]: 'Unknown',
    },
    experienceShort: {
      [Experience.any]: 'Any',
      [Experience.noExperience]: 'No',
      [Experience.between1And3]: '1-3',
      [Experience.between3And6]: '3-6',
      [Experience.moreThan6]: '>6',
      [Experience.unknown]: 'Unknown',
    },
    highlights: Highlights,
    pagination: {
      text: '{{currentPage}} - {{totalPages}} of {{totalRows}}',
      show: 'Show',
    },
    columns: {
      name: 'Name',
      salary: 'Salary',
      mentions: 'Mentions',
      trend: 'Trend',
      skills: 'Skills',
      similarity: 'Similarity',
    },
    charts: {
      salaryDistribution: 'Salary Distribution',
      salarySubtitle: 'Expected median salary per month',
      demandTrend: 'Demand trend',
      trendSubtitle: 'Mentions in the last <text>{{days}}</text> days',
      notEnoughData: 'Not enough data',
      tooltips: {
        demand: {
          skill: 'Total mentions of <b>{{name}}</b> over time',
          domain:
            'Total mentions of all skills in <b>{{name}}</b> domain over time',
          category:
            'Total mentions of all skills in <b>{{name}}</b> category over time',
        },
        salary: {
          skill: 'Salary distribution for skill <b>{{name}}</b>',
          domain: 'Salary distribution for domain <b>{{name}}</b>',
          category: 'Salary distribution for category <b>{{name}}</b>',
        },
        prediction: {
          domain: 'Predicted domains for skill <b>{{name}}</b>',
          category: 'Predicted categories for skill <b>{{name}}</b>',
        },
        complexity: {
          title: 'Complexity is based on the experience distribution',
        },
      },
    },
    complexity: {
      title: 'Complexity',
      subtitle: LevelDescription,
      description:
        'Complexity is calculated based on the frequency of occurrence of the skill among specialists of different levels',
      distribution: 'Experience distribution',
    },
    skillPage: {
      relatedSkills: {
        title: 'Related skills',
        subtitle: 'Skills that often appear together with <b>{{name}}</b>',
      },
      similarSkills: {
        title: 'Similar skills',
        subtitle:
          'Skills similar in meaning or functionality to <b>{{name}}</b>',
      },
    },
    categoryPage: {
      primarySkills: {
        title: 'Primary skills',
        subtitle:
          'Skills most strongly associated with category <b>{{category}}</b>',
      },
      allSkills: {
        title: 'All skills',
        subtitle: 'Skills associated with category <b>{{category}}</b>',
      },
    },
    domainPage: {
      primarySkills: {
        subtitle:
          'Skills most strongly associated with domain <b>{{category}}</b>',
      },
      allSkills: {
        subtitle: 'Skills associated with domain <b>{{category}}</b>',
      },
    },
    footer: {
      text: '{{appName}} provides IT job market analytics, showing which skills are needed for professional development',
      backToTop: 'Back to top',
    },
  },
};
