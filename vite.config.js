/**
 * vite-plugin- vite专属的插件
 * vite-plugin-vue- 只适用于vue
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteImages from "vite-plugin-vue-images";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";

/**
 * defineConfig的第一个参数为command: 可以基于dev/build导出特有配置
 * 开发环境下command的值为serve, mode的值为development; 生产环境下为build, production;
 */
export default defineConfig(async ({ command, mode }) => {
  await console.log("\x1b[36m%s\x1b[0m", "异步结束后再导出配置");
  console.log("\x1b[36m%s\x1b[0m", command, mode);
  console.log("\x1b[36m%s\x1b[0m", "================参数==================");
  return {
    publicDir: "public",
    plugins:
      mode === "development"
        ? [
            vue(),
            vueJsx(),
            ViteImages({
              dirs: ["src/assets/images", "src/assets/businessImages"], // 指明图片存放的目录
            }),
          ]
        : [
            vue(),
            vueJsx(),
            ViteImages({
              dirs: ["src/assets/images", "src/assets/testImage"], // 指明图片存放的目录
            }),
            visualizer({
              emitFile: false,
              file: "stats.html", // 分析图生成的文件名
              open: true, //如果存在本地服务端口，将在打包后自动展示
            }),
            OptimizationPersist(),
            PkgConfig(),
            AutoImport({
              resolvers: [ElementPlusResolver()],
            }),
            Components({
              resolvers: [ElementPlusResolver()],
            }),
            // 图片压缩插件
            viteImagemin({
              verbose: true, // default; whether output the compressed result in the console
              // filter: (file) => {
              //   return !~file.indexOf("login");
              // }, specify which resources are not compressed
              gifsicle: {
                optimizationLevel: 7, // 优化级别
                interlaced: false, // 交错gif用于渐进渲染
              },
              optipng: {
                optimizationLevel: 7,
              },
              mozjpeg: {
                quality: 20, // compression quality: between 0 - 100
              },
              pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    name: "removeViewBox",
                  },
                  {
                    name: "removeEmptyAttrs",
                    active: false,
                  },
                ],
              },
            }),
            // gzip压缩
            viteCompression({
              verbose: true, // default; whether output the compressed result in the console
              // filter: (file) => {
              //   return !~file.indexOf("login");
              // }, specify which resources are not compressed
              threshold: 10240, // volume larger than threshold(unit: b) will be compressed
              algorithm: "gzip", // ['gzip','brotliCompress' ,'deflate','deflateRaw'] compression algorithm: 压缩算法
              ext: ".gz", // Suffix of the generated compressed package
              // compressionOptions: {} // params of compression algorithm
              // deleteOriginFile: false // whether delete source files after compression
            }),
          ],
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h } from "vue"`, // 自动为每一个被ESbuild转换的文件注入JSX helper
    },
    // logLevel: "warn", // TODO 调整控制台输出的级别
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 导入时可省略的扩展名列表
    },
    css: {
      preprocessorOptions: {
        less: {
          // 全局导入less文件
          additionalData:
            '@import "src/assets/css/common.less";@import "src/assets/css/reset.less";@import "src/assets/css/theme.less";@import "src/assets/css/variable.less";',
        },
      },
    },
    server: {
      proxy: {
        api: {
          target: "http://localhost:3000",
        },
      },
      // porxy: {
      //   // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      //   api: {
      //     // target: "http://127.0.0.1:7001", //后端服务实际地址
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
      host: "localhost", //默认localhost
      port: 8000, // 默认3000
      strictPort: false, // 设为true时会在port被占用时直接退出, 不再尝试下一个可用端口
      https: false, // 是否开启https
      open: "/", // String时会被当作URL的路径名
      ssr: false, // 服务端渲染
      base: "./", // 开发或生产环境下的公共基础路径
    },
    build:
      mode === "production"
        ? {
            outDir: "vue3-vite", // 打包构建输出路径，默认是dist，如果路径存在，构建之前会被删除(TODO: 实际操作时发现是直接覆盖了)
            assetsDir: "assets", // 生成静态资源的存放路径(相对于outDir)
            rollupOptions: {
              output: {
                manualChunks: (id) => {
                  // 将node_modules中的代码单独打包成一个js文件
                  if (id.includes("node_modules")) {
                    return id
                      .toString()
                      .split("node_modules/")[1]
                      .split("/")[0]
                      .toString();
                  }
                },
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
                assetFileNames: "static/[ext]/[name]-[hash].[ext]",
              },
            }, // 自定义底层的Rollup打包配置
            minify: "terser", // 使用terserOptions需要配置
            // 清除console和debugger
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }
        : "",
  };
});
