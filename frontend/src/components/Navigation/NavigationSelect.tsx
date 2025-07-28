import { Button, Menu } from '@chakra-ui/react';
import { Spinner } from '@radix-ui/themes';
import { FaCheck } from 'react-icons/fa';

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
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '2xs' | 'xs' | undefined;
}

export function NavigationSelect({
  title,
  icon,
  options,
  onSelect,
  selectedOptionCode,
  size = 'md',
}: NavigationSelectProps) {
  const triggerIcon = icon;
  return (
    <Menu.Root defaultHighlightedValue={selectedOptionCode}>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          className="flex aspect-square size-fit items-center !bg-transparent !p-0"
          title={title}
          size={size}
        >
          {!!options.length && !!selectedOptionCode && icon ? (
            triggerIcon
          ) : (
            <Spinner loading />
          )}
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="min-w-max rounded-md border-[1px] border-background-secondary bg-background-primary p-0 text-text shadow-md shadow-background-gray focus:outline-background-secondary">
          <div className="min-w-36 p-2">
            {options.map(option => (
              <Menu.Item
                className={`flex min-w-max cursor-pointer items-center justify-between rounded px-2 py-3 hover:bg-background-secondary focus:bg-background-secondary data-[highlighted]:bg-background-secondary ${option.code === selectedOptionCode ? 'bg-background-secondary' : ''}`}
                key={option.code}
                onClick={() => onSelect(option)}
                value={option.code}
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
              </Menu.Item>
            ))}
          </div>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
