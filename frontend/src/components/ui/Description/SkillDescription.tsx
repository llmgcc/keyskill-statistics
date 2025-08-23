import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { KeySkill } from '@/interfaces';
import { Language } from '@/config/languages';

import { Description } from './Description';

interface SkillDescriptionProps {
  skill?: KeySkill;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'base';
  image?: boolean;
  onLinkClick?: () => void;
}

export function SkillDescription({
  skill,
  isLoading = false,
  size = 'md',
  image = true,
  onLinkClick,
}: SkillDescriptionProps) {
  const { i18n, t } = useTranslation();

  const skillName =
    i18n.language == Language.ru
      ? skill?.name
      : (skill?.translation ?? skill?.name);

  const domain = skill?.domains?.[0] ?? null;
  const category = skill?.categories?.[0] ?? null;

  const linkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onLinkClick?.();
    e.stopPropagation();
  };

  return (
    <Description
      displayName={skillName ?? null}
      subtitle={
        !isLoading ? (
          <div className="flex">
            <div>
              <Link
                to={`/domain/${domain?.name}`}
                className="text-text-secondary hover:text-background-accent"
                onClick={linkClick}
              >
                {t(`domains.${domain?.name}`) ?? t(`common.unknownCategory`)}
              </Link>
            </div>
            <div className="mx-1">•</div>
            <div>
              <Link
                to={`/category/${category?.name}`}
                className="text-text-secondary hover:text-background-accent"
                onClick={linkClick}
              >
                {t(`categories.${category?.name}`) ??
                  t(`common.unknownCategory`)}
              </Link>
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
