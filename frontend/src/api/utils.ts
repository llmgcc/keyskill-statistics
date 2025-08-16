import { CategoryFilter, KeySkill, OrderBy, SkillFilter } from '@/interfaces';

import { axiosHTTP as axios } from './axiosHttp';

export const DEFAULT_ORDER = { column: 'all_time_place', descending: false };
export const ALL_TIME_FILTER = { period: null, experience: null };

export function sortSkills(skills: KeySkill[], orderBy: OrderBy) {
  if (orderBy.column === 'change') {
    return [...skills].sort((a, b) => {
      const aChange = a.prev_count
        ? (((a.count ?? 0) - a.prev_count) / a.prev_count) * 100
        : null;
      const bChange = b.prev_count
        ? (((b.count ?? 0) - b.prev_count) / b.prev_count) * 100
        : null;

      if (aChange === null) return 1;
      if (bChange === null) return -1;

      return orderBy.descending ? bChange - aChange : aChange - bChange;
    });
  }

  if (orderBy.column === 'new') {
    return [...skills].sort((a, b) => {
      if (a.prev_count === null && b.prev_count !== null) return 1;
      if (a.prev_count !== null && b.prev_count === null) return -1;
      if (a.prev_count !== b.prev_count)
        return (a.prev_count ?? 0) - (b.prev_count ?? 0);
      if (a.count === null && b.count !== null) return 1;
      if (a.count !== null && b.count === null) return -1;
      return (b.count ?? 0) - (a.count ?? 0);
    });
  }

  if (orderBy.column === 'unknown_salary') {
    return [...skills].sort((a, b) => {
      const aChange = a.prev_count
        ? (((a.average_salary ?? 0) - (a.prev_average_salary ?? 0)) /
            (a.prev_average_salary ?? 0)) *
          100
        : null;
      const bChange = b.prev_count
        ? (((b.average_salary ?? 0) - (b.prev_average_salary ?? 0)) /
            (b.prev_average_salary ?? 0)) *
          100
        : null;

      if (!a.prev_average_salary || !b.prev_average_salary) return 1;
      if (aChange === null) return 1;
      if (bChange === null) return -1;

      return orderBy.descending ? bChange - aChange : aChange - bChange;
    });
  }
  return [...skills].sort((a, b) => {
    const aValue = a[orderBy.column as keyof KeySkill];
    const bValue = b[orderBy.column as keyof KeySkill];
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const compareResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return orderBy.descending ? -compareResult : compareResult;
  });
}

export function getPath(prefix: string, filter?: CategoryFilter) {
  return `${prefix}_${filter?.period ?? 'all_time'}_${filter?.experience ?? 'any'}.json`;
}

export async function getSkills(
  filter?: SkillFilter,
  orderBy?: OrderBy
): Promise<KeySkill[]> {
  const path = getPath('skills', filter);
  const response = (await axios.get(`/static-api/skills/${path}`))
    .data as KeySkill[];
  const filteredSkills = response.filter(c =>
    filter?.skill
      ? c?.name?.toLowerCase().includes(filter?.skill?.toLowerCase()) ||
        c?.translation?.toLowerCase()?.includes(filter?.skill?.toLowerCase())
      : true
  );

  if (filter?.related_to) {
    const relatedMap = (
      await axios.get(`/static-api/skills/${getPath('related_skills', filter)}`)
    ).data;
    const skillsList = (relatedMap[filter.related_to] ?? []) as KeySkill[];
    const allTimeSkills = await getSkills(ALL_TIME_FILTER, DEFAULT_ORDER);
    return sortSkills(
      skillsList.map(c => {
        const s = allTimeSkills.find(skill => skill.name === c.name);
        return {
          ...s,
          ...c,
        };
      }),
      orderBy ?? DEFAULT_ORDER
    );
  }

  if (filter?.similar_to) {
    const similarMap = (
      await axios.get(`/static-api/skills/similar_skills.json`)
    ).data;
    const skillsList = (similarMap[filter.similar_to] ?? []) as KeySkill[];
    return sortSkills(
      filteredSkills
        .filter(c => skillsList.find(s => s.name === c.name))
        .map(c => {
          const s = skillsList.find(skill => skill.name === c.name);
          return {
            ...c,
            ...s,
          };
        }),
      orderBy ?? DEFAULT_ORDER
    );
  }

  if (filter?.domain) {
    if (filter?.strict) {
      return sortSkills(
        filteredSkills.filter(
          skill => skill.domains?.[0]?.name === filter.domain
        ),
        orderBy ?? DEFAULT_ORDER
      );
    } else {
      return sortSkills(
        filteredSkills.filter(skill =>
          skill.domains?.map(d => d.name)?.includes(filter.domain ?? '')
        ),
        orderBy ?? DEFAULT_ORDER
      );
    }
  }

  if (filter?.category) {
    if (filter?.strict) {
      return sortSkills(
        filteredSkills.filter(
          skill => skill.categories?.[0]?.name === filter.category
        ),
        orderBy ?? DEFAULT_ORDER
      );
    } else {
      return sortSkills(
        filteredSkills.filter(skill =>
          skill.categories?.map(d => d.name)?.includes(filter.category ?? '')
        ),
        orderBy ?? DEFAULT_ORDER
      );
    }
  }

  return sortSkills(filteredSkills, orderBy ?? DEFAULT_ORDER);
}

export async function getCategories(
  filter: CategoryFilter,
  orderBy: OrderBy
): Promise<KeySkill[]> {
  const path = getPath('categories', filter);
  const response = await axios.get(`/static-api/categories/${path}`);
  return sortSkills(response.data, orderBy ?? DEFAULT_ORDER);
}

export async function getDomains(
  filter?: CategoryFilter,
  orderBy?: OrderBy
): Promise<KeySkill[]> {
  const path = getPath('domains', filter);
  const response = await axios.get(`/static-api/domains/${path}`);
  return sortSkills(response.data, orderBy ?? DEFAULT_ORDER);
}
