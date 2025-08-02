import { useState } from 'react';
import { IconButton, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Sticky from 'react-stickynode';

import { useTopOffset } from '@/hooks/useTopOffset';
import { FavouriteType, useFavoritesStore } from '@/store/favoritesStore';
import { toaster } from '@/components/ui/toaster';

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

  const { t } = useTranslation();
  const { isFavorite, add, remove } = useFavoritesStore();

  function onFavouriteClick() {
    if (!name) return;
    if (isFavorite(name, favouriteType)) {
      remove(name, favouriteType);

      toaster.create({
        description: (
          <div className="text-base">
            <strong>{displayName}</strong> {t('favorites.removed')}
          </div>
        ),
        title: (
          <div className="flex items-center gap-2 pb-1 text-base">
            <FaRegStar className={`p-0 text-background-accent`} />
            <div>{t('favorites.favorites')}</div>
          </div>
        ),
        type: 'info',
      });
    } else {
      add(name, favouriteType);
      toaster.create({
        description: (
          <div className="text-base">
            <strong>{displayName}</strong> {t('favorites.added')}
          </div>
        ),
        type: 'info',
        title: (
          <div className="flex items-center gap-2 pb-1 text-base">
            <FaStar className={`p-0 text-background-accent`} />
            <div>{t('favorites.favorites')}</div>
          </div>
        ),
      });
    }
  }

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
              <IconButton
                variant={'outline'}
                size={isFixed ? '2xs' : 'xs'}
                loading={isLoading}
                spinner={
                  <Spinner className="text-background-accent" size="xs" />
                }
                className="border-background-secondary text-text-secondary transition-all duration-200 hover:bg-background-secondary"
                onClick={onFavouriteClick}
              >
                {name &&
                  (!isFavorite(name, favouriteType) ? (
                    <FaRegStar className={`p-0 text-background-accent`} />
                  ) : (
                    <FaStar className={`p-0 text-background-accent`} />
                  ))}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Sticky>
  );
}
