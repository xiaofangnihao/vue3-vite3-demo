<template>
  <div class="mask">
    <a href="https://github.com/chokcoco/iCSS/issues/80" target="_blank"
      >网络来源</a
    >
    <p class="mt-10">
      图片与 mask 生成的渐变的transparent的重叠部分,将会变得透明.
    </p>
    <div class="flex mt-10">
      <div>
        <p>单张图片使用mask的效果:</p>
        <div class="single-img"></div>
      </div>
      <div class="ml-100">
        <p>多张图片使用mask的效果:</p>
        <div class="more-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.mask {
  .single-img {
    width: 300px;
    height: 300px;
    background: url("../../../assets/images/forest.jpg") no-repeat;
    background-size: 100% 100%;
    -webkit-mask: linear-gradient(135deg, transparent 15px, deeppink 0) top left,
      linear-gradient(-135deg, transparent 15px, deeppink 0) top right,
      linear-gradient(-45deg, transparent 15px, deeppink 0) bottom right,
      linear-gradient(45deg, transparent 15px, deeppink 0) bottom left;
    mask: linear-gradient(135deg, transparent 15px, deeppink 0) top left,
      linear-gradient(-135deg, transparent 15px, deeppink 0) top right,
      linear-gradient(-45deg, transparent 15px, deeppink 0) bottom right,
      linear-gradient(45deg, transparent 15px, deeppink 0) bottom left;
    -webkit-mask-size: 50% 50%;
    mask-size: 50% 50%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }

  .more-img {
    width: 600px;
    height: 400px;
    position: relative;
    background: url("../../../assets/images/forest.jpg") no-repeat;
    background-size: 100% 100%;
    animation: maskMove 3s linear infinite;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      background: url("../../../assets/images/sun.jpeg") no-repeat;
      width: 100%;
      height: 100%;
      -webkit-mask: linear-gradient(45deg, #000 40%, transparent 60%);
      mask: linear-gradient(45deg, #000 40%, transparent 60%);
    }

    &:hover {
      animation: maskMove 2s linear infinite;
    }
  }

  @keyframes maskMove {
    @for $i from 0 through 100 {
      #{$i}% {
        // 线性渐变
        // -webkit-mask: linear-gradient(
        //   45deg,
        //   #000 #{$i + "%"},
        //   transparent #{$i + 5 + "%"},
        //   transparent 1%
        // );
        // 角向渐变
        -webkit-mask: conic-gradient(
          #000 #{$i - 10 + "%"},
          transparent #{$i + "%"},
          transparent
        );
      }
    }
  }
}
</style>
