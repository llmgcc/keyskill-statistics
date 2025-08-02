import { Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { SkillImage, SkillImageProps } from '@/components/ui/SkillImage';

interface DescriptionProps {
  displayName: string | null;
  subtitle: JSX.Element;
  allTimePlace: number | null;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'base';
  image?: boolean;
  imageProps: SkillImageProps;
}

export function Description({
  displayName,
  subtitle,
  isLoading = false,
  size = 'sm',
  image = true,
  imageProps,
  allTimePlace,
}: DescriptionProps) {
  const { t } = useTranslation();

  const sizeConfig = {
    sm: {
      header: 'text-xs',
      text: 'text-[0.6em]',
    },
    md: {
      header: 'text-sm font-[600]',
      text: 'text-[0.8em]',
    },
    base: {
      header: 'text-base font-[600]',
      text: 'text-[0.9em]',
    },
    lg: {
      header: 'text-lg font-[600]',
      text: 'text-[0.9em]',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center truncate text-sm font-[500] leading-none">
      {image && (
        <div
          className={`mr-2 flex aspect-square items-center justify-center transition-all duration-200`}
        >
          <Skeleton
            loading={isLoading}
            className={
              isLoading ? 'size-full bg-background-secondary' : 'size-full'
            }
          >
            <SkillImage {...imageProps} />
          </Skeleton>
        </div>
      )}
      <div className="mx-[4px]">
        <div className="flex items-center gap-2">
          <div
            className={`overflow-hidden truncate text-ellipsis ${config.header} transition-all duration-200`}
          >
            <Skeleton
              loading={isLoading}
              className={isLoading ? 'size-full bg-background-secondary' : ''}
            >
              {!isLoading ? displayName : '-'.repeat(20)}
            </Skeleton>
          </div>
          {
            <div>
              <div
                className={`${config.text} text-text-secondary transition-all duration-200`}
              >
                <Skeleton
                  loading={isLoading}
                  className={
                    isLoading ? 'size-full bg-background-secondary' : ''
                  }
                >
                  <span className="font-[500]">#{allTimePlace}</span>{' '}
                  {t('common.skillOfAllTime')}
                </Skeleton>
              </div>
            </div>
          }
        </div>
        <div
          className={`flex items-center truncate text-ellipsis font-[400] text-text-secondary ${config.text} transition-all duration-200`}
        >
          <Skeleton
            loading={isLoading}
            className={isLoading ? 'size-full bg-background-secondary' : ''}
          >
            {subtitle}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
