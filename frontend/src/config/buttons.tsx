import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { GrNew } from 'react-icons/gr';
import { LuEqualApproximately } from 'react-icons/lu';
import { MdEqualizer } from 'react-icons/md';

import { Currency } from '@/interfaces';
import { CurrencyIcons } from '@/config/currencies';
import { OrderButton } from '@/components/ui/OrderButtons';

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
      id: 'growingSalary',
      column: 'unknown_salary',
      descending: true,
    },
  ];
  return (
    buttons
      .map(b => commonButtons.find(c => c.id === b))
      .filter(e => e !== undefined) ?? []
  );
}
