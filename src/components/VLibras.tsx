'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function VLibras() {
  const pathname = usePathname();

  useEffect(() => {
    const initVLibras = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    // Aguarda um breve momento para garantir que o DOM foi atualizado
    const timer = setTimeout(initVLibras, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div
        key={pathname}
        dangerouslySetInnerHTML={{
          __html: `
            <div vw class="enabled">
              <div vw-access-button class="active"></div>
              <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
              </div>
            </div>
          `,
        }}
      />
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }}
      />
    </>
  );
}




