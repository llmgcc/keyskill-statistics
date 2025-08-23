import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Category } from '@/interfaces';
import { Categories } from '@/config/categories';
import { Domains } from '@/config/domains';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { useStatsStore } from '@/store/statsStore';
import { ListEnumeration } from '@/components/ui/ListEnumeration';

interface TextSectionProps {
  onLinkClick?: (tabName: string) => void;
}

export function TextSection({ onLinkClick }: TextSectionProps) {
  const stats = useStatsStore(state => state.stats);
  const categories = useCategoriesStore(state => state.categories);
  const domains = useDomainsStore(state => state.domains);
  const { t } = useTranslation();

  const preferredDomains: Category[] = [
    domains.find(c => c.name === Domains['Backend Development']) ?? null,
    domains.find(c => c.name === Domains['Data Science']) ?? null,
    domains.find(c => c.name === Domains['Project Management']) ?? null,
  ].filter(e => e !== null);

  const preferredCategories: Category[] = [
    categories.find(c => c.name === Categories['Soft Skills']) ?? null,
    categories.find(c => c.name === Categories['Programming Languages']) ??
      null,
    categories.find(c => c.name === Categories.Databases) ?? null,
  ].filter(e => e !== null);

  const badge = (
    <span className="rounded-lg bg-[#f1f4f9] px-2 py-1 font-mono font-normal text-[#5e6c77]" />
  );
  const text = <span className="text-text-primary" />;
  const linkto = (
    <Link
      to="https://dev.hh.ru/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-background-accent underline underline-offset-4"
    />
  );

  const linkToCategory = (
    <Link
      to=""
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        onLinkClick?.('categories');
      }}
      className="text-background-accent underline underline-offset-4"
    />
  );
  const linkToDomain = (
    <Link
      to=""
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();
        onLinkClick?.('domains');
      }}
      className="text-background-accent underline underline-offset-4"
    />
  );

  return (
    <div className="app-container relative z-10">
      <div className="gradient absolute left-0 -z-10 size-full h-[100%]"></div>
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
                list={preferredDomains.map(c => t(`domains.${c.name}`))}
                maxToDisplay={3}
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
                list={preferredCategories.map(c => t(`categories.${c.name}`))}
                maxToDisplay={3}
              />
            </div>
            <div>{t('mainText.end')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
