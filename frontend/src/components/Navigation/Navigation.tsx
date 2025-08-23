import { useRef, useState } from 'react';
import { Badge } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { useScreenSize } from '@/hooks/useScreenSize';
import { useTopOffset } from '@/hooks/useTopOffset';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useStatsStore } from '@/store/statsStore';
import { CurrencySwitch } from '@/components/Navigation/CurrencySwitch';
import { LanguageSwitch } from '@/components/Navigation/LanguageSwitch';
import { ThemeSwitch } from '@/components/Navigation/ThemeSwitch';

import { GithubRepo } from './GithubRepo';
import { Logo } from './Logo';
import { NavigationMobile } from './NavigationMobile';
import { NavSearch } from './NavSearch/NavSearch';

export function Navigation() {
  const stats = useStatsStore(state => state.stats);
  const { t } = useTranslation();

  const { isTablet, isMobile } = useScreenSize();
  const favorites = useFavoritesStore(state => state.favorites);
  const navbarStats = [
    {
      title: t('navigation.uniqueSkills'),
      count: stats?.unique_skills ?? null,
    },
    {
      title: t('navigation.lastUpdate'),
      count: stats?.last_update ?? null,
    },
  ];

  const links = [
    {
      id: 'highlights',
      href: '/highlights',
    },
    {
      id: 'skills',
      href: '/skills',
    },
    {
      id: 'domains',
      href: '/domains',
    },
    {
      id: 'categories',
      href: '/categories',
    },
    {
      id: 'favorites',
      href: '/favorites',
      title: (title: string) => (
        <div className="flex items-center gap-1">
          <div>{title}</div>
          <div>
            <Badge size={'sm'} className="bg-background-secondary">
              {favorites.length}
            </Badge>
          </div>
        </div>
      ),
    },
  ];

  const offset = useTopOffset('#navbar');
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div id="">
        <div className="border-b-[1px] border-background-secondary">
          <div className="app-container flex items-center justify-between py-2 text-xs text-text-secondary">
            {navbarStats.map(s => (
              <div key={s.title}>
                <div className="flex flex-col justify-between text-xs md:flex-row">
                  <div>{s.title}:</div>
                  <div className="font-[600] text-background-accent sm:ml-0 md:ml-1">
                    {s.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Sticky top={0} enableTransforms={false} innerZ={1001}>
        <div className="relative">
          <div
            className={`z-50 border-b-[1px] border-background-secondary bg-background-primary`}
            id="navbar"
          >
            <div
              className={`app-container flex h-12 w-full items-center justify-between bg-background-primary py-4`}
            >
              <div className="flex items-center justify-center gap-6 text-sm">
                <Logo />
                <div className="hidden gap-6 text-sm font-[600] text-text-primary lg:flex">
                  {links.map(link => (
                    <Link
                      className="cursor-pointer hover:text-background-accent hover:underline"
                      key={link.id}
                      to={link.href}
                    >
                      {link.title
                        ? link.title(t(`common.${link.id}`))
                        : t(`common.${link.id}`)}
                    </Link>
                  ))}
                </div>
              </div>
              <div></div>
              <div className="flex items-center">
                <div className="items-center lg:flex">
                  <NavSearch />
                </div>
                <div className="flex items-center">
                  <ThemeSwitch />
                </div>
                <div className="flex items-center">
                  <CurrencySwitch />
                </div>
                <div className="flex items-center">
                  <LanguageSwitch />
                </div>
                <div className="flex items-center">
                  <GithubRepo />
                </div>
                {(isTablet || isMobile) && (
                  <NavigationMobile
                    links={links}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    ref={portalRef}
                  />
                )}
              </div>
            </div>
          </div>

          {
            <div
              id="drawer-container"
              className="absolute w-full"
              style={
                isOpen
                  ? { top: '100%', height: `calc(100vh - ${offset}px)` }
                  : {}
              }
              ref={portalRef}
            ></div>
          }
        </div>
      </Sticky>
    </div>
  );
}
