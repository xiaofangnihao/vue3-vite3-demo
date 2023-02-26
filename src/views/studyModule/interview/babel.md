// 参考文章 https://juejin.cn/post/7190312484492804156

Babel: 工具链, 将采用 ES6 及之后编写的代码转换为向后兼容的 JS 语法,以便能运行在旧版本的浏览器和其他环境中.
Babel 主要的两个功能:

1. 编译 ES6+最新语法;
2. 实现旧版本浏览器不支持的 ES6+的 API;

@babel/core: 核心; Babel 6 -> babel/core 的版本.
@babel/cli: 内置的 CLI 命令行工具, 可通过命令行编译文件.
@babel/preset-env: 允许使用最新的 js 代码, 而无需管理目标环境需要哪些语法转换. -> 只编译 ES6+的语法.
babel 编译 ES6+的语法是通过一个个插件 plugin 实现. preset(预设)是一个语法插件集合包,安装此包就无需再一个个配置插件.

polyfill: 垫片, 存放了 ES6+的新 API 的方法与实现.
core-js: 提供旧版浏览器缺失的所有 API, 安装 3.x.x 版本, 引入下面的 stable 文件夹
