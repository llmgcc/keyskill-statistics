import { memo } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

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

function OrderButtons_({
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
