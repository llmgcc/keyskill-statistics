import { useEffect, useState } from 'react';
import { useLangStore } from '@/store/languageStore';
import { Popover, SegmentedControl } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { Categories, CategoriesStyle } from '@/config/categories';
import { Language } from '@/config/languages';
import { Technologies, TechnologiesStyle } from '@/config/technologies';
import { Category } from '@/config/types';
import SkillImage from '@/components/ui/SkillImage';

import { CategoryPieChart } from '../plot/CategoryPieChart';

type SkillDescriptionProps = {
  name: string;
  categories: Category[];
  technologies: Category[];
  image?: string;
  translation?: string;
};

function CategoryPopover({
  skill,
  defaultKey,
}: {
  skill: SkillDescriptionProps;
  defaultKey: string;
}) {
  const [buttonKey, setButtonKey] = useState<string | null>(null);
  const [popoverContent, setPopoverContent] = useState<Category[]>([]);
  const { t } = useTranslation();
  const categories = skill[defaultKey as string] ?? [];
  const translationKey = defaultKey == 'categories' ? 'domains' : 'categories';

  const getColor = (category) => {
    if (Object.values(Categories).includes(category.name as Categories)) {
      return CategoriesStyle[category.name as Categories].color;
    }
    if (Object.values(Technologies).includes(category.name as Technologies)) {
      return TechnologiesStyle[category.name as Technologies].color;
    }
    return '#000000';
  };
  const getIcon = (category) => {
    if (Object.values(Categories).includes(category.name as Categories)) {
      return CategoriesStyle[category.name as Categories].logo;
    }
    if (Object.values(Technologies).includes(category.name as Technologies)) {
      return TechnologiesStyle[category.name as Technologies].logo;
    }
    return null;
  };

  function updateContent(key: string) {
    const content =
      skill[key]?.map((c) => ({
        ...c,
        color: getColor(c),
        value: c.confidence,
        icon: getIcon(c),
        name: t(`${translationKey}.${c.name}`),
      })) ?? [];

    console.log('content', content);

    const maxValue = Math.max(...content.map((c) => c.value));

    const filteredContent = content.filter(
      (c) => c.value / maxValue >= 5 / 100,
    );
    const confidenceSum = filteredContent
      .map((c) => c.value)
      .reduce((a, b) => a + b, 0);

    filteredContent.push({
      name: t('common.unknownCategory'),
      value: 1 - confidenceSum,
      color: '#999999',
    });

    setPopoverContent(filteredContent ?? []);
  }

  useEffect(() => {
    setButtonKey(defaultKey);
    updateContent(defaultKey);
  }, [defaultKey, skill]);

  useEffect(() => {
    if (buttonKey) {
      updateContent(buttonKey);
      // setPopoverContent(skill[buttonKey as any].map(c => ({...c, color: getColor(c), value: c.confidence})) ?? [])
    }
  }, [buttonKey, skill]);

  const name = skill.name;
  // const categories = skill.categories ?? []

  const color = (n: number) => {
    return 'text-text-secondary cursor-pointer select-none hover:text-text-secondary/80';
    n = n * 100;
    if (n < 50) {
      return 'text-red-400';
    }
    if (n <= 75) {
      return 'text-yellow-400';
    } else {
      return 'text-green-400';
    }
  };

  const colors = categories.map((category) => {
    if (Object.values(Categories).includes(category.name as Categories)) {
      return CategoriesStyle[category.name as Categories].color;
    }
    if (Object.values(Technologies).includes(category.name as Technologies)) {
      return TechnologiesStyle[category.name as Technologies].color;
    }
    return '#000000';
  });

  const category = categories?.[0] ?? null;
  // const content = popoverContent?.map((c, index) => ({name: c.name, value: c.confidence, color: colors[index]})) ?? []

  return (
    <Popover.Root>
      <Popover.Trigger className="hover:trigger">
        <div
          className={`'cursor-pointer' ${color(category?.confidence ?? 0)}`}
          onClick={() => setButtonKey(defaultKey)}
        >
          {t(`${translationKey}.${category?.name}`) ??
            t(`common.unknownCategory`)}
        </div>
      </Popover.Trigger>
      <Popover.Content className="min-w-max rounded-md border-[1px] border-background-secondary !p-0 shadow-background-secondary">
        <div className="flex items-center justify-between border-b-[1px] border-background-secondary px-2 py-2 text-sm">
          <div className="flex items-center">
            <div className="text-sm font-[500]">{name}</div>
          </div>
          <div className="flex items-center">
            <div>
              <SegmentedControl.Root
                defaultValue={buttonKey ?? defaultKey}
                size={'1'}
                className=""
                onValueChange={(value) => setButtonKey(value)}
              >
                <SegmentedControl.Item
                  value="categories"
                  className="cursor-pointer"
                >
                  Fields
                </SegmentedControl.Item>
                <SegmentedControl.Item
                  value="technologies"
                  className="cursor-pointer"
                >
                  Categories
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
      </Popover.Content>
    </Popover.Root>
  );
}

function SkillDescription(props: SkillDescriptionProps) {
  const { lang } = useLangStore();

  const skillName =
    lang == Language.ru ? props.name : (props.translation ?? props.name);

  return (
    <div className="flex items-center text-sm font-[500] leading-none">
      <div className="mr-2 flex aspect-square w-6 items-center justify-center">
        <SkillImage
          category={props.categories?.[0]?.name ?? null}
          technology={props.technologies?.[0]?.name ?? null}
          path={props.image}
        />
      </div>
      <div className="mx-[4px]">
        <div className="text-sm font-[600] capitalize">{skillName}</div>
        <div className="flex items-center text-[0.8em] leading-3 text-text-secondary">
          <div className="">
            <CategoryPopover skill={props} defaultKey="categories" />
          </div>
          <div className="mx-1">•</div>
          <div className="">
            <CategoryPopover skill={props} defaultKey="technologies" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDescription;
