import { useEffect, useRef } from 'react';
import { Badge, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface CategoryBase {
  name: string;
}

interface CategoryBase {
  name: string;
}

interface NavSearchBodyGroupProps<T extends CategoryBase> {
  title: string;
  data: T[];
  valueRenderer: (data: T) => JSX.Element;
  setHoveredIndex: (index: number | undefined) => void;
  startingIndex: number;
  hoveredIndex: number | undefined;
  isLoading: boolean;
  onClick: (value: string) => void;
  isMouseActive: boolean;
}

export function NavSearchBodyGroup<T extends CategoryBase>({
  title,
  data,
  valueRenderer,
  setHoveredIndex,
  startingIndex,
  hoveredIndex,
  isLoading,
  onClick,
  isMouseActive,
}: NavSearchBodyGroupProps<T>) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (isLoading) return;
    const currentIndex =
      hoveredIndex !== undefined ? hoveredIndex - startingIndex : -1;
    if (
      currentIndex >= 0 &&
      currentIndex < data.length &&
      itemRefs.current[currentIndex] &&
      !isMouseActive
    ) {
      itemRefs.current[currentIndex]?.scrollIntoView({
        block: 'center',
      });
    }
  }, [hoveredIndex, data, startingIndex, isMouseActive, isLoading]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (isLoading) return;
      if (
        event.key === 'Enter' &&
        hoveredIndex !== undefined &&
        hoveredIndex >= 0
      ) {
        event.preventDefault();
        const localIndex = hoveredIndex - startingIndex;
        if (localIndex >= 0 && localIndex < data.length) {
          onClick(data[localIndex].name);
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [hoveredIndex, startingIndex, data, onClick, isLoading]);

  return (
    <div className="mt-2">
      <div className="flex items-center pb-2 text-text-secondary">
        <div>{title}</div>
        <div className="mx-1">
          <Badge variant="outline">{data?.length}</Badge>
        </div>
      </div>
      {data.length ? (
        <div className="px-1">
          {data?.map((skill, index) => (
            <div
              key={skill.name}
              onMouseEnter={() =>
                !(hoveredIndex === index + startingIndex) &&
                isMouseActive &&
                setHoveredIndex(index + startingIndex)
              }
              onMouseLeave={() =>
                hoveredIndex === index + startingIndex &&
                isMouseActive &&
                setHoveredIndex(undefined)
              }
              className={`cursor-pointer p-1 ${hoveredIndex === index + startingIndex && !isLoading ? 'rounded-md bg-background-secondary' : ''}`}
              ref={el => (itemRefs.current[index] = el)}
              onClick={() => !isLoading && onClick(skill.name)}
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
      ) : (
        <div className="flex h-10 w-full items-center justify-center p-10 text-sm text-text-secondary">
          {t('common.noData')}
        </div>
      )}
    </div>
  );
}
