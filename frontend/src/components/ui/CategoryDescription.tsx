// import { useTranslation } from 'react-i18next';

// import { CategoryDescription as CategoryDescriptionEnum } from '@/config/categories';
// import { DomainDescription } from '@/config/domains';

// import { SkillImage } from './SkillImage';
// import { Skeleton } from '@chakra-ui/react';

// interface CategoryDescriptionProps {
//   categoryKey: 'domains' | 'categories';
//   categoryName: string | null;
//   isLoading?: boolean;
//   size?: 'sm' | 'md' | 'lg';
// }

// export function CategoryDescription({
//   categoryKey,
//   categoryName,
//   size = 'md',
//   isLoading
// }: CategoryDescriptionProps) {
//   const { t } = useTranslation();

//   function categoryDescription() {
//     if(!categoryName || isLoading) return
//     if (categoryKey == 'domains') {
//       if (Object.keys(DomainDescription).includes(categoryName)) {
//         return t(`domainDescription.${categoryName}`);
//       }
//     }
//     if (categoryKey == 'categories') {
//       if (Object.keys(CategoryDescriptionEnum).includes(categoryName)) {
//         return t(`categoryDescription.${categoryName}`);
//       }
//     }
//     return null;
//   }

//   const sizeConfig = {
//     sm: {
//       header: 'text-xs',
//       text: 'text-[0.6em]',
//     },
//     md: {
//       header: 'text-sm font-[600]',
//       text: 'text-[0.8em]',
//     },
//     lg: {
//       header: 'text-xl font-bold',
//       text: 'text-xs',
//     },
//   };

//   const config = sizeConfig[size];

//   const key = categoryKey;

//   return (
//     <div className="flex items-center">
//       <div className="mr-2 flex aspect-square items-center justify-center transition-all duration-0">
//           <Skeleton
//             loading={isLoading}
//             className={
//               isLoading ? 'size-full bg-background-secondary' : 'size-full'
//             }
//           >
//           <SkillImage {...{ [categoryKey]: categoryName }} size={size}/>
//         </Skeleton>
//       </div>
//       <div className="">

//           <Skeleton
//             loading={isLoading}
//             className={
//               isLoading ? 'size-full bg-background-secondary' : ''
//             }
//           >
//         <div className={`${config.header}`}>{t(`${key}.${categoryName}`)}</div>
//         </Skeleton>
//                   <Skeleton
//             loading={isLoading}
//             className={
//               isLoading ? 'size-full bg-background-secondary min-w-10 h-2 my-1' : ''
//             }
//           >
//         <div className="flex items-center text-[0.8em] font-[500] leading-3 text-text-secondary">
//           <span className={`${config.text} truncate`}>{categoryDescription()}</span>
//         </div>
//         </Skeleton>
//       </div>
//     </div>
//   );
// }
