import * as React from 'react';
import { Theme } from '@radix-ui/themes';
import { Select as SelectPrimitive } from 'radix-ui';
import { BiChevronDown } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Trigger
      ref={forwardedRef}
      {...props}
      className="border-shadow-full flex cursor-pointer items-center rounded bg-background-secondary px-2 py-1 text-sm outline-background-secondary hover:bg-background-gray hover:shadow-none hover:outline-background-gray focus:shadow-background-gray focus:outline-background-gray"
    >
      <SelectPrimitive.Value>{children}</SelectPrimitive.Value>
      <SelectPrimitive.Icon className="text-text">
        <BiChevronDown size={20} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Portal>
      <Theme>
        <SelectPrimitive.Content
          position="popper"
          className="SelectContent min-w-max rounded-md border-2 border-background-secondary bg-background-primary text-text shadow-md shadow-background-gray focus:outline-background-secondary"
          sideOffset={5}
          align="end"
          ref={forwardedRef}
          {...props}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </Theme>
    </SelectPrimitive.Portal>
  );
});

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={forwardedRef}
      className="relative flex cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 text-sm font-[400] outline-none focus:bg-background-secondary data-[state=checked]:bg-background-secondary"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <FaCheck className="ml-4 text-xs text-green-400" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
