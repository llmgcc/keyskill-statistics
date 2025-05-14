import { KeySkill } from '@/interfaces';
import { useTranslation } from 'react-i18next';

import { Language } from '@/config/languages';
import SkillImage from '@/components/ui/SkillImage';

import { CategoryPopover } from './CategoryPopover';

export default function SkillDescription(props: KeySkill) {
  const { i18n } = useTranslation();

  const skillName =
    i18n.language == Language.ru
      ? props.name
      : (props.translation ?? props.name);

  return (
    <div className="flex items-center truncate text-sm font-[500] leading-none">
      <div className="mr-2 flex aspect-square h-6 w-6 items-center justify-center md:h-7 md:w-7">
        <SkillImage
          domain={props.domains?.[0]?.name ?? null}
          category={props.categories?.[0]?.name ?? null}
          path={props?.image}
        />
      </div>
      <div className="mx-[4px]">
        <div className="overflow-hidden truncate text-ellipsis text-sm font-[600]">
          {skillName}
        </div>
        <div className="flex items-center truncate text-ellipsis text-[0.8em] leading-3 text-text-secondary">
          <div className="">
            <CategoryPopover skill={props} defaultKey="domains" />
          </div>
          <div className="mx-1">•</div>
          <div className="">
            <CategoryPopover skill={props} defaultKey="categories" />
          </div>
        </div>
      </div>
    </div>
  );
}
