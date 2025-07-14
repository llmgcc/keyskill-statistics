import { KeySkill } from '@/interfaces';

export function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

export function skillName(skill: KeySkill | null, language: string) {
  if (!skill) return null;
  return language === 'ru' ? skill.name : (skill?.translation ?? skill?.name);
}
