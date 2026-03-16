'use client';

import { useEffect } from 'react';

export default function PWAInstallBanner() {
  useEffect(() => {
    // Import the package only on the client side
    import('@khmyznikov/pwa-install');
  }, []);

  return (
    <pwa-install></pwa-install>
  );
}

// Add TypeScript definition for the custom element
import { PWAInstallProps } from '@khmyznikov/pwa-install';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': PWAInstallProps; // or specify the attributes you want to use
    }
  }
}
