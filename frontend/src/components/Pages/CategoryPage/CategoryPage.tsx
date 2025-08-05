import { useNavigate, useParams } from 'react-router-dom';

import { useCategoryDetails } from '@/hooks/data/useCategoryDetails';

import { Complexity } from '../Common/Complexity';
import { StickyFilter } from '../Common/StickyFilter';
import { CategoryHeader } from './CategoryHeader';
import { CategoryPageTabs } from './CategoryPageTabs';
import { CategorySalary } from './CategorySalary';
import { CategoryTrend } from './CategoryTrend';

export function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const { categoryDetails, isLoading, isFetching, isError } =
    useCategoryDetails(name ?? null);
  const navigate = useNavigate();
  const categoryChanged = categoryDetails?.name !== name;

  if (isError) {
    navigate('/');
  }

  return (
    <div className="app-container">
      <div className="rounded bg-background-primary py-2">
        <div>
          <CategoryHeader category={categoryDetails} isLoading={isLoading} />
        </div>
        <StickyFilter />
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="w-full lg:flex-[65]">
            <CategoryTrend
              category={categoryDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
          <div className="w-full lg:flex-[35]">
            <CategorySalary
              category={categoryDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 2xl:flex-row">
          <div className="order-2 flex flex-[70] flex-col gap-2 2xl:order-1">
            <Complexity
              data={categoryDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
            <CategoryPageTabs
              category={categoryChanged ? null : (categoryDetails ?? null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
