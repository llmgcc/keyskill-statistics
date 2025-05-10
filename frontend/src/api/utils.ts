import { KeySkill } from '@/interfaces';
import { SkillsOrderBy } from '@/interfaces/api';
import { getPercentDifference } from '@/utils/common';

function getCategoryConfidence(
  skill: KeySkill,
  category: string,
  key: 'categories' | 'technologies',
  domainStrict : boolean,
  categoryStrict : boolean,
) {
  const foundCategory = skill[key].find((c) => c.name == category);

  const strictMode = key == 'categories' ? domainStrict : categoryStrict;
  if (strictMode) {
    const maxConfidence = skill[key].reduce(
      (a, b) => Math.max(a, b.confidence),
      0,
    );
    const maxConfidenceCategory = skill[key].find(
      (c) => c.confidence == maxConfidence,
    );
    if (maxConfidenceCategory?.name !== category) {
      return null;
    }
    return maxConfidenceCategory.confidence;
  } else {
    return foundCategory?.confidence ?? null;
  }
}

export function filterSkills(
  skills: KeySkill[],
  domain?: string,
  domainStrict: boolean = true,
  category?: string,
  categoryStrict: boolean = true,
  skillName?: string,
) {
  let skillsData = skills;
  if (domain) {
    skillsData = skillsData.filter(
      (c) => getCategoryConfidence(c, domain, 'categories', domainStrict, categoryStrict) !== null,
    );
  }
  if (category) {
    skillsData = skillsData.filter(
      (c) => getCategoryConfidence(c, category, 'technologies', domainStrict, categoryStrict) !== null,
    );
  }

  if (skillName) {
    skillsData = skillsData.filter(
      (c) =>
        c.name.toLowerCase().includes(skillName.toLowerCase()) ||
        c.translation?.toLowerCase().includes(skillName.toLowerCase()),
    );
  }
  return skillsData;
}

function compare(
  a: KeySkill,
  b: KeySkill,
  asc: boolean,
  field: keyof KeySkill,
) {
  let valueA = a[field];
  let valueB = b[field];

  if (field === 'prev_place') {
    if (!b.prev_place) {
      return 1;
    }
    if (!a.prev_place) {
      return -1;
    }
    valueA = a.place - a.prev_place;
    valueB = b.place - b.prev_place;
  }
  if (field === 'prev_count') {
    if (!b.prev_count) {
      return 1;
    }
    if (!a.prev_count) {
      return -1;
    }
    valueA = getPercentDifference(a.count, a.prev_count);
    valueB = getPercentDifference(b.count, b.prev_count);
  }
  if (!valueB) {
    return 1;
  }
  if (!valueA) {
    return -1;
  }
  if (valueA < valueB) {
    return asc ? 1 : -1;
  }
  if (valueA > valueB) {
    return asc ? -1 : 1;
  }
  return 0;
}

export function sortSkills(skills: KeySkill[], orderBy: SkillsOrderBy) {
  let data = [...skills];

  if (orderBy?.type) {
    if (orderBy.type === 'default' && data.length) {
      data = data.sort((a, b) =>
        compare(b, a, orderBy.asc, orderBy.column as keyof KeySkill),
      );
    }
    if (orderBy.type === 'category-confidence') {
      data = data.sort((a, b) => {
        const valueA =
          a.technologies.find((c) => c.name === orderBy.category)?.confidence ??
          0;
        const valueB =
          b.technologies.find((c) => c.name === orderBy.category)?.confidence ??
          0;

        const asc = orderBy.asc;
        if (valueA < valueB) {
          return asc ? -1 : 1;
        }
        if (valueA > valueB) {
          return asc ? 1 : -1;
        }
        return 0;
      });
    }
    if (orderBy.type === 'domain-confidence') {
      data = data.sort((a, b) => {
        const valueA =
          a.categories.find((c) => c.name === orderBy.domain)?.confidence ?? 0;
        const valueB =
          b.categories.find((c) => c.name === orderBy.domain)?.confidence ?? 0;

        const asc = orderBy.asc;
        if (valueA < valueB) {
          return asc ? -1 : 1;
        }
        if (valueA > valueB) {
          return asc ? 1 : -1;
        }
        return 0;
      });
    }
  }
  return data;
}
