import { Category, Stats } from '@/interfaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { Trans, useTranslation } from 'react-i18next';

interface TextSectionProps {
  stats?: Stats;
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
        .map((item, i) => renderItem(item))
        .reduce((result, item) => (
          <>
            {result}, {item}
          </>
        ))}{' '}
      {t('common.and')} {renderItem(displayList[displayList.length - 1])}
    </>
  );
}

export function TextSection({ stats }: TextSectionProps) {
  const { categories } = useCategoriesStore();
  const { domains } = useDomainsStore();
  const { t } = useTranslation();

  const badge = (
    <span className="rounded-lg bg-[#f1f4f9] px-2 py-1 font-mono font-normal text-[#5e6c77]" />
  );
  const text = <span className="text-text-primary" />;
  const linkto = <span className="text-blue-400" />;

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
                components={{ linkto }}
                values={{
                  count: domains?.length ?? 0,
                }}
              />{' '}
              <ListEnumeration
                list={domains}
                maxToDisplay={3}
                translationKey={'domains'}
              />
            </div>
            <div className="mx-5">
              <Trans
                i18nKey="mainText.categories"
                components={{ linkto }}
                values={{
                  count: categories?.length ?? 0,
                }}
              />{' '}
              <ListEnumeration
                list={categories}
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
