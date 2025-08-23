import { Dispatch, SetStateAction, useState } from 'react';

import { buttonsList } from '@/config/buttons';
import { useCurrencyStore } from '@/store/currencyStore';
import { OrderButton } from '@/components/ui/OrderButtons';

export function useOrderByState(
  buttonNames: string[]
): [OrderButton, Dispatch<SetStateAction<OrderButton>>, OrderButton[]] {
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);
  const buttons = buttonsList(buttonNames, selectedCurrency);

  const [orderByState, setOrderBy] = useState<OrderButton>(() => {
    return buttons[0];
  });

  return [orderByState, setOrderBy, buttons];
}
