import { Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { Language } from '@/config/languages';
import { SkillImage } from '@/components/ui/SkillImage';

interface SkillDescriptionProps {
  skill?: KeySkill;
  isLoading: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SkillDescription({
  skill,
  isLoading = false,
  size = 'md',
}: SkillDescriptionProps) {
  const { i18n, t } = useTranslation();

  const skillName =
    i18n.language == Language.ru
      ? skill?.name
      : (skill?.translation ?? skill?.name);

  const domain = skill?.domains?.[0] ?? null;
  const category = skill?.categories?.[0] ?? null;

  const sizeConfig = {
    sm: {
      image: 'h-5 w-5 md:h-6 md:w-6',
      header: 'text-xs',
      text: 'text-[0.6em]',
    },
    md: {
      image: 'h-6 w-6 md:h-7 md:w-7',
      header: 'text-sm font-[600]',
      text: 'text-[0.8em]',
    },
    lg: {
      image: 'h-10 w-10 md:h-11 md:w-11',
      header: 'text-xl font-bold',
      text: 'text-xs',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center truncate text-sm font-[500] leading-none">
      <div
        className={`mr-2 flex aspect-square items-center justify-center ${config.image} transition-all duration-0`}
      >
        <Skeleton
          loading={isLoading}
          className={
            isLoading ? 'size-full bg-background-secondary' : 'size-full'
          }
        >
          <SkillImage
            domains={skill?.domains?.[0]?.name}
            categories={skill?.categories?.[0]?.name}
            path={skill?.image}
          />
        </Skeleton>
      </div>
      <div className="mx-[4px]">
        <div className="flex items-center gap-2">
          <div
            className={`overflow-hidden truncate text-ellipsis ${config.header} transition-all duration-0`}
          >
            <Skeleton
              loading={isLoading}
              className={isLoading ? 'size-full bg-background-secondary' : ''}
            >
              {!isLoading ? skillName : '-'.repeat(20)}
            </Skeleton>
          </div>
          {
            <div>
              <div
                className={`${config.text} text-text-secondary transition-all duration-0`}
              >
                <Skeleton
                  loading={isLoading}
                  className={
                    isLoading ? 'size-full bg-background-secondary' : ''
                  }
                >
                  <span className="font-[500]">#{skill?.all_time_place}</span>{' '}
                  {t('common.skillOfAllTime')}
                </Skeleton>
              </div>
            </div>
          }
        </div>
        <div
          className={`flex items-center truncate text-ellipsis font-[400] text-text-secondary ${config.text} transition-all duration-0`}
        >
          <div className="">
            <div className="text-text-secondary">
              <Skeleton
                loading={isLoading}
                className={isLoading ? 'size-full bg-background-secondary' : ''}
              >
                {t(`domains.${domain?.name}`) ?? t(`common.unknownCategory`)}
              </Skeleton>
            </div>
          </div>
          <div className="mx-1">
            <Skeleton
              loading={isLoading}
              className={isLoading ? 'size-full bg-background-secondary' : ''}
            >
              •
            </Skeleton>
          </div>
          <div className="">
            <div className="text-text-secondary">
              <Skeleton
                loading={isLoading}
                className={isLoading ? 'size-full bg-background-secondary' : ''}
              >
                {t(`categories.${category?.name}`) ??
                  t(`common.unknownCategory`)}
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
