import * as React from 'react';
import {
  createListCollection,
  Portal,
  Select as SelectPrimitive,
  SelectValueChangeDetails,
} from '@chakra-ui/react';

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
  >(({ children, ...props }, forwardedRef) => {
    return (
      <>
        <SelectPrimitive.HiddenSelect />
        <SelectPrimitive.Control className="!min-w-max">
          <SelectPrimitive.Trigger
            ref={forwardedRef}
            {...props}
            className="!w-full test-base cursor-pointer border-[1px] border-background-secondary hover:bg-background-secondary data-[state=open]:bg-background-secondary"
          >
            <SelectPrimitive.ValueText className="min-w-max pr-6">
              {children}
            </SelectPrimitive.ValueText>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.IndicatorGroup>
            <SelectPrimitive.Indicator />
          </SelectPrimitive.IndicatorGroup>
        </SelectPrimitive.Control>
      </>
    );
  })
);

export const SelectContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
  >(({ children, ...props }, forwardedRef) => {
    return (
      <Portal>
        <SelectPrimitive.Positioner>
          <SelectPrimitive.Content
            position="popper"
            className="SelectContent min-w-max rounded-md border-[1px] border-background-secondary bg-background-primary text-text shadow-md shadow-background-gray focus:outline-background-secondary"
            ref={forwardedRef}
            {...props}
          >
            {children}
          </SelectPrimitive.Content>
        </SelectPrimitive.Positioner>
      </Portal>
    );
  })
);

export const SelectItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
  >(({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        {...props}
        ref={forwardedRef}
        className="relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-background-secondary focus:bg-background-secondary data-[state=checked]:bg-background-secondary"
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator
          color={'green.400'}
        ></SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  })
);

interface AppSelectProps {
  options: string[];
  value: string;
  onValueChange: (details: SelectValueChangeDetails<string>) => void;
  triggerFormatter: () => JSX.Element;
  valueFormatter: (value: string) => JSX.Element;
  className?: string
}

export function AppSelect({
  value,
  options,
  onValueChange,
  triggerFormatter,
  valueFormatter,
  className=""
}: AppSelectProps) {
  const collection = createListCollection({
    items: options,
  });

  return (
    <div>
      <Select
        collection={collection}
        size="xs"
        value={[value]}
        onValueChange={onValueChange}
        className={`min-w-max ${className}`}
      >
        <SelectTrigger
          style={{ width: 'fit-content', minWidth: 'auto' }}
          minWidth={'max-content'}
        >
          {triggerFormatter()}
        </SelectTrigger>
        <SelectContent>
          {collection.items.map(e => (
            <SelectItem key={e} item={e}>
              {valueFormatter(e)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
