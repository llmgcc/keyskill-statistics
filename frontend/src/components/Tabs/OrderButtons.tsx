import { memo } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { GrNew } from 'react-icons/gr';
import { LuEqualApproximately } from 'react-icons/lu';
import { MdEqualizer } from 'react-icons/md';

import { Currency } from '@/interfaces';
import { CurrencyIcons } from '@/config/currencies';

export interface OrderButton {
  icon: JSX.Element | null;
  id: string;
  column: string;
  descending: boolean;
}

interface OrderButtonsProps {
  onChange: (orderButton: OrderButton) => void;
  buttons: OrderButton[];
  currentButtonId: string;
}

export function buttonsList(
  buttons: string[],
  selectedCurrency?: Currency | null
) {
  const commonButtons: OrderButton[] = [
    {
      icon: <LuEqualApproximately />,
      id: 'similar',
      column: 'similarity_score',
      descending: true,
    },
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
      icon: <GrNew />,
      id: 'new',
      column: 'new',
      descending: true,
    },
    {
      icon: <FaArrowTrendDown />,
      id: 'declining',
      column: 'change',
      descending: false,
    },
    {
      icon: selectedCurrency?.currency_code
        ? CurrencyIcons[selectedCurrency.currency_code]
        : null,
      id: 'highestSalary',
      column: 'average_salary',
      descending: true,
    },
    {
      icon: selectedCurrency?.currency_code
        ? CurrencyIcons[selectedCurrency.currency_code]
        : null,
      id: 'lowestSalary',
      column: 'average_salary',
      descending: false,
    },
    {
      icon: selectedCurrency?.currency_code
        ? CurrencyIcons[selectedCurrency.currency_code]
        : null,
      id: 'unknownSalary',
      column: 'unknown_salary',
      descending: false,
    },
  ];
  return (
    buttons
      .map(b => commonButtons.find(c => c.id === b))
      .filter(e => e !== undefined) ?? []
  );
}

export function OrderButtons_({
  onChange,
  buttons,
  currentButtonId,
}: OrderButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      {buttons.map(b => (
        <Button
          onClick={() => {
            onChange(b);
          }}
          key={b.id}
          size="xs"
          variant={'outline'}
          className={`${currentButtonId === b.id ? 'border-background-accent text-background-accent' : 'border-background-secondary text-text-secondary'} flex items-center gap-1 rounded-md border-[1px] hover:bg-background-secondary`}
        >
          <div>{b.icon}</div>
          {t(`common.${b.id}`)}
        </Button>
      ))}
    </div>
  );
}

export const OrderButtons = memo(OrderButtons_);
