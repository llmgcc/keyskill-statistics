import { memo } from 'react';
import { Input, InputGroup, Kbd } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleSharp, IoSearch } from 'react-icons/io5';

interface NavSearchHeaderProps {
  filter: string;
  onFilter: (filter: string) => void;
  onClose: () => void;
}

function NavSearchHeader_({ filter, onFilter, onClose }: NavSearchHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-md border-2 border-background-secondary bg-background-primary !opacity-100">
      <div className="flex items-center gap-2 px-2 py-1 text-text-secondary">
        <div>
          <IoSearch />
        </div>
        <div className="w-full">
          <InputGroup
            endElement={
              <IoCloseCircleSharp
                onClick={onClose}
                size={20}
                className="m-0 flex cursor-pointer items-center justify-center p-0 text-text-secondary hover:text-text-secondary/50"
              />
            }
          >
            <Input
              placeholder={t('common.search')}
              variant="flushed"
              value={filter}
              onChange={e => onFilter(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <div className="py- flex items-center gap-2 bg-background-gray/50 px-2 text-text-secondary">
        <div className="flex w-full justify-between py-2">
          <div className="flex items-center gap-1">
            <div>{t('common.navigate')}</div>
            <div>
              <Kbd className="flex aspect-square items-center justify-center">
                &#8593;
              </Kbd>
            </div>
            <div>
              <Kbd className="flex aspect-square items-center justify-center">
                &#8595;
              </Kbd>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div>{t('common.close')}</div>
            <div>
              <Kbd>esc</Kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const NavSearchHeader = memo(NavSearchHeader_);
