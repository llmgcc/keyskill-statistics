import { placeholderData } from '@/utils/common';
import { useEffect, useState } from 'react';
import { Button, useUpdateEffect } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Category } from '@/interfaces';
import { useDebounce } from '@/hooks/useDebounce';
import { useSkills } from '@/hooks/useSkills';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { CategoryDescription } from '@/components/ui/Description/CategoryDescription';
import { SkillDescription } from '@/components/ui/Description/SkillDescription';

import { NavSearchBodyGroup } from './NavSearchBodyGroup';

interface NavSearchBodyProps {
  searchQuery: string;
  setOpen: (state: boolean) => void;
}

export function NavSearchBody({ searchQuery, setOpen }: NavSearchBodyProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(0);
  const [isMouseActive, setIsMouseActive] = useState(false);

  const {
    skills: skillsData,
    isLoading,
    isFetching,
    rows,
  } = useSkills(
    {
      pageIndex: 0,
      pageSize: 20,
    },
    {
      order_by: 'place',
      descending: false,
    },
    {
      period: null,
      skill: debouncedQuery || undefined,
      experience: null,
    }
  );

  const domains = useDomainsStore(state => state.domains).filter(
    domain =>
      domain.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      t(`domains.${domain.name}`)
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase())
  );
  const categories = useCategoriesStore(state => state.categories).filter(
    category =>
      category.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      t(`categories.${category.name}`)
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase())
  );

  function scrollToTab(name: string) {
    const dialogBody = document.getElementById('navsearch-dialog');
    const target = document.getElementById(name);
    if (dialogBody && target) {
      const targetOffset = target.offsetTop;
      dialogBody.scrollTo({ top: targetOffset - 160, behavior: 'smooth' });
    }
  }

  const tabs = [
    {
      name: 'Skills',
      onClick: () => {
        scrollToTab('Skills-tab');
      },
      title: t('common.skills'),
      data: skillsData ?? [],
      values: (skillsData ?? []).map(c => (
        <SkillDescription skill={c} key={c.name} />
      )),
    },
    {
      name: 'Domains',
      onClick: () => {
        scrollToTab('Domains-tab');
      },
      title: t('common.domains'),
      data: domains,
      values: domains.map(c => (
        <CategoryDescription categoryKey="domains" category={c} key={c.name} />
      )),
    },
    {
      name: 'Categories',
      onClick: () => {
        scrollToTab('Categories-tab');
      },
      title: t('common.categories'),
      data: categories,
      values: categories.map(c => (
        <CategoryDescription
          categoryKey="categories"
          category={c}
          key={c.name}
        />
      )),
    },
  ];

  const totalRows = (rows ?? 0) + domains.length + categories.length;

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (isLoading) return;
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        setIsMouseActive(false);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!hoveredIndex) {
          setHoveredIndex(totalRows - 1);
        } else {
          setHoveredIndex(hoveredIndex - 1);
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (hoveredIndex && hoveredIndex === totalRows - 1) {
          setHoveredIndex(0);
        } else {
          setHoveredIndex((hoveredIndex ?? -1) + 1);
        }
      }
    };
    const mouseMoveHandler = () => {
      setIsMouseActive(true);
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [hoveredIndex, totalRows, isFetching, isLoading]);

  useUpdateEffect(() => {
    setHoveredIndex(0);
  }, [searchQuery, skillsData?.length, domains.length, categories.length]);

  const emptyData = placeholderData(10);

  return (
    <div id="navsearch-dialog">
      <div className="sticky top-0 z-20 mb-3 w-full bg-background-primary shadow-sm shadow-background-secondary">
        <div className="flex gap-2 px-4 py-3 text-text-secondary">
          {tabs.map(tab => (
            <Button
              key={tab.name}
              className={`m-0 cursor-pointer bg-background-primary p-0 font-[500] hover:text-background-accent`}
              onClick={tab.onClick}
              variant={'ghost'}
              size={'sm'}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div id="Skills-tab">
          <NavSearchBodyGroup
            title={t('common.skills')}
            data={
              isLoading || isFetching || !skillsData ? emptyData : skillsData
            }
            valueRenderer={skill => <SkillDescription skill={skill} />}
            startingIndex={0}
            setHoveredIndex={setHoveredIndex}
            hoveredIndex={hoveredIndex}
            isLoading={isLoading || isFetching}
            onClick={value => {
              navigate(`/skill/${encodeURIComponent(value)}`);
              setOpen(false);
            }}
            isMouseActive={isMouseActive}
          />
        </div>

        <div id="Domains-tab">
          <NavSearchBodyGroup
            title={t('common.domains')}
            data={isLoading || isFetching ? (emptyData as Category[]) : domains}
            valueRenderer={domain => (
              <CategoryDescription categoryKey="domains" category={domain} />
            )}
            startingIndex={skillsData?.length ?? 0}
            setHoveredIndex={setHoveredIndex}
            hoveredIndex={hoveredIndex}
            isLoading={isLoading || isFetching}
            onClick={value => {
              navigate(`/domain/${value}`);
              setOpen(false);
            }}
            isMouseActive={isMouseActive}
          />
        </div>

        <div id="Categories-tab">
          <NavSearchBodyGroup
            title={t('common.categories')}
            data={
              isLoading || isFetching ? (emptyData as Category[]) : categories
            }
            valueRenderer={category => (
              <CategoryDescription
                categoryKey="categories"
                category={category}
              />
            )}
            startingIndex={(skillsData?.length ?? 0) + domains.length}
            setHoveredIndex={setHoveredIndex}
            hoveredIndex={hoveredIndex}
            isLoading={isLoading || isFetching}
            onClick={value => {
              navigate(`/category/${value}`);
              setOpen(false);
            }}
            isMouseActive={isMouseActive}
          />
        </div>
      </div>
    </div>
  );
}
