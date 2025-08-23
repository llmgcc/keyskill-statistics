import { MouseEventHandler } from 'react';
import { IconButton, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { favoriteType, useFavoritesStore } from '@/store/favoritesStore';
import { toaster } from '@/components/ui/toaster';

interface favoriteButtonProps {
  isLoading: boolean;
  name?: string;
  displayName?: string | null;
  favoriteType: favoriteType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function FavoriteButton({
  name,
  favoriteType,
  displayName,
  isLoading,
  size = 'xs',
}: favoriteButtonProps) {
  const { isFavorite, add, remove } = useFavoritesStore();
  const { t } = useTranslation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (!name || isLoading) return;
    if (isFavorite(name, favoriteType)) {
      remove(name, favoriteType);

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
      add(name, favoriteType);
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
    <div>
      <IconButton
        variant={'ghost'}
        size={size}
        disabled={isLoading}
        spinner={<Spinner className="text-background-accent" size="xs" />}
        className="m-0 p-0 text-text-secondary transition-all duration-200 hover:bg-background-secondary"
        onClick={handleClick}
      >
        {name &&
          (!isFavorite(name, favoriteType) ? (
            <FaRegStar className={`p-0 text-background-accent`} />
          ) : (
            <FaStar className={`p-0 text-background-accent`} />
          ))}
      </IconButton>
    </div>
  );
}
