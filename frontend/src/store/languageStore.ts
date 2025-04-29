import i18n from '@/i18n/i18n';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Language } from '@/config/languages';

type LangStore = {
  lang: Language;
  setLang: (lang: Language) => void;
  languages: string[];
};

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: Language.en,
      languages: Object.keys(Language),
      setLang: (lang) => {
        i18n.changeLanguage(lang);
        set({ lang });
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.lang) {
          i18n.changeLanguage(state.lang);
        }
      },
    },
  ),
);
