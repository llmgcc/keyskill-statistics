import { MouseEventHandler } from 'react';
import { IconButton, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { FavouriteType, useFavoritesStore } from '@/store/favoritesStore';
import { toaster } from '@/components/ui/toaster';

interface FavouriteButtonProps {
  isLoading: boolean;
  name?: string;
  displayName?: string | null;
  favouriteType: FavouriteType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function FavouriteButton({
  name,
  favouriteType,
  displayName,
  isLoading,
  size = 'xs',
}: FavouriteButtonProps) {
  const { isFavorite, add, remove } = useFavoritesStore();
  const { t } = useTranslation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (!name || isLoading) return;
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

    e.stopPropagation();
  };

  return (
    <IconButton
      variant={'ghost'}
      size={size}
      disabled={isLoading}
      spinner={<Spinner className="text-background-accent" size="xs" />}
      className="text-text-secondary transition-all duration-200 hover:bg-background-secondary"
      onClick={handleClick}
    >
      {name &&
        (!isFavorite(name, favouriteType) ? (
          <FaRegStar className={`p-0 text-background-accent`} />
        ) : (
          <FaStar className={`p-0 text-background-accent`} />
        ))}
    </IconButton>
  );
}
