import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, ...props }, forwardedRef) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      className="min-w-max rounded-md border-2 border-background-secondary bg-background-primary !p-2 text-text shadow-md shadow-background-gray focus:outline-background-secondary"
      sideOffset={5}
      align="start"
      {...props}
      ref={forwardedRef}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
