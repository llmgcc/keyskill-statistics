import { useTranslation } from 'react-i18next';
import { HiLanguage } from 'react-icons/hi2';

import { Language, LanguageTitle } from '@/config/languages';
import { NavigationSelect } from '@/components/Navigation/NavigationSelect';

export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const languages = Object.keys(Language);

  const options = languages.map(language => ({
    code: language,
    name: LanguageTitle[language as Language],
  }));

  return (
    <NavigationSelect
      title={t('navigation.tooltips.language')}
      icon={
        <HiLanguage className="cursor-pointer !text-2xl font-[900] text-text transition-colors duration-150 hover:text-background-accent" />
      }
      options={options}
      selectedOptionCode={selectedLanguage}
      onSelect={option => i18n.changeLanguage(option.code)}
    />
  );
}
