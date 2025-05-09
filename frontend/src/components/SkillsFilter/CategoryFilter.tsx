import { useState } from 'react';
import { Category } from '@/interfaces';
import {
  ScrollArea,
  Switch,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { IoInformationCircleOutline } from 'react-icons/io5';

import { CategoriesStyle } from '@/config/categories';
import { TechnologiesStyle } from '@/config/technologies';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/AppSelect'


type CategoryFilterProps = {
  options: Category[];
  defaultName: string;
  categoryKey: 'domains' | 'categories';
  onChange: (selected: Category | null, strict: boolean) => void;
  icon: JSX.Element;
};

function CategoryFilter({
  options: defaultOptions,
  defaultName,
  categoryKey,
  icon,
  onChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [textFilter, setTextFilter] = useState<string | number | undefined>('');
  const [strictFilter, setStrictFilter] = useState(true);
  const { t } = useTranslation();

  function getColor(c: Category | null) {
    const colorsList: {
      [key: string]: {
        color: string;
        logo: JSX.Element;
      };
    } = categoryKey == 'domains' ? CategoriesStyle : TechnologiesStyle;
    if (c?.name && c?.name in colorsList) {
      return colorsList[c.name].color;
    }
    return 'rgb(var(--color-background-gray))';
  }

  function getFilteredOptions() {
    if (!textFilter) return defaultOptions;
    return defaultOptions.filter((option) =>
      option.name.toLowerCase().includes(String(textFilter).toLowerCase()),
    );
  }

  function renderCategory(category: Category | null) {
    return (
      <SelectItem
        className="flex cursor-pointer items-center justify-between bg-background-primary p-2 hover:bg-background-secondary"
        key={category?.name ?? defaultName}
        value={category?.name ?? defaultName}
      >
        <div className="flex items-center">
          <div
            className="aspect-square h-4 w-4 rounded"
            style={{ backgroundColor: getColor(category) }}
          ></div>
          <div className="mx-1 max-w-56 truncate text-sm text-text">
            {category?.name
              ? t(`${categoryKey}.${category.name}`)
              : defaultName}
          </div>
        </div>
      </SelectItem>
    );
  }

  function selectCategory(categoryName: string) {
    const category = defaultOptions.find((c) => c.name === categoryName) ?? null;
    setSelectedCategory(category);
    onChange(category, strictFilter);
  }

  function categoriesList() {
    return (
      <div>
        <div>{renderCategory(null)}</div>
        {getFilteredOptions()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c: Category) => renderCategory(c))}
      </div>
    );
  }

  return (
    <Select open={isOpen} onOpenChange={setIsOpen} onValueChange={selectCategory} defaultValue={defaultName}>
      <SelectTrigger className="h-full">
        <div className='flex items-center'>
          <div>{icon}</div>
          <div className="ml-1 mr-2">
            {selectedCategory?.name ?? defaultName}
          </div>
        </div>
      </SelectTrigger>

      <SelectContent
        side="bottom"
      >
        <div className="border-shadow-full z-40 p-2">
          <TextField.Root
            placeholder={t('categoryFilter.placeholder')}
            size="2"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
            className="border-shadow-full bg-background-secondary/50 outline-background-secondary"
          >
            <TextField.Slot>
              <BiSearch height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <div className="mt-2 flex items-center">
            <Text as="label" size="2" className="flex">
              <Switch
                size="1"
                checked={strictFilter}
                onCheckedChange={(v) => {
                  setStrictFilter(v);
                  onChange(selectedCategory, v);
                }}
              />
              <span className="ml-1">{t('categoryFilter.strictMatch')}</span>
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
            </Text>
          </div>
        </div>
        <ScrollArea
          className="h-72 rounded"
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
