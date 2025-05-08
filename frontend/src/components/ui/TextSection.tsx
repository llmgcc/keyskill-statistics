import { Category } from '@/interfaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { useStatsStore } from '@/store/statsStore';
import { Link } from '@radix-ui/themes';
import { Trans, useTranslation } from 'react-i18next';

import { Categories } from '@/config/categories';
import { Technologies } from '@/config/technologies';

interface TextSectionProps {
  onLinkClick?: (tabIndex: number) => void;
}

interface ListEnumerationProps {
  list: Category[];
  maxToDisplay?: number;
  translationKey: string;
}

function ListEnumeration({
  list,
  maxToDisplay = 3,
  translationKey,
}: ListEnumerationProps) {
  const { t } = useTranslation();
  if (!list?.length) return '';
  const displayList = list.slice(0, maxToDisplay);
  const renderItem = (item: Category) => {
    return (
      <span className="text-text">{t(`${translationKey}.${item.name}`)}</span>
    );
  };
  if (displayList.length === 1) {
    return renderItem(displayList[0]);
  }
  if (displayList.length === 2) {
    return (
      <>
        {renderItem(displayList[0])} {t('common.and')}{' '}
        {renderItem(displayList[1])}
      </>
    );
  }
  return (
    <>
      {displayList
        .slice(0, -1)
        .map((item) => renderItem(item))
        .reduce((result, item) => (
          <>
            {result}, {item}
          </>
        ))}{' '}
      {t('common.and')} {renderItem(displayList[displayList.length - 1])}
    </>
  );
}

export function TextSection({ onLinkClick }: TextSectionProps) {
  const { stats } = useStatsStore();
  const { categories } = useCategoriesStore();
  const { domains } = useDomainsStore();
  const { t } = useTranslation();

  const preferredDomains: Category[] = [
    domains.find((c) => c.name === Categories.Backend) ?? null,
    domains.find(
      (c) => c.name === Categories['Data Science & Machine Learning'],
    ) ?? null,
    domains.find((c) => c.name === Categories['Project management']) ?? null,
  ].filter((e) => e !== null);

  const preferredCategories: Category[] = [
    categories.find((c) => c.name === Technologies['Soft skills']) ?? null,
    categories.find((c) => c.name === Technologies.Languages) ?? null,
    categories.find((c) => c.name === Technologies.Databases) ?? null,
  ].filter((e) => e !== null);

  const badge = (
    <span className="rounded-lg bg-[#f1f4f9] px-2 py-1 font-mono font-normal text-[#5e6c77]" />
  );
  const text = <span className="text-text-primary" />;
  const linkto = (
    <Link
      href="https://dev.hh.ru/"
      target="_blank"
      rel="noopener noreferrer"
      underline="always"
    />
  );

  const linkToCategory = (
    <Link
      href=""
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        onLinkClick?.(2);
      }}
      className="cursor-pointer"
      underline="always"
    />
  );
  const linkToDomain = (
    <Link
      href=""
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        onLinkClick?.(1);
      }}
      className="cursor-pointer"
      underline="always"
    />
  );

  return (
    <div className="app-container">
      <div className="flex justify-between py-12">
        <div className="flex-col items-center justify-center">
          <h1 className="text-4xl font-bold leading-[130%] text-text">
            <Trans i18nKey="mainText.title" components={{ badge }} />
          </h1>
          <div className="mt-[8px] text-base leading-relaxed text-text-secondary">
            <Trans
              i18nKey="mainText.subtitle"
              components={{ text, linkto }}
              values={{
                vacancies: stats?.number_of_vacancies?.toLocaleString(),
                dateFrom: stats?.date_from,
                dateTo: stats?.date_to,
              }}
            />

            <div>{t('mainText.enumeration')}</div>

            <div className="mx-5">
              <Trans
                i18nKey="mainText.domains"
                components={{ linkto: linkToDomain }}
                values={{
                  count: domains?.length ?? 0,
                }}
              />{' '}
              <ListEnumeration
                list={preferredDomains}
                maxToDisplay={3}
                translationKey={'domains'}
              />
            </div>
            <div className="mx-5">
              <Trans
                i18nKey="mainText.categories"
                components={{ linkto: linkToCategory }}
                values={{
                  count: categories?.length ?? 0,
                }}
              />{' '}
              <ListEnumeration
                list={preferredCategories}
                maxToDisplay={3}
                translationKey={'categories'}
              />
            </div>
            <div>{t('mainText.end')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
