import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { markRouteLoaded } from '../../utils/shouldPlayEntry';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    markRouteLoaded();
  }, [pathname]);

  return null;
}
