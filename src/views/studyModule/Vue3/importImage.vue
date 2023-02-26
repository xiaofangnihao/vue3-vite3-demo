<template>
  <!-- <div class="images">vue3+vite引入图片的三种方式:</div>
  <el-image
    :src="getImage('avatar.jpg')"
    style="width: 100px; height: 100px; display: block; margin-top: 5px"
  ></el-image>
  <el-image
    :src="getImage1('avatar.jpg')"
    style="width: 100px; height: 100px; display: block; margin-top: 15px"
  ></el-image>
  <el-image
    :src="cloud"
    style="width: 100px; height: 100px; display: block; margin-top: 15px"
  ></el-image> -->
</template>

TODO: 生产环境打包报错, 暂未发现原因
<script setup>
import cloud from "../../../assets/images/cloud.png";

/**
 * new URL(url, [base]): 创建一个新的url对象
 * import.meta: Object,包含当前模块的信息:
 * 在浏览器环境中,包含当前脚本的URL;
 * 在HTML中,包含当前页面的URL;
 */
// function getImage(name) {
//   console.log(
//     new URL(`images/${name}`, import.meta.url),
//     "======图片引入问题======"
//   );
//   console.log(import.meta, "======图片引入问题======");
//   return `${
//     new URL(`assets/images/${name}`, import.meta.url).origin
//   }/src/assets/images/${name}`;
// }

/**
 * ./: 当前目录,即views
 * ../: 上级目录,即src
 */
// function getImage1(name) {
//   let picModules = import.meta.globEager("../../../assets/images/*.png");
//   let picModules1 = import.meta.globEager("../../../assets/images/*.jpg");
//   picModules = Object.assign(picModules, picModules1);
//   console.log(picModules, "======图片引入问题======");
//   const path = `../../../assets/images/${name}`;
//   return picModules[path].default;
// }
</script>

<style scoped lang="less">
.images {
  margin-top: 20px;
}
</style>
