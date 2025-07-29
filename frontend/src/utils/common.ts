import { KeySkill } from '@/interfaces';

export function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

export function skillName(skill: KeySkill | null, language: string) {
  if (!skill) return null;
  return language === 'ru' ? skill.name : (skill?.translation ?? skill?.name);
}

export function placeholderData(count: number) {
  const empty: KeySkill = {
    place: 100,
    name: '',
    count: 100,
    prev_count: 200,
    prev_place: 200,
    average_salary: 100,
    domains: [],
    categories: [],
    ratio: 1,
  };
  return new Array(count)
    .fill(null)
    .map((_, i) => ({ ...empty, name: i.toString() }));
}
