import { useEffect, useRef, useState } from 'react';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import {
  Badge,
  Button,
  Dialog,
  Input,
  InputGroup,
  Kbd,
  Portal,
  Skeleton,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleSharp, IoSearch } from 'react-icons/io5';

import { useDebounce } from '@/hooks/useDebounce';
import { useSkills } from '@/hooks/useSkills';

import { SkillDescription } from '../SkillDescription/SkillDescription';
import { CategoryDescription } from '../ui/CategoryDescription';

interface NavigationSearchRowProps<T extends { name: string }> {
  title: string;
  data: T[];
  valueRenderer: (data: T) => JSX.Element;
  setHoveredIndex: (index: number | undefined) => void;
  startingIndex: number;
  hoveredIndex: number | undefined;
  isLoading: boolean;
}

function NavigationSearchRow<T extends { name: string }>({
  title,
  data,
  valueRenderer,
  setHoveredIndex,
  startingIndex,
  hoveredIndex,
  isLoading,
}: NavigationSearchRowProps<T>) {
  if (!data.length) {
    return null;
  }

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentIndex =
      hoveredIndex !== undefined ? hoveredIndex - startingIndex : -1;
    if (
      currentIndex >= 0 &&
      currentIndex < data.length &&
      itemRefs.current[currentIndex]
    ) {
      itemRefs.current[currentIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [hoveredIndex]);

  if (!data.length) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="flex items-center pb-2 text-text-secondary">
        <div>{title}</div>
        <div className="mx-1">
          <Badge variant="outline">{data?.length}</Badge>
        </div>
      </div>
      <div className="px-1">
        {data?.map((skill, index) => (
          <div
            key={skill.name}
            onMouseEnter={() =>
              !(hoveredIndex === index + startingIndex) &&
              setHoveredIndex(index + startingIndex)
            }
            onMouseLeave={() =>
              hoveredIndex === index + startingIndex &&
              setHoveredIndex(undefined)
            }
            className={`cursor-pointer p-1 ${hoveredIndex === index + startingIndex ? 'rounded-md bg-background-secondary' : ''}`}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <Skeleton
              className={isLoading ? 'bg-background-secondary' : ''}
              loading={isLoading}
            >
              {valueRenderer(skill)}
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NavigationSearch() {
  const { open, onOpen, setOpen } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(0);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [selectedTab, setSelectedTab] = useState<
    'Categories' | 'Domains' | 'All'
  >('All');

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === '/') {
      event.preventDefault();
      onOpen();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const {
    data: skillsData,
    isLoading,
    isFetching,
  } = useSkills({
    limit: 20,
    offset: 0,
    period: 30,
    skillName: debouncedQuery || undefined,
    orderBy: {
      column: 'count',
      asc: true,
    },
  });

  const domains = useDomainsStore((state) => state.domains).filter(
    (domain) =>
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`domains.${domain.name}`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );
  const categories = useCategoriesStore((state) => state.categories).filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`categories.${category.name}`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const totalRows =
    selectedTab === 'All'
      ? (skillsData?.skills?.length ?? 0) + domains.length + categories.length
      : selectedTab === 'Categories'
        ? categories.length
        : domains.length;

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
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

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [open, hoveredIndex, totalRows]);

  useUpdateEffect(() => {
    setHoveredIndex(0);
  }, [
    searchQuery,
    skillsData?.skills?.length,
    domains.length,
    categories.length,
    selectedTab,
  ]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (
        event.key === 'Enter' &&
        hoveredIndex !== undefined &&
        hoveredIndex >= 0
      ) {
        event.preventDefault();
        console.log(hoveredIndex);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  const tabs = [
    {
      name: 'All',
      onClick: () => setSelectedTab('All'),
      title: t('common.all')
    },
    {
      name: 'Domains',
      onClick: () => setSelectedTab('Domains'),
      title: t('common.domains')
    },
    {
      name: 'Categories',
      onClick: () => setSelectedTab('Categories'),
      title: t('common.categories')
    },
  ];

  return (
    <div>
      <Button
        onClick={onOpen}
        className="flex size-full h-8 w-56 cursor-pointer items-center justify-between rounded bg-background-secondary px-2 py-1 text-sm text-text-secondary hover:bg-background-gray"
      >
        <div className="flex">
          <div className="mr-2">
            <IoSearch />
          </div>
          <div>{t('common.search')}</div>
        </div>
        <div className="flex aspect-square w-5 items-center justify-center rounded bg-background-primary text-xs text-text">
          <Kbd>/</Kbd>
        </div>
      </Button>

      <div>
        <Dialog.Root
          scrollBehavior="inside"
          open={open}
          closeOnEscape={true}
          onOpenChange={(isOpen) => {
            setOpen(isOpen.open);
          }}
          size={'xl'}
          placement={'bottom'}
        >
          <Portal>
            <Dialog.Backdrop className="bg-black/30 backdrop-blur-sm" />
            <Dialog.Positioner>
              <Dialog.Content className="!m-0 h-full rounded-md border-2 border-none border-background-secondary !bg-transparent !p-0 text-sm shadow-none">
                <Dialog.Body className="h-full overflow-hidden !bg-transparent !opacity-100">
                  <div className="rounded-md border-2 border-background-secondary bg-background-primary !opacity-100">
                    <div className="flex items-center gap-2 px-2 py-1 text-text-secondary">
                      <div>
                        <IoSearch />
                      </div>
                      <div className="w-full">
                        <InputGroup
                          endElement={
                            <IoCloseCircleSharp
                              onClick={() => setOpen(false)}
                              size={20}
                              className="m-0 flex cursor-pointer items-center justify-center p-0 text-text-secondary hover:text-text-secondary/50"
                            />
                          }
                        >
                          <Input
                            placeholder={t('common.search')}
                            variant="flushed"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                  <div className="h-4"></div>

                  <div className="h-[80%] rounded-md bg-background-primary !opacity-100">
                    <div className="">
                      <div className="flex gap-2 px-4 py-3 text-text-secondary">
                        {tabs.map((tab) => (
                          <div
                            key={tab.name}
                            role="button"
                            className={`font-[500] hover:text-text-primary ${selectedTab === tab.name ? 'text-text-primary' : 'text-text-secondary'}`}
                            onClick={tab.onClick}
                          >
                            {tab.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="max-h-full overflow-auto rounded-md bg-background-primary px-4">
                      {selectedTab === 'All' && (
                        <NavigationSearchRow
                          title={t('common.skills')}
                          data={skillsData?.skills ?? []}
                          valueRenderer={(skill) => (
                            <SkillDescription {...skill} />
                          )}
                          startingIndex={0}
                          setHoveredIndex={setHoveredIndex}
                          hoveredIndex={hoveredIndex}
                          isLoading={isLoading || isFetching}
                        />
                      )}
                      {(selectedTab === 'All' || selectedTab === 'Domains') && (
                        <NavigationSearchRow
                          title={t('common.domains')}
                          data={domains ?? []}
                          valueRenderer={(domain) => (
                            <CategoryDescription
                              categoryKey="domain"
                              categoryName={domain.name}
                            />
                          )}
                          startingIndex={
                            selectedTab === 'Domains'
                              ? 0
                              : (skillsData?.skills?.length ?? 0)
                          }
                          setHoveredIndex={setHoveredIndex}
                          hoveredIndex={hoveredIndex}
                          isLoading={!domains.length}
                        />
                      )}
                      {(selectedTab === 'All' ||
                        selectedTab === 'Categories') && (
                        <NavigationSearchRow
                          title={t('common.categories')}
                          data={categories ?? []}
                          valueRenderer={(category) => (
                            <CategoryDescription
                              categoryKey="category"
                              categoryName={category.name}
                            />
                          )}
                          startingIndex={
                            selectedTab === 'Categories'
                              ? 0
                              : (skillsData?.skills?.length ?? 0) +
                                domains.length
                          }
                          setHoveredIndex={setHoveredIndex}
                          hoveredIndex={hoveredIndex}
                          isLoading={!categories.length}
                        />
                      )}
                    </div>
                  </div>
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
