import { Button, Spinner } from '@radix-ui/themes';
import { FaCheck } from 'react-icons/fa';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/AppPopover';

interface Option {
  code: string;
  name: string;
}

interface NavigationSelectProps {
  title: string;
  icon: JSX.Element | null;
  options: Option[];
  onSelect: (option: Option) => void;
  selectedOptionCode: string | null;
}

export function NavigationSelect({
  title,
  icon,
  options,
  onSelect,
  selectedOptionCode,
}: NavigationSelectProps) {
  const triggerIcon = icon;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="soft"
          className="ml-1 flex aspect-square size-fit items-center !bg-transparent !p-0"
          title={title}
        >
          {!!options.length && !!selectedOptionCode && icon ? (
            triggerIcon
          ) : (
            <Spinner loading />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-36 p-2">
          {options.map((option) => (
            <div
              className={`flex min-w-max cursor-pointer items-center justify-between rounded px-2 py-3 hover:text-background-accent ${option.code === selectedOptionCode ? 'bg-background-secondary' : ''}`}
              key={option.code}
              onClick={() => onSelect(option)}
            >
              <div className="flex">
                <div className="mr-2 text-sm font-[500] text-text-secondary">
                  {option.code.toUpperCase()}
                </div>
                <div className="text-sm font-[500]">{option.name}</div>
              </div>
              <div className="ml-4 text-xs text-green-400">
                {option.code === selectedOptionCode ? <FaCheck /> : null}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
