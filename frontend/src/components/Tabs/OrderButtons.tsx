import { useEffect, useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdEqualizer } from 'react-icons/md';

import { CurrencyIcons } from '@/config/currencies';
import { useCurrencyStore } from '@/store/currencyStore';

interface OrderButtonsProps {
  onChange: (column: string, descending: boolean) => void;
}

export function OrderButtons({ onChange }: OrderButtonsProps) {
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);
  const [orderButtonIndex, setOrderButtonIndex] = useState<number>(0);

  const buttons = useMemo(
    () => [
      {
        icon: <MdEqualizer />,
        id: 'popular',
        column: 'place',
        descending: false,
      },
      {
        icon: <FaArrowTrendUp />,
        id: 'trending',
        column: 'change',
        descending: true,
      },
      {
        icon: CurrencyIcons[selectedCurrency!.currency_code],
        id: 'highestSalary',
        column: 'average_salary',
        descending: true,
      },
    ],
    [selectedCurrency]
  );

  useEffect(() => {
    onChange(buttons[0].column, buttons[0].descending);
  }, [buttons, onChange]);

  return (
    <div className="flex items-center gap-1">
      {buttons.map((b, i) => (
        <Button
          onClick={() => {
            setOrderButtonIndex(i);
            onChange(b.column, b.descending);
          }}
          key={b.id}
          size="xs"
          variant={'outline'}
          className={`${orderButtonIndex === i ? 'border-background-accent text-background-accent' : 'border-background-secondary text-text-secondary'} flex items-center gap-1 rounded-md border-[1px] hover:bg-background-secondary`}
        >
          <div>{b.icon}</div>
          {t(`common.${b.id}`)}
        </Button>
      ))}
    </div>
  );
}
