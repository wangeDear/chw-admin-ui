import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Unocss from 'unocss/vite';
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: "/chw-admin",
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      "/solon-api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/solon-api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
  ],

  // build: {
  //   outDir: "D:\\workspace\\eve-erupt-server\\src\\main\\resources\\public\\chw-admin",
  //   emptyOutDir: true
  // }

  build: {
    outDir: "D:\\workspace\\solon-examples\\3.Solon-Web\\demo3011-web\\src\\main\\resources\\WEB-INF\\static\\chw-admin",
    emptyOutDir: true
  }
})
