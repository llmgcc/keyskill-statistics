import {
  Categories,
  CategoryDescription,
  CategoryShort,
} from '@/config/categories';
import { DomainDescription, Domains, DomainShort } from '@/config/domains';
import { Experience } from '@/config/experience';
import { Highlights, HighlightTitles } from '@/config/highlights';
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
      declining: 'Declining demand',
      new: 'New',
      unknownSalary: 'Unknown salary',
      similar: 'Similar',
      highestSalary: 'Highest salary',
      lowestSalary: 'Lowest salary',
      noData: 'No results found',
      showMore: 'Show more',
      showLess: 'Show less',
      github: 'GitHub',
      mentions: 'mentions',
      last: 'last',
      previous: 'previous',
      change: 'change',
      confidence: 'Confidence',
      seeMore: 'See more',
      mainPage: 'Main page',
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
    highlights: HighlightTitles,
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
    skills: {
      title: 'IT Skills Analysis',
      subtitle:
        'Complete analysis of demand, salary and complexity for <text>{{skillCount}}</text> skills including <examples/>. Data is displayed for the last <text>{{days}}</text> days and reflects trends {{experienceText}}.',
      experienceText: {
        [Experience.any]: 'across <text>all</text> experience levels',
        [Experience.noExperience]: 'for <text>entry-level</text> roles',
        [Experience.between1And3]:
          'for junior roles requiring <text>1-3 years</text> experience',
        [Experience.between3And6]:
          'for mid-level roles requiring <text>3-6 years</text> experience',
        [Experience.moreThan6]:
          'for senior roles requiring <text>6+ years</text> experience',
        [Experience.unknown]:
          'for roles with <text>unspecified</text> experience requirements',
      },
    },
    domainsPage: {
      title: 'IT Domains Analysis',
      subtitle:
        'Complete analysis of market demand and salary levels for <text>{{domainCount}}</text> IT domains including <examples/>. Data is displayed for the last <text>{{days}}</text> days and reflects trends {{experienceText}}.',
    },
    categoriesPage: {
      title: 'IT Categories Analysis',
      subtitle:
        'Complete analysis of market demand and salary levels for <text>{{categoryCount}}</text> IT categories including <examples/>. Data is displayed for the last <text>{{days}}</text> days and reflects trends {{experienceText}}.',
    },
    highlightsPage: {
      title: 'IT Skills Highlights',
      subtitle:
        'Key trends and statistics for IT skills: demand growth, salary insights, and emerging technologies. Data is displayed for the last <text>{{days}}</text> days and reflects trends {{experienceText}}.',
      highlightType: {
        [Highlights.gainers]: {
          title: 'Fastest Growing IT Skills',
          subtitle:
            'Analysis of IT skills showing the highest growth in popularity. Featured are <text>{{skillCount}}</text> skills that became more in-demand over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes emerging technologies such as AI/ML frameworks, cloud platforms, and modern development tools.',
        },
        [Highlights.decliners]: {
          title: 'Skills with Declining Demand',
          subtitle:
            'Analysis of IT skills showing the biggest drop in popularity. Featured are <text>{{skillCount}}</text> skills that became less in-demand over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes technologies that are losing relevance.',
        },
        [Highlights.new]: {
          title: 'New Skills',
          subtitle:
            'Analysis of IT skills that appeared in the job market for the first time. Featured are <text>{{skillCount}}</text> skills that were first encountered over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes new technologies and tools.',
        },
        [Highlights['highest-salary']]: {
          title: 'Highest Paying Skills',
          subtitle:
            'Analysis of IT skills with the highest salaries. Featured are <text>{{skillCount}}</text> skills that offer the highest pay over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes technologies with high demand.',
        },
        [Highlights['lowest-salary']]: {
          title: 'Lowest Paying Skills',
          subtitle:
            'Analysis of IT skills with the lowest salaries. Featured are <text>{{skillCount}}</text> skills that offer the lowest pay over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes more accessible technologies.',
        },
        [Highlights['unknown-salary']]: {
          title: 'Skills with Unknown Salary',
          subtitle:
            'Analysis of IT skills where salary information is not specified. Featured are <text>{{skillCount}}</text> skills without salary data over the last <text>{{days}}</text> days. Data reflects trends {{experienceText}} and includes technologies with varying compensation terms.',
        },
      },
    },
    favouritesPage: {
      title: 'Favourites',
      subtitle:
        'Personal collection of saved IT skills, domains, and categories for tracking and comparison. Manage your watchlist to monitor trends and changes. Data is displayed for the last <text>{{days}}</text> days and reflects current market conditions.',
      skills: 'Favourite skills',
      domains: 'Favourite domains',
      categories: 'Favourite categories',
    },
    footer: {
      text: '{{appName}} provides IT job market analytics, showing which skills are needed for professional development',
      backToTop: 'Back to top',
    },
  },
};
