<template>
  <div class="css-custom-property">
    <p>自定义CSS属性,允许进行属性类型检查,设定默认值,该属性是否可以被继承</p>
    <a
      href="https://github.com/chokcoco/iCSS/issues/109"
      target="_blank"
      style="margin-top: 15px; display: inline-block"
      >网络来源</a
    >
    <div class="custom-property">
      <div>
        <p>CSS不支持背景过渡</p>
        <div class="before"></div>
      </div>
      <div style="margin-left: 50px">
        <p>使用@property</p>
        <div class="after"></div>
      </div>
      <div class="img"></div>
    </div>
  </div>
</template>

<script setup>
// JS中定义自定义属性
// CSS.registerProperty({
//   name: "--property-name",
//   syntax: "<color>",
//   inherits: false,
//   initialValue: "#000",
// });
</script>

<style scoped lang="scss">
$count: 400; // 生成的块数
$sqrt: 20; // 每行每列的块数
$per: 100% / $sqrt; // 每一块占图片的百分比
$width: 600px; // 图片的宽高
$perWid: 30; // 每一块的宽高值

@for $i from 1 to ($count + 1) {
  @property --m-#{$i} {
    syntax: "<number>";
    initial-value: 1;
    inherits: false;
  }
}
@function bgSet($n) {
  $bg: radial-gradient(rgba(0, 0, 0, var(--m-1)), rgba(0, 0, 0, var(--m-1)));

  @for $i from 2 through $n {
    $bg: $bg,
      radial-gradient(
        rgba(0, 0, 0, var(--m-#{$i})),
        rgba(0, 0, 0, var(--m-#{$i}))
      );
  }

  @return $bg;
}
@function positionSet($n) {
  $bgPosition: ();

  @for $i from 0 through ($n) {
    @for $j from 0 through ($n - 1) {
      $bgPosition: $bgPosition, #{$i * $perWid}px #{$j * $perWid}px;
    }
  }

  @return $bgPosition;
}
@function transitionSet($n) {
  $transition: --m-1 0.1s 0.1s;

  @for $i from 1 through $n {
    $transition: $transition, --m-#{$i} #{random(500)}ms #{random(500)}ms;
    // $transition: $transition,
    // --m-#{$i} #{100 + random(500)}ms #{($i / 50) * random(100)}ms;
  }

  @return $transition;
}

.img {
  margin: 25px 0 0 50px;
  width: $width;
  height: $width;
  background: url("../../../assets/images/avatar.jpg");
  background-size: 100% 100%;
  // mask属性不支持过渡动画
  -webkit-mask: bgSet($count);
  -webkit-mask-size: $per $per;
  -webkit-mask-position: positionSet($sqrt);
  -webkit-mask-repeat: no-repeat;
  mask: bgSet($count);
  mask-size: $per $per;
  mask-position: positionSet($sqrt);
  mask-repeat: no-repeat;
  transition: transitionSet($count);
}

.img:hover {
  @for $i from 1 through $count {
    --m-#{$i}: 0;
  }
}

/**
  --background-color: 自定义属性
*/
@property --background-colorA {
  syntax: "<color>"; // 语法规则 || 类型 required
  inherits: true; // required
  initial-value: #fff; // 初始值
}

@property --background-colorB {
  syntax: "<color>"; // 语法规则 || 类型 required
  inherits: true; // required
  initial-value: #000; // 初始值
}

.custom-property {
  display: flex;
  margin-top: 20px;

  .before {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, #fff, #000);
    transition: all 0.5s;

    &:hover {
      background: linear-gradient(45deg, yellowgreen, deeppink);
    }
  }

  .after {
    width: 300px;
    height: 300px;
    background: linear-gradient(
      45deg,
      var(--background-colorA),
      var(--background-colorB)
    );
    // animation: changeColor 5s infinite linear;
    transition: 1s --background-colorA, 1s --background-colorB;

    &:hover {
      --background-colorA: yellowgreen;
      --background-colorB: deeppink;
    }
  }

  @keyframes changeColor {
    20% {
      --background-colorA: red;
      --background-colorB: #a93ee0;
    }
    40% {
      --background-colorA: #ff3c41;
      --background-colorB: #e228a0;
    }
    60% {
      ---background-colorA: orange;
      --background-colorB: green;
    }
    80% {
      --background-colorA: #ae63e4;
      ---background-colorB: #0ebeff;
    }
  }
}
</style>
