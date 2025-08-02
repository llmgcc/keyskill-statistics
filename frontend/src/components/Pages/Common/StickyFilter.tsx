import Sticky from 'react-stickynode';

import { useTopOffset } from '@/hooks/useTopOffset';
import { Filter } from '@/components/Filter/Filter';

export function StickyFilter() {
  const navOffset = useTopOffset('#navbar');
  const headerOffset = useTopOffset('#header');

  return (
    <div className="my-2">
      <Sticky
        top={navOffset + headerOffset}
        enableTransforms={false}
        innerActiveClass="border-none rounded-none shadow-md shadow-background-secondary rounded-none"
        innerClass="border-[1px] border-background-secondary rounded"
        innerZ={1000}
      >
        <div className="relative z-40 bg-background-primary">
          <Filter />
        </div>
      </Sticky>
    </div>
  );
}
