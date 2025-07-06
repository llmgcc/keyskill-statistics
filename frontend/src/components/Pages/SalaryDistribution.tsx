import { useTranslation } from 'react-i18next';

import { useSkillSalaryData } from '@/hooks/data/useSkillSalaryData';
import { useCurrencyValue } from '@/hooks/useCurrencyValue';

import { Histogram } from '../Charts/Histogram/Histogram';
import { SalaryTooltip } from '../Charts/Histogram/SalaryTooltip';
import { ValueChangeRenderer } from '../Table/renderers/ValueChangeRenderer';

interface SalaryDistributionProps {
  name: string;
  medianSalary: number;
  prevMedianSalary: number;
}

export function SalaryDistribution({
  name,
  medianSalary,
  prevMedianSalary,
}: SalaryDistributionProps) {
  const { from, to, data } = useSkillSalaryData(name, 25);
  const { t } = useTranslation();

  const { value: medianConverted, abbr, code } = useCurrencyValue(medianSalary);
  const { value: prevMedianConverted } = useCurrencyValue(prevMedianSalary);

  const difference = medianConverted - prevMedianConverted;

  return (
    <div className="rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">
        {t('charts.salaryDistribution')}
      </div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">
          {abbr}
          {Number(medianConverted).toLocaleString([], {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </div>
        <div className="flex flex-col items-end">
          <div className="mx-1 flex items-center text-xs">
            <ValueChangeRenderer
              current={medianConverted}
              prev={prevMedianConverted}
              percent={true}
            />
          </div>
          <div className="mx-1 text-xs text-text-secondary">
            {difference >= 0 ? '+' : ''}
            {difference.toLocaleString([], {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}{' '}
            {code}
          </div>
        </div>
      </div>
      <div className="mb-2 text-xs text-text-secondary">
        {t('charts.salarySubtitle')}
      </div>

      <div className="h-52 w-full">
        <Histogram
          data={{
            data,
            from,
            to,
          }}
          tooltip={<SalaryTooltip />}
        />
      </div>
    </div>
  );
}
