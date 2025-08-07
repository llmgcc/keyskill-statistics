import { useState } from 'react';
import Sticky from 'react-stickynode';

import { useTopOffset } from '@/hooks/useTopOffset';
import { FavouriteType } from '@/store/favoritesStore';
import { FavouriteButton } from '@/components/ui/FavouriteButton';

interface HeaderProps {
  description: (isFixed: boolean) => JSX.Element;
  isLoading: boolean;
  favouriteType: FavouriteType;
  name: string | null;
  displayName: string | null;
}

export function Header({
  description,
  isLoading,
  favouriteType,
  name,
  displayName,
}: HeaderProps) {
  const navOffset = useTopOffset('#navbar');
  const [isFixed, setFixed] = useState(false);

  const handleStateChange = (status: Sticky.Status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      if (!isFixed) {
        setFixed(true);
      }
    } else {
      if (isFixed) {
        setFixed(false);
      }
    }
  };

  return (
    <Sticky
      innerZ={1000}
      top={navOffset}
      enableTransforms={false}
      innerActiveClass="shadow-md shadow-background-secondary"
      onStateChange={handleStateChange}
    >
      <div id="header" className={'z-1 bg-background-primary'}>
        <div className="z-50 flex flex-col rounded border-[0px] border-background-secondary p-2 py-4 shadow-background-secondary md:flex-row md:items-center md:justify-between">
          <div className="md:max-w-[80%]">{description(isFixed)}</div>
          <div className="flex flex-col items-end justify-end gap-1 text-sm">
            <div>
              {name && (
                <FavouriteButton
                  isLoading={isLoading}
                  name={name}
                  displayName={displayName}
                  favouriteType={favouriteType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Sticky>
  );
}
