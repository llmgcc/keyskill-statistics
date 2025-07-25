import { useTranslation } from 'react-i18next';
import { PiCodeSimpleLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { useStatsStore } from '@/store/statsStore';
import { CurrencySwitch } from '@/components/Navigation/CurrencySwitch';
import { LanguageSwitch } from '@/components/Navigation/LanguageSwitch';
import { ThemeSwitch } from '@/components/Navigation/ThemeSwitch';

import { GithubRepo } from './GithubRepo';
import { NavigationSearch } from './NavigationSearch';

export function Navigation() {
  const navigate = useNavigate();
  const stats = useStatsStore(state => state.stats);
  const { t } = useTranslation();

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

  return (
    <div>
      <div>
        <div className="border-b-[1px] border-background-secondary">
          <div className="app-container flex h-2 items-center justify-between py-4 text-xs text-text-secondary">
            {navbarStats.map(s => (
              <div key={s.title}>
                <div className="text-xs sm:block md:flex">
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

      <Sticky top={0} enableTransforms={false} innerZ={1000}>
        <div
          className={`z-50 border-b-[1px] border-background-secondary bg-background-primary`}
          id="navbar"
        >
          <div
            className={`app-container flex h-12 w-full items-center justify-between bg-background-primary py-4`}
          >
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center text-text">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-background-secondary/50 p-1 text-[#5e6c77] text-background-accent">
                  <PiCodeSimpleLight size={20} />
                  {/* <div>
                    <div className="mb-[1px] flex">
                      <div className="mr-[1px] size-2 rounded-sm bg-background-accent/25"></div>
                      <div className="size-2 rounded-sm bg-background-accent/50"></div>
                    </div>
                    <div className="flex">
                      <div className="mr-[1px] size-2 rounded-sm bg-background-accent/75"></div>
                      <div className="size-2 rounded-sm bg-background-accent/100"></div>
                    </div>
                  </div> */}
                </div>
                <div
                  onClick={() => navigate('/')}
                  className="h-100 font-sm text-md mx-1 flex cursor-pointer items-center justify-center font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent"
                >
                  KS|DATA
                </div>
              </div>

              <div className="hidden gap-6 text-sm font-[600] text-text-primary lg:flex">
                <div className="cursor-pointer hover:text-background-accent">
                  Skills
                </div>
                <div className="cursor-pointer hover:text-background-accent">
                  Domains
                </div>
                <div className="cursor-pointer hover:text-background-accent">
                  Categories
                </div>
                <div className="cursor-pointer hover:text-background-accent">
                  Highlights
                </div>
                <div className="cursor-pointer hover:text-background-accent">
                  Favourites
                </div>
              </div>
            </div>
            <div></div>
            <div className="flex items-center">
              <div className="mx-2 hidden items-center lg:flex">
                <NavigationSearch />
              </div>
              <div className="mx-2 flex items-center">
                <ThemeSwitch />
              </div>
              <div className="mx-2 flex items-center">
                <CurrencySwitch />
              </div>
              <div className="mx-2 flex items-center">
                <LanguageSwitch />
              </div>
              <div className="ml-2 flex items-center">
                <GithubRepo />
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    </div>
  );
}
