import { useLayoutEffect, useState } from 'react';

export default function useWindowResize(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
