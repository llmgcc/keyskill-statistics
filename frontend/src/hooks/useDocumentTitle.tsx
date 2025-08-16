import { useEffect } from 'react';

import { APP_NAME } from '@/components/Navigation/Logo';

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    if (title) {
      document.title = `${APP_NAME}: ${title}`;
    }
  }, [title]);
}
