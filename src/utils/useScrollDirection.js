import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the maximum vertical scroll from the usual global containers
      const currentScrollY = Math.max(
        window.scrollY || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0,
        document.getElementById('root')?.scrollTop || 0
      );
      
      // If no scrolling has occurred vertically, ignore
      if (currentScrollY === lastScrollY.current) return;
      
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Use capture: true so we catch scrolls on ANY scrollable child container (like #root)
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  return isVisible;
}
