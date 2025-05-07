// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { visualizer } from 'rollup-plugin-visualizer'

interface AppHead {
  htmlAttrs: { lang: string };
  titleTemplate: string;
  meta: { name: string; content: string }[];
}

interface IconSource {
  family: string;
  src: string;
  weight: number;
  style: string;
}

interface CustomCollection {
  prefix: string;
  dir: string;
}

interface ViteCSSOptions {
  preprocessorOptions: {
    scss: {
      additionalData: string;
      quietDeps: boolean;
    };
  };
}

interface VueCompilerOptions {
  isCustomElement: (tag: string) => boolean;
}

interface RuntimeConfig {
  public: {
    iconScoutId: string;
  };
  private: {
    clientSecret: string;
  };
}

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s – IconScout Demo',
      meta: [
        { name: 'description', content: 'Explore free icons, illustrations, lottie animations and 3D assets' },
        { rel: 'preconnect', href: 'https://api.iconscout.com' },
        { rel: 'dns-prefetch', href: 'https://api.iconscout.com' },
      ],
      link: [
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' }
      ]
    } as AppHead
  },
  modules: [
    '@nuxt/image',
    ['@nuxt/icon', {
      sources: [
        {
          family: 'Averta Std',
          src: '/fonts/averta/AvertaStd-Regular.ttf',
          weight: 400,
          style: 'normal'
        },
        {
          family: 'Averta Std',
          src: '/fonts/averta/AvertaStd-Semibold.ttf',
          weight: 600,
          style: 'normal'
        },
        {
          family: 'Averta Std',
          src: '/fonts/averta/AvertaStd-Bold.ttf',
          weight: 700,
          style: 'normal'
        },
      ] as IconSource[]
    }],
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@bootstrap-vue-next/nuxt'
  ],
  image:{
    domains:[
      'cdn.iconscout.com',
      'cdnl.iconscout.com'
    ]
  },
  css: ['~/assets/scss/custom.scss'],
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons'
      },
    ] as CustomCollection[]
  },
  vite: {
    plugins: [
      visualizer({
        filename: './.nuxt/stats.html', 
        template: 'treemap',            
        gzipSize: true,
        open: true                      
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
          quietDeps: true
        }
      }
    } as ViteCSSOptions
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag =>
        ['lottie-player', 'dotlottie-player'].includes(tag.toLowerCase()) &&
        !tag.startsWith('NuxtIcon')
    } as VueCompilerOptions
  },
  plugins: ['~/plugins/web-components.client'],
  bootstrapVueNext: {
    css: true,
    composables: true,
    directives: true
  },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      iconScoutId: process.env.ICONSCOUNT_CLIENT_ID || ''
    },
    private: {
      clientSecret: process.env.ICONSCOUT_CLIENT_SECRET || ''
    }
  },
  sitemap: {
    hostname: process.env.MY_PUBLIC_URL,
    gzip: true,
    routes: async () => {
      return []
    }
  },
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Allow: '/',
    Sitemap: `${process.env.MY_PUBLIC_URL}/sitemap.xml`
  },
  
});
