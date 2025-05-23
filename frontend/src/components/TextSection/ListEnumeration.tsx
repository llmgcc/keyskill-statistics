import { Category } from '@/interfaces';
import { useTranslation } from 'react-i18next';

interface ListEnumerationProps {
  list: Category[];
  maxToDisplay?: number;
  translationKey: string;
}

export function ListEnumeration({
  list,
  maxToDisplay = 3,
  translationKey,
}: ListEnumerationProps) {
  const { t } = useTranslation();
  if (!list?.length) return '';
  const displayList = list.slice(0, maxToDisplay);
  const renderItem = (item: Category) => {
    return (
      <span className="text-text">{t(`${translationKey}.${item.name}`)}</span>
    );
  };
  if (displayList.length === 1) {
    return renderItem(displayList[0]);
  }
  if (displayList.length === 2) {
    return (
      <>
        {renderItem(displayList[0])} {t('common.and')}{' '}
        {renderItem(displayList[1])}
      </>
    );
  }
  return (
    <>
      {displayList
        .slice(0, -1)
        .map((item) => renderItem(item))
        .reduce((result, item) => (
          <>
            {result}, {item}
          </>
        ))}{' '}
      {t('common.and')} {renderItem(displayList[displayList.length - 1])}
    </>
  );
}
