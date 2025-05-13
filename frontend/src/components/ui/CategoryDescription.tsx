import { useTranslation } from 'react-i18next';

import { CategoryDescription as CategoryDescriptionEnum } from '@/config/categories';
import { DomainDescription } from '@/config/domains';

import SkillImage from './SkillImage';

interface CategoryDescriptionProps {
  categoryKey: 'domain' | 'category';
  categoryName: string;
}

export function CategoryDescription({
  categoryKey,
  categoryName,
}: CategoryDescriptionProps) {
  const { t } = useTranslation();

  function categoryDescription() {
    if (categoryKey == 'domain') {
      if (Object.keys(DomainDescription).includes(categoryName)) {
        return t(`domainDescription.${categoryName}`);
      }
    }
    if (categoryKey == 'category') {
      if (Object.keys(CategoryDescriptionEnum).includes(categoryName)) {
        return t(`categoryDescription.${categoryName}`);
      }
    }
    return null;
  }

  const key = categoryKey == 'domain' ? 'domains' : 'categories';

  return (
    <div className="flex items-center">
      <div className="mr-2 flex aspect-square w-7 h-7 items-center justify-center text-base">
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
