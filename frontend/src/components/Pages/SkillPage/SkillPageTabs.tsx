import { useMemo, useState } from 'react';
import {
  Button,
  createListCollection,
  Separator,
  Tabs,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BiNetworkChart } from 'react-icons/bi';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdEqualizer } from 'react-icons/md';
import { PiApproximateEquals } from 'react-icons/pi';

import { KeySkill } from '@/interfaces';
import { CurrencyIcons } from '@/config/currencies';
import { useCurrencyStore } from '@/store/currencyStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/AppSelect';
import { RouterTabs } from '@/components/ui/RouterTabs';

import { RelatedSkills } from './RelatedSkills';
import { SimilarSkills } from './SimilarSkills';

interface SkillPageTabsProps {
  skill: KeySkill | null;
}

export function SkillPageTabs({ skill }: SkillPageTabsProps) {
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);

  const [orderButtonIndex, setOrderButtonIndex] = useState<number>(0);

  const numberOfRowsCollection = createListCollection({
    items: [10, 25, 50],
  });

  const [numberOfRows, setNumberOfRows] = useState<number>(
    numberOfRowsCollection.items[0]
  );

  const buttons = useMemo(
    () => [
      {
        icon: <MdEqualizer />,
        id: 'popular',
        column: 'place',
        descending: false,
      },
      {
        icon: <FaArrowTrendUp />,
        id: 'trending',
        column: 'change',
        descending: true,
      },
      {
        icon: CurrencyIcons[selectedCurrency!.currency_code],
        id: 'highestSalary',
        column: 'average_salary',
        descending: true,
      },
    ],
    [selectedCurrency]
  );

  const tabs = useMemo(
    () => [
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <BiNetworkChart />
            </div>
            <div>{t(`skillPage.relatedSkills.title`)}</div>
          </div>
        ),
        name: 'relatedSkills',
        body: (
          <RelatedSkills
            name={skill?.name ?? null}
            order_by={{
              order_by: buttons[orderButtonIndex].column,
              descending: buttons[orderButtonIndex].descending,
            }}
          />
        ),
      },
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <PiApproximateEquals />
            </div>
            <div>{t(`skillPage.similarSkills.title`)}</div>
          </div>
        ),
        name: 'similarSkills',
        body: (
          <SimilarSkills
            name={skill?.name ?? null}
            order_by={{
              order_by: buttons[orderButtonIndex].column,
              descending: buttons[orderButtonIndex].descending,
            }}
          />
        ),
      },
    ],
    [buttons, orderButtonIndex, skill?.name, t]
  );

  return (
    <div className="w-full rounded border-background-secondary">
      <RouterTabs tabs={tabs} />
      {/* <Tabs.Root
        defaultValue={tabs[0].id}
        variant="enclosed"
        className="mt-2 border-none bg-background-primary"
        size="sm"
      >
        <div className="items-center justify-between">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-scroll">
              <Tabs.List className="flex gap-2 border-background-secondary bg-background-primary shadow-background-secondary">
                {tabs.map(tab => (
                  <Tabs.Trigger
                    value={tab.id}
                    key={tab.id}
                    className="border-none border-background-secondary bg-background-primary p-2 shadow-background-secondary"
                    _selected={{
                      bg: 'rgba(var(--color-background-secondary))',
                    }}
                  >
                    <div className="flex items-center gap-1 text-text-primary text-nowrap">
                      <div>{tab.icon}</div>
                      <div>{t(`skillPage.${tab.id}.title`)}</div>
                    </div>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <div className=" ">
                <Separator
                  orientation={'vertical'}
                  size="md"
                  className="mx-1"
                  height="6"
                />
              </div>

              <div className="flex items-center gap-1">
                {buttons.map((b, i) => (
                  <Button
                    onClick={() => setOrderButtonIndex(i)}
                    key={b.id}
                    size="xs"
                    variant={'outline'}
                    className={`${orderButtonIndex === i ? 'border-background-accent text-background-accent' : 'border-background-secondary text-text-secondary'} flex items-center gap-1 rounded-md border-[1px] hover:bg-background-secondary`}
                  >
                    <div>{b.icon}</div>
                    {t(`common.${b.id}`)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-full flex items-center">
              <div className="">
                <div>
                  <div className="">
                    <Select
                      collection={numberOfRowsCollection}
                      size="xs"
                      value={[String(numberOfRows)]}
                      onValueChange={details =>
                        setNumberOfRows(Number(details.value[0]))
                      }
                      className="min-w-max flex"
                    >
                      <SelectTrigger
                        style={{ width: 'fit-content', minWidth: 'auto' }}
                        minWidth={'max-content'}
                      >
                        <div>
                          {t('pagination.show')} {numberOfRows}
                        </div>
                      </SelectTrigger>

                      <SelectContent>
                        {numberOfRowsCollection.items.map(e => (
                          <SelectItem key={e} item={String(e)}>
                            <div className="flex">
                              <div className="mr-1 text-text-primary">{e}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        {tabs.map(tab => (
          <Tabs.Content
            value={tab.id}
            key={tab.id}
            className="mt-1 px-1 py-0 text-base"
          >
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root> */}
    </div>
  );
}
