import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://tcu-animation.manapuraza.com',
    integrations: [mdx(), sitemap({
      filter: (page) => page.path !== '/404',
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    tailwind()],
    markdown: {
        shikiConfig: {
          themes: {
            light: 'poimandres',
            dark: 'catppuccin-latte',
          },
        },
      },
    
})
