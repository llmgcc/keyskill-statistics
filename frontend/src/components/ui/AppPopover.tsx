import * as React from 'react';
import { Theme } from '@radix-ui/themes';
import { Popover as PopoverPrimitive } from 'radix-ui';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
  >(({ children, ...props }, forwardedRef) => (
    <PopoverPrimitive.Portal>
      <Theme>
        <PopoverPrimitive.Content
          className="min-w-max rounded-md border-2 border-background-secondary bg-background-primary !p-0 text-text shadow-md shadow-background-gray focus:outline-background-secondary"
          sideOffset={5}
          align="start"
          {...props}
          ref={forwardedRef}
        >
          {children}
        </PopoverPrimitive.Content>
      </Theme>
    </PopoverPrimitive.Portal>
  ))
);
