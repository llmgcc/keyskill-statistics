import * as React from 'react';
import {
  Popover as ChakraPopover,
  IconButton,
  Portal,
  type IconButtonProps,
} from '@chakra-ui/react';
import { HiOutlineInformationCircle } from 'react-icons/hi';

export interface ToggleTipProps extends ChakraPopover.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content?: React.ReactNode;
}

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props;

    return (
      <ChakraPopover.Root
        {...rest}
        positioning={{ ...rest.positioning, gutter: 4 }}
      >
        <ChakraPopover.Trigger asChild onClick={e => e.stopPropagation()}>
          {children}
        </ChakraPopover.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraPopover.Positioner>
            <ChakraPopover.Content
              onClick={e => e.stopPropagation()}
              width="auto"
              px="2"
              py="1"
              textStyle="xs"
              rounded="sm"
              ref={ref}
              className="border-[1px] border-background-secondary bg-background-primary shadow-md shadow-background-secondary transition-none"
            >
              {showArrow && (
                <ChakraPopover.Arrow>
                  <ChakraPopover.ArrowTip />
                </ChakraPopover.Arrow>
              )}
              {content}
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Portal>
      </ChakraPopover.Root>
    );
  }
);

export interface InfoTipProps extends Partial<ToggleTipProps> {
  buttonProps?: IconButtonProps | undefined;
}

export const InfoTip = React.forwardRef<HTMLDivElement, InfoTipProps>(
  function InfoTip(props, ref) {
    const { children, buttonProps, ...rest } = props;
    return (
      <ToggleTip content={children} {...rest} ref={ref}>
        <IconButton
          variant="ghost"
          aria-label="info"
          size="2xs"
          {...buttonProps}
          className="m-0 flex h-fit w-fit cursor-pointer items-center border-0 bg-background-primary p-0 text-inherit transition-none"
          unstyled
        >
          <HiOutlineInformationCircle size={'1em'} />
        </IconButton>
      </ToggleTip>
    );
  }
);
