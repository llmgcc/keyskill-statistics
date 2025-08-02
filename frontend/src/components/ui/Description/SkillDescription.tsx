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
    // <div className="flex items-center truncate text-sm font-[500] leading-none">
    //   {image && (
    //     <div
    //       className={`mr-2 flex aspect-square items-center justify-center transition-all duration-0`}
    //     >
    //       <Skeleton
    //         loading={isLoading}
    //         className={
    //           isLoading ? 'size-full bg-background-secondary' : 'size-full'
    //         }
    //       >
    //         <SkillImage
    //           domains={skill?.domains?.[0]?.name}
    //           categories={skill?.categories?.[0]?.name}
    //           path={skill?.image}
    //           size={size}
    //         />
    //       </Skeleton>
    //     </div>
    //   )}
    //   <div className="mx-[4px]">
    //     <div className="flex items-center gap-2">
    //       <div
    //         className={`overflow-hidden truncate text-ellipsis ${config.header} transition-all duration-0`}
    //       >
    //         <Skeleton
    //           loading={isLoading}
    //           className={isLoading ? 'size-full bg-background-secondary' : ''}
    //         >
    //           {!isLoading ? skillName : '-'.repeat(20)}
    //         </Skeleton>
    //       </div>
    //       {
    //         <div>
    //           <div
    //             className={`${config.text} text-text-secondary transition-all duration-0`}
    //           >
    //             <Skeleton
    //               loading={isLoading}
    //               className={
    //                 isLoading ? 'size-full bg-background-secondary' : ''
    //               }
    //             >
    //               <span className="font-[500]">#{skill?.all_time_place}</span>{' '}
    //               {t('common.skillOfAllTime')}
    //             </Skeleton>
    //           </div>
    //         </div>
    //       }
    //     </div>
    //     <div
    //       className={`flex items-center truncate text-ellipsis font-[400] text-text-secondary ${config.text} transition-all duration-0`}
    //     >
    //       <div className="">
    //         <div className="text-text-secondary">
    //           <Skeleton
    //             loading={isLoading}
    //             className={isLoading ? 'size-full bg-background-secondary' : ''}
    //           >
    //             {t(`domains.${domain?.name}`) ?? t(`common.unknownCategory`)}
    //           </Skeleton>
    //         </div>
    //       </div>
    //       <div className="mx-1">
    //         <Skeleton
    //           loading={isLoading}
    //           className={isLoading ? 'size-full bg-background-secondary' : ''}
    //         >
    //           •
    //         </Skeleton>
    //       </div>
    //       <div className="">
    //         <div className="text-text-secondary">
    //           <Skeleton
    //             loading={isLoading}
    //             className={isLoading ? 'size-full bg-background-secondary' : ''}
    //           >
    //             {t(`categories.${category?.name}`) ??
    //               t(`common.unknownCategory`)}
    //           </Skeleton>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
