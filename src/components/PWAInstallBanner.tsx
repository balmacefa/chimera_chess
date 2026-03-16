'use client';

import { useEffect } from 'react';

// The package @khmyznikov/pwa-install already declares the 'pwa-install' intrinsic element in its types.
// See node_modules/@khmyznikov/pwa-install/dist/types/types/jsx.d.ts

export default function PWAInstallBanner() {
  useEffect(() => {
    // Import the package only on the client side
    import('@khmyznikov/pwa-install');
  }, []);

  return (
    <pwa-install></pwa-install>
  );
}
