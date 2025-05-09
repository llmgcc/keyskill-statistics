import { useTranslation } from 'react-i18next';

import { DomainDescription } from '@/config/categories';
import { CategoryDescription as CategoryDescriptionEnum } from '@/config/technologies';

import SkillImage from './SkillImage';

interface CategoryDescriptionProps {
  categoryKey: 'category' | 'technology';
  categoryName: string;
}

export function CategoryDescription({
  categoryKey,
  categoryName,
}: CategoryDescriptionProps) {
  const { t } = useTranslation();

  function categoryDescription() {
    if (categoryKey == 'category') {
      if (Object.keys(DomainDescription).includes(categoryName)) {
        return t(`domainDescription.${categoryName}`);
      }
    }
    if (categoryKey == 'technology') {
      if (Object.keys(CategoryDescriptionEnum).includes(categoryName)) {
        return t(`categoryDescription.${categoryName}`);
      }
    }
    return null;
  }

  const key = categoryKey == 'category' ? 'domains' : 'categories';
  return (
    <div className="flex items-center">
      <div className="mr-2 flex aspect-square w-6 items-center justify-center">
        <SkillImage {...{ [categoryKey]: categoryName }} />
      </div>
      <div className="text-sm font-[600]">
        <div>{t(`${key}.${categoryName}`)}</div>
        <div className="flex items-center text-[0.8em] font-[500] leading-3 text-text-secondary">
          <span className="hidden md:block">{categoryDescription()}</span>
        </div>
      </div>
    </div>
  );
}
