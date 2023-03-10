import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals';
//TODO：解决vite跨域所用的反向代理
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        VueSetupExtend(),
        AutoImport({
            resolvers: [ElementPlusResolver({
                    exclude: /^ElAmap[A-Z]*/
                })]
        }),
        Components({
            resolvers: [ElementPlusResolver({
                    exclude: /^ElAmap[A-Z]*/
                })]
        }),
        resolveExternalsPlugin({
            AMap: 'AMap'
        })
    ],
    optimizeDeps: {
        include: ['schart.js']
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
        extensions: ['.js', '.json', '.ts'] //使用路径时想省略的后缀名
    }
});