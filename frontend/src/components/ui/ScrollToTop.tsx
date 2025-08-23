import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (navigationType !== 'POP' && pathname !== prevPathname.current) {
      window.scrollTo(0, 0);
    }
    prevPathname.current = pathname;
  }, [pathname, navigationType]);

  return null;
}
