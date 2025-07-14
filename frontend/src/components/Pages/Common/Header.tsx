import { skillName } from '@/utils/common';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Sticky from 'react-stickynode';

import { KeySkill } from '@/interfaces';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useTopOffset } from '@/hooks/useTopOffset';
import { useFavoritesStore } from '@/store/favoritesStore';
import { toaster } from '@/components/ui/toaster';
import { SkillDescription } from '@/components/SkillDescription/SkillDescription';

interface HeaderProps {
  skill?: KeySkill;
  isLoading: boolean;
}

export function Header({ skill, isLoading }: HeaderProps) {
  const navOffset = useTopOffset('#navbar');

  const { t, i18n } = useTranslation();
  const { isFavorite, addSkill, removeSkill } = useFavoritesStore();

  const { isMobile } = useScreenSize();

  function onFavouriteClick() {
    if (isFavorite(skill?.name || '')) {
      removeSkill(skill?.name || '');

      toaster.create({
        description: (
          <div className="text-base">
            <strong>{skillName(skill ?? null, i18n.language)}</strong>{' '}
            {t('favorites.removed')}
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
      addSkill(skill?.name || '');
      toaster.create({
        description: (
          <div className="text-base">
            <strong>
              {i18n.language == 'ru'
                ? skill?.name
                : (skill?.translation ?? skill?.name)}
            </strong>{' '}
            {t('favorites.added')}
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

  return (
    <Sticky
      innerZ={1000}
      top={navOffset}
      enableTransforms={false}
      innerActiveClass="shadow-md shadow-background-secondary "
    >
      <div id="header" className="z-1 bg-background-primary">
        <div className="z-50 flex items-center justify-between rounded border-[0px] border-background-secondary p-2 py-4 shadow-background-secondary">
          <div>
            <SkillDescription
              skill={skill}
              size={isMobile ? 'md' : 'lg'}
              isLoading={isLoading}
            />
          </div>
          <div className="flex flex-col items-end justify-end gap-1 text-sm">
            <div>
              <IconButton
                variant={'outline'}
                size="xs"
                loading={isLoading}
                className="border-background-secondary text-text-secondary hover:bg-background-secondary"
                onClick={onFavouriteClick}
              >
                {!isFavorite(skill?.name || '') ? (
                  <FaRegStar className={`p-0 text-background-accent`} />
                ) : (
                  <FaStar className={`p-0 text-background-accent`} />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Sticky>
  );
}
