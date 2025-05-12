import { useTranslation } from 'react-i18next';
import { IoLanguageOutline } from 'react-icons/io5';

import { Language, LanguageTitle } from '@/config/languages';

import { NavigationSelect } from './NavigationSelect';

export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const languages = Object.keys(Language);

  const options = languages.map((language) => ({
    code: language,
    name: LanguageTitle[language as Language],
  }));

  return (
    <NavigationSelect
      title={t('navigation.tooltips.language')}
      icon={
        <IoLanguageOutline className="cursor-pointer text-2xl text-red-400 text-text hover:text-background-accent" />
      }
      options={options}
      selectedOptionCode={selectedLanguage}
      onSelect={(option) => i18n.changeLanguage(option.code)}
    />
  );
}
