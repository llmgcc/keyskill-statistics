import * as React from 'react';
import { Portal, Select as SelectPrimitive } from '@chakra-ui/react';

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
  >(({ children, ...props }, forwardedRef) => {
    return (
      <>
        <SelectPrimitive.HiddenSelect />
        <SelectPrimitive.Control>
          <SelectPrimitive.Trigger
            ref={forwardedRef}
            {...props}
            className="test-base cursor-pointer border-[1px] border-background-secondary hover:bg-background-secondary data-[state=open]:bg-background-secondary"
          >
            <SelectPrimitive.ValueText
              placeholder="Select member"
              className="min-w-max pr-6"
            >
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
        className="relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm font-[400] outline-none hover:bg-background-secondary focus:bg-background-secondary data-[state=checked]:bg-background-secondary"
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator
          color={'green.400'}
        ></SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  })
);
