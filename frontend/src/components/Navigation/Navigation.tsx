import { useStatsStore } from '@/store/statsStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useStickyOffset } from '@/hooks/useStickyOffset';
import { CurrencySwitch } from '@/components/Navigation/CurrencySwitch';
import { LanguageSwitch } from '@/components/Navigation/LanguageSwitch';
import { ThemeSwitch } from '@/components/Navigation/ThemeSwitch';

import { GithubRepo } from './GithubRepo';

export function Navigation() {
  const navigate = useNavigate();
  const stats = useStatsStore((state) => state.stats);
  const { t } = useTranslation();

  const { ref, offset } = useStickyOffset<HTMLDivElement>('navigation');

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
    <>
      <div>
        <div className="border-b-[1px] border-background-secondary">
          <div className="app-container flex h-2 items-center justify-between py-4 text-xs text-text-secondary">
            {navbarStats.map((s) => (
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
      <div
        ref={ref}
        className={`sticky z-50 border-b-[1px] border-background-secondary bg-background-primary`}
        style={{ top: offset }}
      >
        <div
          className={`app-container flex h-12 w-full items-center justify-between py-4`}
        >
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center text-text">
              <div className="flex size-5 items-center justify-center rounded">
                <div>
                  <div className="mb-[1px] flex">
                    <div className="mr-[1px] size-2 rounded-sm bg-background-accent/25"></div>
                    <div className="size-2 rounded-sm bg-background-accent/50"></div>
                  </div>
                  <div className="flex">
                    <div className="mr-[1px] size-2 rounded-sm bg-background-accent/75"></div>
                    <div className="size-2 rounded-sm bg-background-accent/100"></div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => navigate('/key-skills')}
                className="h-100 font-sm text-md mx-1 flex cursor-pointer items-center justify-center font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent"
              >
                KEYSKILLS
              </div>
            </div>
          </div>
          <div className="flex items-center">
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
    </>
  );
}
