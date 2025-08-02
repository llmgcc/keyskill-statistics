import { forwardRef, RefObject } from 'react';
import { Button, Drawer, Portal, Separator } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import { useScreenSize } from '@/hooks/useScreenSize';

interface NavigationMobileProps {
  links: {
    id: string;
    href: string;
  }[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const NavigationMobile = forwardRef<
  HTMLDivElement,
  NavigationMobileProps
>(({ links, isOpen, setIsOpen }, ref) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenSize();
  return (
    <div className="flex items-center">
      <Separator
        height={'35px'}
        size={'md'}
        orientation={'vertical'}
        className="border-background-secondary bg-background-secondary"
      />

      <Drawer.Root
        placement={'end'}
        modal={false}
        closeOnInteractOutside={true}
        open={isOpen}
        onOpenChange={e => setIsOpen(e.open)}
      >
        <Drawer.Trigger asChild>
          <Button
            variant="ghost"
            className="flex aspect-square size-fit items-center !bg-transparent !p-0"
            size={isMobile ? 'xs' : 'md'}
          >
            {!isOpen ? (
              <FaBars className="cursor-pointer !text-2xl font-[900] text-text transition-colors duration-150 hover:text-background-accent" />
            ) : (
              <GrClose className="cursor-pointer !text-2xl font-[900] text-text transition-colors duration-150 hover:text-background-accent" />
            )}
          </Button>
        </Drawer.Trigger>
        <Portal container={ref as RefObject<HTMLElement | null>}>
          <Drawer.Backdrop
            pos="absolute"
            boxSize="full"
            className="bg-black/30 backdrop-blur-sm"
          />
          <Drawer.Positioner pos="absolute" boxSize="full">
            <Drawer.Content
              height={'100%'}
              className="w-fit min-w-36 bg-background-primary"
            >
              <Drawer.Context>
                {_ => (
                  <Drawer.Body pt="6" spaceY="3">
                    <div className="flex flex-col gap-2 text-base">
                      {links.map(link => (
                        <Link
                          className="cursor-pointer hover:text-background-accent hover:underline"
                          key={link.id}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {t(`common.${link.id}`)}
                        </Link>
                      ))}
                    </div>
                  </Drawer.Body>
                )}
              </Drawer.Context>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
});
