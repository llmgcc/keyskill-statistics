import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { Language } from '@/config/languages';

import { Description } from './Description';

interface SkillDescriptionProps {
  skill?: KeySkill;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'base';
  image?: boolean;
}

export function SkillDescription({
  skill,
  isLoading = false,
  size = 'md',
  image = true,
}: SkillDescriptionProps) {
  const { i18n, t } = useTranslation();

  const skillName =
    i18n.language == Language.ru
      ? skill?.name
      : (skill?.translation ?? skill?.name);

  const domain = skill?.domains?.[0] ?? null;
  const category = skill?.categories?.[0] ?? null;

  return (
    <Description
      displayName={skillName ?? null}
      subtitle={
        !isLoading ? (
          <div className="flex">
            <div className="">
              <div className="text-text-secondary">
                {t(`domains.${domain?.name}`) ?? t(`common.unknownCategory`)}
              </div>
            </div>
            <div className="mx-1">•</div>
            <div className="">
              <div className="text-text-secondary">
                {t(`categories.${category?.name}`) ??
                  t(`common.unknownCategory`)}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-w-10">-</div>
        )
      }
      allTimePlace={skill?.all_time_place ?? 0}
      isLoading={isLoading}
      size={size}
      image={image}
      imageProps={{
        size: size,
        domains: domain?.name,
        path: skill?.image,
        categories: category?.name,
      }}
    />
  );
}
