import { TextField } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';

interface SkillNameFilter {
  skill: string;
  onChange: (skill: string) => void;
}

export function SkillNameFilter({ skill, onChange }: SkillNameFilter) {
  const { t } = useTranslation();
  return (
    <TextField.Root
      value={skill}
      onChange={e => onChange(e.target.value)}
      placeholder={t('categoryFilter.placeholderForSkill')}
      className="border-shadow-full h-9 bg-background-secondary/50 outline-background-secondary md:h-7"
    >
      <TextField.Slot>
        <BiSearch />
      </TextField.Slot>
    </TextField.Root>
  );
}
