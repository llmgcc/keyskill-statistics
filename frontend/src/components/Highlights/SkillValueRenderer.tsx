import { KeySkill } from '@/interfaces';
import { MdArrowRightAlt } from 'react-icons/md';

import { ValueChangeRenderer } from '@/components/table/renderers/ValueChangeRenderer';

interface SkillValueRendererProps {
  skill: KeySkill;
}

export function SkillValueRenderer({ skill }: SkillValueRendererProps) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center text-xs font-[400] text-text-primary">
        {skill.prev_count} <MdArrowRightAlt className="mx-1" size={15} />{' '}
        {skill.count}
      </div>
      <div className="text-xs">
        {!!skill.prev_count && (
          <ValueChangeRenderer
            current={skill.count}
            prev={skill.prev_count}
            percent={true}
          />
        )}
      </div>
    </div>
  );
}
