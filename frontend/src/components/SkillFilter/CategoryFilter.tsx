import { useState } from 'react';
import { ScrollArea, Switch, Text, TextField, Tooltip } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { IoInformationCircleOutline } from 'react-icons/io5';

import { Category } from '@/interfaces';
import {
  Select,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/AppSelect';

import { CategoryFilterItem } from './CategoryFilter/CategoryFilterItem';
import { CategoryFilterTrigger } from './CategoryFilter/CategoryFilterTrigger';

type CategoryFilterProps = {
  options: Category[];
  categoryKey: 'domains' | 'categories';
  onChange: (selected: Category | null, strict: boolean) => void;
  icon: JSX.Element;
  selected: Category | null;
};

function CategoryFilter({
  options: defaultOptions,
  categoryKey,
  icon,
  onChange,
  selected,
}: CategoryFilterProps) {
  const [textFilter, setTextFilter] = useState<string | number | undefined>('');
  const [strictFilter, setStrictFilter] = useState(true);
  const { t } = useTranslation();
  const defaultName = categoryKey == 'domains' ? 'allDomains' : 'allCategories';

  function getFilteredOptions() {
    if (!textFilter) return defaultOptions;
    return defaultOptions.filter(option =>
      option.name.toLowerCase().includes(String(textFilter).toLowerCase())
    );
  }

  function selectCategory(categoryName: string) {
    const category = defaultOptions.find(c => c.name === categoryName) ?? null;
    onChange(category, strictFilter);
  }

  function categoriesList() {
    return (
      <div>
        <div>
          {<CategoryFilterItem category={null} categoryKey={categoryKey} />}
        </div>
        {getFilteredOptions()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c: Category) => (
            <CategoryFilterItem
              key={c.name}
              category={c}
              categoryKey={categoryKey}
            />
          ))}
      </div>
    );
  }

  return (
    <Select onValueChange={selectCategory} defaultValue={defaultName}>
      <SelectTrigger className="h-full">
        <CategoryFilterTrigger
          icon={icon}
          category={selected}
          categoryKey={categoryKey}
        />
      </SelectTrigger>

      <SelectContent side="bottom">
        <div className="border-shadow-full z-40 p-2">
          <TextField.Root
            placeholder={t('categoryFilter.placeholder')}
            size="2"
            value={textFilter}
            onChange={e => {
              e.stopPropagation();
              setTextFilter(e.target.value);
            }}
            className="border-shadow-full bg-background-secondary/50 outline-background-secondary"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            onFocus={e => e.stopPropagation()}
          >
            <TextField.Slot>
              <BiSearch height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <div className="flex items-end justify-between">
            <div>
              <div className="mt-2 flex items-center">
                <Text as="label" size="2" className="flex">
                  <Switch
                    size="1"
                    checked={strictFilter}
                    onCheckedChange={v => {
                      setStrictFilter(v);
                      onChange(selected, v);
                    }}
                    color="ruby"
                  />
                  <span className="ml-1">
                    {t('categoryFilter.strictMatch')}
                  </span>
                </Text>
                <Tooltip
                  content={t('categoryFilter.strictModeTooltipCategory')}
                  className=""
                >
                  <div>
                    <IoInformationCircleOutline
                      className="ml-1 inline cursor-help text-text-secondary"
                      size={14}
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea
          className="h-72 max-h-fit rounded"
          scrollHideDelay={0}
          type="always"
          scrollbars="vertical"
        >
          <div className="flex w-80 flex-col rounded p-2 text-text">
            {categoriesList()}
          </div>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
