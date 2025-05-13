import { createContext, useContext, useMemo, useState } from 'react';

import { SkillsFilterState } from '@/components/SkillFilter/SkillFilter';

const SkillFilterContext = createContext<{
  filterState: SkillsFilterState;
  setFilterState: (state: SkillsFilterState) => void;
}>(null!);

export const SkillFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterState, setFilterState] = useState<SkillsFilterState>({
    category: { selected: null, strict: true },
    domain: { selected: null, strict: true },
    skill: '',
  });

  const value = useMemo(() => ({ filterState, setFilterState }), [filterState]);

  return (
    <SkillFilterContext.Provider value={value}>
      {children}
    </SkillFilterContext.Provider>
  );
};

export const useSkillFilter = () => useContext(SkillFilterContext);
