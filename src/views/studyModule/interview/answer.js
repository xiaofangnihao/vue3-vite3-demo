import android from "../../../assets/businessImages/android.png";
import compression from "../../../assets/businessImages/compression.png";
import imageMin from "../../../assets/businessImages/imageMin.png";
import loadingFinished from "../../../assets/businessImages/loading-finished.png";

export default [
  {
    id: "1",
    content:
      "①: npm init: name为要发的包名, version为版本号, main为入口文件,需创建在与package.json同级的位置.<br/> ②: npm login.若报403错误: 将镜像切换到npm镜像: npm config set registry https://registry.npmjs.org. 切换到淘宝镜像: https://registry.npm.taobao.org.<br/>③: npm publish",
  },
  {
    id: "1-1",
    content:
      "①: npm version (patch,minor,major); patch(小修复): 0.0.1 -> 0.0.2;minor(小版本): 0.0.1 -> 0.1.0; major(大版本): 0.0.1 -> 1.0.0;<br/>②: npm publish",
  },
  {
    id: "1-2",
    content: "npm unpublish xxx --force",
  },
  {
    id: "2",
    content:
      "首先会去项目的package.json文件里找scripts下对应的xxx,然后执行xxx命令.例如启动vite项目npm run dev,实际上执行的就是vite.",
  },
  {
    id: "2-1",
    content: "因为操作系统中不存在vite指令,直接执行会报错.",
  },
  {
    id: "2-2",
    content:
      "通过npm i xxx来安装依赖时,就会在node_modules/.bin/目录中创建好vite为名的几个可执行文件(vite, vite.cmd, vite.ps1). .bin目录不是任何一个npm包,目录下的文件是一个个软链接,文件顶部写着#!/bin/sh,表示这是一个脚本.npm会到./bin下找到vite文件作为脚本来执行.",
  },
  {
    id: "2-3",
    content:
      "npm i时,npm将bin/vite.js文件作为bin声明了,(在库的源代码中的package.json里面)当npm i时,npm读到该配置,就将该文件软链接到./node_modules/.bin目录下,而且还会自动把node_modules/.bin加入$PATH,这样就可以直接作为命令运行依赖程序和开发依赖程序,不用全局安装. 若使用npm i -g xxx时,会将其中的bin文件加入到全局,例如vue-cli,在全局安装后,就可以直接使用vue-cli projectName这样的命令来创建项目了. 即: npm i时,npm就会自动将这种软链接配置好,类似于一种映射,执行npm run xxx时就会到node_modules/bin中找到对应的映射文件,之后再找到对应的js文件来执行.vite.js中又会通过node调用dist下的cli.js执行.由于node中可以使用一系列系统相关的api,所以这个js中可以做很多事情,例如读取并分析运行这条命令的目录下的文件,根据模板生成文件等等.",
  },
  {
    id: "2-4",
    content: "windows一般调用.cmd为后缀的脚本.",
  },
  {
    id: "2-5",
    type: "summarize",
    content:
      "运行 npm run xxx的时,npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；没有找到则从全局的 node_modules/.bin 中查找,npm i -g xxx就是安装到到全局目录;如果全局目录还是没找到,那么就从 path 环境变量中查找有没有其他同名的可执行程序",
  },
  {
    id: "3",
    content:
      "-S是运行时依赖,是在运行程序时需要用到的一些依赖,如axios,在build的时候需要一起打包出去.(Dependencies);<br />-D是开发时依赖,是在运行程序时无需用到的插件,如less,不会被打包到build中,是为了使代码流畅.(devDependencies)",
  },
  {
    id: "4",
    content:
      "把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数,并且返回接受余下的参数且返回结果的新函数的技术. 好处:使函数功能尽可能单一,减少代码冗余,增加代码可读性.",
  },
  {
    id: "5",
    content:
      "能.vue底层初始化时的执行顺序为props->methods->data->computed->watch.但是父组件修改props不会引起data里的值更新,若需要这种更新,将值放入computed中",
  },
  {
    id: "6",
    content:
      "父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted",
  },
  {
    id: "7",
    content:
      "行为型模式的一种,定义了一种一对多的依赖关系,让多个观察者同时监听某一个主题对象.该主题对象在状态变化时,会通知所有的观察者对象,使它们能自动更新自己.",
  },
  {
    id: "7-1",
    content:
      "观察者模式只有两个,一个观察者,一个被观察者.发布订阅模式有中间层.发布订阅模式: 发布者通知给中间层->中层接受并通知订阅者->订阅者收到通知并产生变化.",
  },
  {
    id: "8",
    content:
      "①将打包后的文件全部复制到nginx安装目录下的html文件中,地址为localhost:80(默认端口80); ②: 将打包后的文件放在nginx的安装同级目录下,修改nginx.conf文件下server->location->root,改为打包的文件名;server->listen, 修改要部署的端口.<br/>重启nginx: nginx -s restart; 关闭项目: nginx -s quit/stop(优雅/快速);重新加载配置(修改nginx配置文件后): nginx -s reload",
  },
  {
    id: "9",
    content:
      "在manifast.json(源码视图)的mp-weixin(mp-qq, mp-baidu同理)中配置:optimization: {subPackages: true}, pages.json中新建数组'subPackages': [{ root: 子包根目录, pages: 正常路径 }]",
    link: "https://zhuanlan.zhihu.com/p/426186756",
  },
  {
    id: "10",
    link: "https://ask.dcloud.net.cn/article/36549",
    imgUrl: android,
  },
  {
    id: "11",
    imgUrl: loadingFinished,
  },
  {
    id: "12",
    content: "npm init vite",
  },
  {
    id: "13",
    content:
      "标记vue文件中css时使用scoped标记产生的,为了保证各个文件中的css不相互影响,给每个component做了唯一的标记",
  },
  {
    id: "14",
    content:
      "①: 当前页面业务逻辑较为复杂时,抽离出一个js文件在当前业务的目录之下.<br/>②: 当一个业务代码块被多个地方复用时,抽离js文件到共同文件层.<br/>③: 若是全局的一个common代码模块,抽取到外部的hooks文件夹下.<br/>④: 所有hooks函数js文件统一以use为开头命名,导出一个以use开头的函数; 不同的hooks函数可以互相在内部引用.",
  },
  {
    id: "15",
    content: "该插件用于打包压缩图片资源, 境内安装容易失败.",
    link: "https://github.com/vbenjs/vite-plugin-imagemin",
    linkText: "插件官网",
    imgUrl: imageMin,
  },
  {
    id: "16",
    content: "该插件用于gzip压缩.",
    link: "https://github.com/vbenjs/vite-plugin-compression/tree/main#readme",
    linkText: "插件官网",
    imgUrl: compression,
  },
];
