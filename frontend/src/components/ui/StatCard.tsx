import React, { ReactNode } from 'react';

interface StatCardProps {
  header: string;
}

const Settings = ({ children }: { children: ReactNode }) => children;
const Body = ({ children }: { children: ReactNode }) => children;

function StatCard({
  header,
  children,
}: StatCardProps & { children?: React.ReactNode }) {
  const findChildByType = (type: any) => {
    const child = Array.isArray(children)
      ? children.find((child) => child?.type?.name === type)
      : children;
    return child?.props?.children;
  };

  const headerSettings = findChildByType('Settings');
  const bodyContent = findChildByType('Body');

  return (
    <div className="bg-background z-50 h-full w-full rounded-md border-[1px] border-background-secondary text-text shadow-sm shadow-background-secondary">
      <div className="flex items-center justify-between border-b-[1px] border-background-secondary p-2">
        <div className="text-sm font-[500]">{header}</div>
        <div>{headerSettings}</div>
      </div>
      <div className="p-2">
        <div className="">{bodyContent}</div>
      </div>
    </div>
  );
}

StatCard.Settings = Settings;
StatCard.Body = Body;

export default StatCard;
