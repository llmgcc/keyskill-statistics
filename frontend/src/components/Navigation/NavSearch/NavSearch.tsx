import { useState } from 'react';
import { Dialog, Portal, useDisclosure } from '@chakra-ui/react';

import { NavSearchBody } from './NavSearchBody';
import { NavSearchHeader } from './NavSearchHeader';
import { NavSearchTrigger } from './NavSearchTrigger';

export function NavSearch() {
  const { open, onOpen, setOpen } = useDisclosure();

  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <Dialog.Root
      scrollBehavior="inside"
      open={open}
      closeOnEscape={true}
      onOpenChange={isOpen => {
        setOpen(isOpen.open);
      }}
      size={'xl'}
      placement={'center'}
    >
      <Dialog.Trigger asChild>
        <NavSearchTrigger onOpen={onOpen} />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="bg-black/30 backdrop-blur-sm" />
        <Dialog.Positioner>
          <Dialog.Content className="flex gap-2 bg-transparent shadow-none">
            <Dialog.Header className="rounded bg-background-primary p-0">
              <NavSearchHeader
                filter={searchQuery}
                onFilter={setSearchQuery}
                onClose={() => setOpen(false)}
              />
            </Dialog.Header>
            <Dialog.Body
              className="rounded bg-background-primary p-0"
              id="navsearch-dialog"
            >
              <NavSearchBody searchQuery={searchQuery} setOpen={setOpen} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
