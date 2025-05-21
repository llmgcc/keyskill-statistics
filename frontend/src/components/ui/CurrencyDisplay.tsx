import { useEffect, useRef } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';

type CurrencyDisplayProps = {
  valueInRUB?: number;
};

export function CurrencyDisplay({ valueInRUB }: CurrencyDisplayProps) {
  const { selectedCurrency } = useCurrencyStore();
  const prevCurrencyAbbr = useRef(selectedCurrency?.currency_abbr);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      selectedCurrency?.currency_abbr &&
      prevCurrencyAbbr.current !== selectedCurrency.currency_abbr
    ) {
      const textColorClass = ['text-[rgb(var(--color-background-accent))]', 'font-[600]'];
      divRef.current?.classList.add(...textColorClass);
      const timer = setTimeout(() => {
        divRef.current?.classList.remove(...textColorClass);
      }, 500);

      prevCurrencyAbbr.current = selectedCurrency.currency_abbr;
      return () => {
        clearTimeout(timer);
        divRef.current?.classList.remove(...textColorClass);
      };
    }
  }, [selectedCurrency?.currency_abbr]);

  if (!valueInRUB || !selectedCurrency?.currency_rate) {
    return <div>N/A</div>;
  }

  return (
    <div
      style={{
        transition: 'color 0.5s ease font-weight 0.5s easy',
      }}
      className="z-40"
      ref={divRef}
    >
      {selectedCurrency?.currency_abbr}
      {(valueInRUB * selectedCurrency.currency_rate).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </div>
  );
}
