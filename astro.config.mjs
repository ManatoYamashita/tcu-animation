import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import icon from 'astro-icon'
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://tcu-animation.jp',
    integrations: [mdx(), sitemap({
      filter: (page) => page.path !== '/404',
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    icon()],
    markdown: {
        shikiConfig: {
          themes: {
            light: 'poimandres',
            dark: 'catppuccin-latte',
          },
        },
      },
    
})
