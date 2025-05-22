import { Category } from '@/interfaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { useStatsStore } from '@/store/statsStore';
import { Link } from '@radix-ui/themes';
import { Trans, useTranslation } from 'react-i18next';

import { Categories } from '@/config/categories';
import { Domains } from '@/config/domains';
import { ListEnumeration } from '@/components/TextSection/ListEnumeration';

interface TextSectionProps {
  onLinkClick?: (tabName: string) => void;
}

export function TextSection({ onLinkClick }: TextSectionProps) {
  const stats = useStatsStore((state) => state.stats);
  const categories = useCategoriesStore((state) => state.categories);
  const domains = useDomainsStore((state) => state.domains);
  const { t } = useTranslation();

  const preferredDomains: Category[] = [
    domains.find((c) => c.name === Domains['Backend development']) ?? null,
    domains.find(
      (c) => c.name === Domains['Data Science & Machine Learning'],
    ) ?? null,
    domains.find((c) => c.name === Domains['Project management']) ?? null,
  ].filter((e) => e !== null);

  const preferredCategories: Category[] = [
    categories.find((c) => c.name === Categories['Soft skills']) ?? null,
    categories.find((c) => c.name === Categories.Languages) ?? null,
    categories.find((c) => c.name === Categories.Databases) ?? null,
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
      color="ruby"
    />
  );

  const linkToCategory = (
    <Link
      href=""
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        onLinkClick?.('categories');
      }}
      className="cursor-pointer"
      underline="always"
      color="ruby"
    />
  );
  const linkToDomain = (
    <Link
      href=""
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        onLinkClick?.('domains');
      }}
      className="cursor-pointer"
      underline="always"
      color="ruby"
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
