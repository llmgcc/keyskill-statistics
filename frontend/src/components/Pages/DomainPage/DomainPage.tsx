import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useDomainDetails } from '@/hooks/data/useDomainDetails';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';

import { Complexity } from '../Common/Complexity';
import { StickyFilter } from '../Common/StickyFilter';
import { DomainHeader } from './DomainHeader';
import { DomainPageTabs } from './DomainPageTabs';
import { DomainSalary } from './DomainSalary';
import { DomainTrend } from './DomainTrend';

export function DomainPage() {
  const { name } = useParams<{ name: string }>();
  const { domainDetails, isLoading, isFetching, isError } = useDomainDetails(
    name ?? null
  );
  const navigate = useNavigate();
  const domainChanged = domainDetails?.name !== name;
  const { t } = useTranslation();
  useDocumentTitle(
    domainDetails?.name ? t(`domains.${domainDetails.name}`) : null
  );

  if (isError) {
    navigate('/');
  }

  return (
    <div className="app-container">
      <AppBreadcrumb
        className="pb-1"
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.domains'), url: '/domains' },
          {
            displayName: domainDetails?.name
              ? domainDetails?.name
                ? t(`domains.${domainDetails.name}`)
                : ''
              : '',
            url: '/domains/',
          },
        ]}
      />
      <div className="rounded bg-background-primary py-2">
        <div>
          <DomainHeader domain={domainDetails} isLoading={domainChanged} />
        </div>
        <StickyFilter />

        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="w-full lg:flex-[65]">
            <DomainTrend
              domain={domainDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
          <div className="w-full lg:flex-[35]">
            <DomainSalary
              domain={domainDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 2xl:flex-row">
          <div className="order-2 flex flex-[70] flex-col gap-2 2xl:order-1">
            <Complexity
              data={domainDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
            <DomainPageTabs
              domain={domainChanged ? null : (domainDetails ?? null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
