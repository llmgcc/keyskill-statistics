import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiNetworkChart } from 'react-icons/bi';
import { PiApproximateEquals } from 'react-icons/pi';

import { KeySkill } from '@/interfaces';
import { useOrderByState } from '@/hooks/useOrderByState';
import { useCurrencyStore } from '@/store/currencyStore';
import { RouterTabs } from '@/components/ui/RouterTabs';
import { buttonsList, OrderButtons } from '@/components/Tabs/OrderButtons';

import { RelatedSkills } from './RelatedSkills';
import { SimilarSkills } from './SimilarSkills';

interface SkillPageTabsProps {
  skill: KeySkill | null;
}

export function SkillPageTabs({ skill }: SkillPageTabsProps) {
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);

  const orderButtonsRelated = buttonsList(
    ['popular', 'trending', 'highestSalary'],
    selectedCurrency
  );
  // const [orderButtonRelated, setOrderButtonRelated] = useState(orderButtonsRelated[0]);

  const orderButtonsSimilar = buttonsList(
    ['similar', 'popular', 'trending', 'highestSalary'],
    selectedCurrency
  );
  // const [orderButtonSimilar, setOrderButtonSimilar] = useState(orderButtonsSimilar[0]);

  const [relatedOrder, setRelatedOrder] = useOrderByState(orderButtonsRelated);
  const [similarOrder, setSimilarOrder] = useOrderByState(orderButtonsSimilar);
  // const numberOfRowsCollection = createListCollection({
  //   items: [10, 25, 50],
  // });

  // const [numberOfRows, setNumberOfRows] = useState<number>(
  //   numberOfRowsCollection.items[0]
  // );

  // const handleOrderChange = useCallback(
  //   (button : OrderButton) => setOrderButton(button),
  //   []
  // );

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
            order_by={
              relatedOrder
                ? {
                    order_by: relatedOrder.column,
                    descending: relatedOrder.descending,
                  }
                : undefined
            }
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setRelatedOrder(b)}
            buttons={orderButtonsRelated}
            currentButtonId={relatedOrder.id}
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
        append: (
          <OrderButtons
            onChange={b => setSimilarOrder(b)}
            buttons={orderButtonsSimilar}
            currentButtonId={similarOrder.id}
          />
        ),
        body: (
          <SimilarSkills
            name={skill?.name ?? null}
            order_by={
              similarOrder
                ? {
                    order_by: similarOrder.column,
                    descending: similarOrder.descending,
                  }
                : undefined
            }
          />
        ),
      },
    ],
    [
      skill?.name,
      t,
      orderButtonsSimilar,
      similarOrder,
      orderButtonsRelated,
      setSimilarOrder,
      relatedOrder,
      setRelatedOrder,
    ]
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
