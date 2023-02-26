<template>
  <div class="array">
    <img src="../../../assets/images/array.png" />
    <p class="mt-10">
      返回[1,...100]: fill填充: let array = new Array(100).fill(0).map((item,
      index) => index + 1);
    </p>
  </div>
</template>

<script setup>
let array = new Array(100).fill(0).map((item, index) => index + 1);
</script>

<style scoped lang="less">
img {
  width: 700px;
  height: 700px;
}
</style>
