import { useState } from 'react';

type TabsProps = {
  tabs: {
    title: JSX.Element;
    body?: () => void;
    name: string;
  }[];
};

function Tabs({ tabs }: TabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div>
      <div className="flex text-sm">
        {tabs.map((t, index) => (
          <div onClick={() => setActiveTabIndex(index)} key={index}>
            <div
              className={`cursor-pointer p-2 font-bold ${activeTabIndex == index ? 'text-text-primary' : 'text-text-secondary'} hover:text-text-primary`}
            >
              {t.title}
            </div>
            <div
              className={`h-[2px] rounded ${activeTabIndex == index ? 'bg-text-primary' : ''}`}
            ></div>
          </div>
        ))}
      </div>
      <div className="py-2 text-text">{tabs[activeTabIndex]?.body?.()}</div>
    </div>
  );
}

export default Tabs;
