import { Experience } from '@/config/experience';

export interface ServerOrderBy {
  order_by: string;
  descending: boolean;
}

export interface DomainsServer {
  domains: Category[];
  rows: number;
}

export interface CategoriesServer {
  categories: Category[];
  rows: number;
}

export interface DomainsServer {
  domains: Category[];
  rows: number;
}

export interface OrderBy {
  column: string;
  descending: bool;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface FilterBase {
  period: number | null;
  experience?: Experience | null;
}

export interface CategoryFilter extends FilterBase {
  name?: string;
}

export interface SkillFilter extends FilterBase {
  category?: string;
  domain?: string;
  strict?: boolean;
  related_to?: string;
  similar_to?: string;
  skill?: string;
}

export interface TrendFilter extends FilterBase {
  name: string;
  numberOfBins: number;
  relatedTo?: string | null;
}

export interface ServerFilters {
  category?: string;
  domain?: string;
  strict?: boolean;
  related_to?: string;
  similar_to?: string;
  period?: number;
  experience?: number;
  skillName?: string;
}

export interface Currency {
  currency_abbr: string;
  currency_rate: number;
  currency_code: string;
  currency_name: string;
}

export interface Stats {
  last_update: string;
  unique_skills: number;
  date_from: string;
  date_to: string;
  number_of_vacancies: string;
  max_salary: number;
}

export interface Category {
  name: string;
  count: number;
  prev_count?: number;
  place: number;
  prev_place?: number;
  average_salary?: number;
  confidence: number;
  all_time_place?: number;
  prev_average_salary?: number;
}

interface Chart {
  bin: number;
  count: number;
}

interface TrendChart {
  date_from: number;
  date_to: number;
  chart: Chart[];
}

interface SalaryChart {
  salary_from: number;
  salary_to: number;
  chart: Chart[];
}

interface KeySkillServer {
  skills: KeySkill[];
  rows: number;
}

interface DomainsServer {
  domains: Category[];
  rows: number;
}

interface KeySkill {
  name: string;
  translation?: string;
  count?: number;
  all_time_place?: number;
  prev_count?: number;
  place?: number;
  prev_place?: number;
  average_salary?: number;
  prev_average_salary?: number;
  domains: Category[];
  categories: Category[];
  image?: string;
  ratio: number;
  complexity_score?: number;
  experience_counts?: Record<string, number>;
  confidence?: number;
  similarity_score?: number;
}
