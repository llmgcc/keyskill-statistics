import { useNavigate, useParams } from 'react-router-dom';

import { useDomainDetails } from '@/hooks/data/useDomainDetails';

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

  if (isError) {
    navigate('/');
  }

  return (
    <div className="app-container">
      <div className="rounded bg-background-primary py-2">
        <div>
          <DomainHeader domain={domainDetails} isLoading={domainChanged} />
        </div>
        <StickyFilter />

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full md:flex-[65]">
            <DomainTrend
              domain={domainDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
          <div className="w-full md:flex-[35]">
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
