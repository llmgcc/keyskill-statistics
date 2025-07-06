export type Currency = {
  currency_abbr: string;
  currency_rate: number;
  currency_code: string;
  currency_name: string;
};

export type Stats = {
  last_update: string;
  unique_skills: number;
  date_from: string;
  date_to: string;
  number_of_vacancies: string;
  max_salary: number;
};

export type Category = {
  name: string;
  count: number;
  prev_count?: number;
  place: number;
  prev_place?: number;
  average_salary?: number;
  confidence: number;
};

type Chart = {
  bin: number;
  count: number;
};

type SalaryChart = {
  salary_from: number;
  salary_to: number;
  chart: Chart[];
};

type KeySkillServer = {
  skills: KeySkill[];
  rows: number;
};

type KeySkill = {
  name: string;
  translation?: string;
  count: number;
  prev_count?: number;
  place: number;
  prev_place?: number;
  average_salary?: number;
  domains: Category[];
  categories: Category[];
  image?: string;
  ratio: number;
};
