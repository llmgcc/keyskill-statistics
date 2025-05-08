import { useState } from 'react';
import { KeySkill } from '@/interfaces';
import { SegmentedControl } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { Categories, CategoriesStyle } from '@/config/categories';
import { Technologies, TechnologiesStyle } from '@/config/technologies';
import { Category } from '@/config/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/AppPopover';

import { CategoryPieChart } from '../plot/CategoryPieChart';

type SkillKey = 'categories' | 'technologies';
interface CategoryPopoverProps {
  skill: KeySkill;
  defaultKey: SkillKey;
}

export function CategoryPopover({ skill, defaultKey }: CategoryPopoverProps) {
  const [buttonKey, setButtonKey] = useState<SkillKey>(defaultKey);
  const { t, i18n } = useTranslation();
  const categories = skill[defaultKey] ?? [];

  const getTranslationKey = (key: SkillKey) => {
    return key == 'categories' ? 'domains' : 'categories';
  };

  const getColor = (category: Category) => {
    if (Object.values(Categories).includes(category.name as Categories)) {
      return CategoriesStyle[category.name as Categories].color;
    }
    if (Object.values(Technologies).includes(category.name as Technologies)) {
      return TechnologiesStyle[category.name as Technologies].color;
    }
    return '#000000';
  };

  const getIcon = (category: Category) => {
    if (Object.values(Categories).includes(category.name as Categories)) {
      return CategoriesStyle[category.name as Categories].logo;
    }
    if (Object.values(Technologies).includes(category.name as Technologies)) {
      return TechnologiesStyle[category.name as Technologies].logo;
    }
    return null;
  };

  function getPopoverContent() {
    const content =
      skill[buttonKey]?.map((c) => ({
        ...c,
        color: getColor(c),
        value: c.confidence,
        icon: getIcon(c),
        name: t(`${getTranslationKey(buttonKey)}.${c.name}`),
      })) ?? [];

    const maxValue = Math.max(...content.map((c) => c.value));

    const filteredContent: { name: string; color: string; value: number }[] =
      content.filter((c) => c.value / maxValue >= 5 / 100);
    const confidenceSum = filteredContent
      .map((c) => c.value)
      .reduce((a, b) => a + b, 0);

    filteredContent.push({
      name: t('common.unknownCategory'),
      value: 1 - confidenceSum,
      color: '#999999',
    });
    return filteredContent ?? [];
  }

  const popoverContent = getPopoverContent();
  const name = skill.name;
  const category = categories?.[0] ?? null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="cursor-pointer select-none text-text-secondary hover:text-text-secondary/80"
          onClick={() => setButtonKey(defaultKey)}
        >
          {t(`${getTranslationKey(defaultKey)}.${category?.name}`) ??
            t(`common.unknownCategory`)}
        </div>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex items-center justify-between border-b-[1px] border-background-secondary px-2 py-2 text-sm">
          <div className="flex items-center">
            <div className="text-sm font-[500]">
              {i18n.language == 'ru' ? name : (skill.translation ?? name)}
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <SegmentedControl.Root
                value={buttonKey}
                size={'1'}
                onValueChange={(value) => setButtonKey(value as SkillKey)}
              >
                <SegmentedControl.Item
                  value="categories"
                  className="cursor-pointer"
                >
                  {t('common.domains')}
                </SegmentedControl.Item>
                <SegmentedControl.Item
                  value="technologies"
                  className="cursor-pointer"
                >
                  {t('common.categories')}
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </div>
          </div>
        </div>

        <div className="flex min-w-max px-2 py-4">
          <div className="min-w-fit">
            <CategoryPieChart data={popoverContent} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
