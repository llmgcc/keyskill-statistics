import { skillName } from '@/utils/common';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { SkillDescription } from '@/components/ui/Description/SkillDescription';

import { Header } from '../Common/Header';

interface SkillHeaderProps {
  skill?: KeySkill;
  isLoading: boolean;
}

export function SkillHeader({ skill, isLoading }: SkillHeaderProps) {
  const { i18n } = useTranslation();

  const displayName = skillName(skill ?? null, i18n.language);
  return (
    <Header
      description={(isFixed: boolean) => (
        <SkillDescription
          skill={skill}
          size={isFixed ? 'md' : 'lg'}
          isLoading={isLoading}
        />
      )}
      isLoading={isLoading}
      favouriteType={'skills'}
      name={skill?.name ?? null}
      displayName={skill?.name ? displayName : null}
    />
  );
}
