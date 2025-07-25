import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { OrderButton } from '@/components/Tabs/OrderButtons';

export function useOrderByState(
  buttons: OrderButton[],
  paramKey: string = 'orderBy'
): [OrderButton, (button: OrderButton) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentId = searchParams.get(paramKey) || buttons[0].id;
  const currentButton = buttons.find(b => b.id === currentId) || buttons[0];

  const setOrder = (button: OrderButton) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, button.id);
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!searchParams.get(paramKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramKey, currentButton.id);
      setSearchParams(newSearchParams);
    }
  }, [
    paramKey,
    searchParams,
    setSearchParams,
    location.pathname,
    currentButton.id,
  ]);

  return [currentButton, setOrder];
}
