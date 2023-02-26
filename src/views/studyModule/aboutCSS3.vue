<template>
  <div class="animation">
    <!-- 动画菜单 -->
    <div class="cartoon-list">
      <ul class="menu-list">
        <li v-for="(item, index) of menuList" :key="item" class="menu-item">
          <a href="#" :class="['menu-item-link', `link${index + 1}`]">{{
            item
          }}</a>
          <el-icon class="menu-item-icon"><VideoPlay /></el-icon>
        </li>
      </ul>
    </div>
    <!-- 遮罩特效的图片盒子 -->
    <div class="img-wrap">
      <div class="content">
        <h2>世界末日宣言</h2>
        <p>- 就算真的到了世界末日, 我也要努力活好每一秒钟 -</p>
      </div>
      <img :src="avatar" alt="" />
    </div>
    <!-- IOS switch开关 -->
    <div class="switch-wrap">
      <div class="switch-box">
        <input type="checkbox" id="switch" />
        <label for="switch" class="switch">
          <span class="round"></span>
        </label>
      </div>
    </div>
    <!-- 垂直导航菜单 -->
    <div class="vertical-menu">
      <div class="vertical-item" v-for="item of verticalList" :key="item.title">
        <a class="link" href="#">
          <div class="left">
            <el-icon class="menu-item-icon"><VideoPlay /></el-icon>
          </div>
          <div class="right">
            <p class="title">{{ item.title }}</p>
            <p class="content">{{ item.content }}</p>
          </div>
        </a>
      </div>
    </div>
    <!-- 科技感盒子 -->
    <div class="science-wrap">
      <span
        v-for="item of ['left', 'right', 'top', 'bottom']"
        :key="item"
        class="line"
        :class="`${item}-line`"
      ></span>
      <div class="left">
        <img :src="rocket" alt="" />
      </div>
      <div class="right">
        <h3 style="margin-top: 15px; color: #b1db56">一个科技的时代</h3>
        <h4 style="margin-top: 15px; color: #b1db56">- 需要科技感 -</h4>
        <p style="margin-top: 15px">我们需要科技</p>
        <p style="margin-top: 15px">科技展望未来</p>
      </div>
    </div>
    <!-- 美化单选按钮 -->
    <!-- input的name值相同造就单选效果 -->
    <div class="radio-wrap">
      <div class="radio-box">
        <input type="radio" name="sex" id="male" value="male" />
        <label for="male" class="male">
          <el-icon><Male /></el-icon>
        </label>
      </div>
      <div class="radio-box">
        <input type="radio" name="sex" id="female" value="female" />
        <label for="female" class="female">
          <el-icon><Female /></el-icon>
        </label>
      </div>
    </div>
  </div>

  <p class="mt-10">css3 filter属性定义元素(一般是img)的可视效果(例如: 模糊与饱和度)</p>
</template>

<script setup>
import { ref } from "vue";

const menuList = ref([
  "心理罪之城市之光",
  "至爱梵高·星空之谜",
  "相声大电影之我要幸福",
  "东方快车谋杀案",
  "超自然事件之坠龙事件",
]);

const verticalList = ref([
  {
    title: "注册蓝轨迹培训中心",
    content: "WEB前端、后端、移动端、微信开发",
  },
  {
    title: "寻找更多好课",
    content: "WEB前后端基础课、进阶课、高级课",
  },
  {
    title: "今日更新优秀课程",
    content: "每日更新最多、更优秀的开发课",
  },
  {
    title: "每日好礼优惠多",
    content: "每日不同的优惠",
  },
  {
    title: "我学习过的课程",
    content: "我爱学、我学过、我喜欢的课程",
  },
]);
</script>

<style scoped lang="less">
.animation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .cartoon-list {
    background-color: #c2bfd2;
    width: 300px;
    border: 1px solid #c2bfd2;
    overflow: hidden;

    .menu-list {
      .menu-item {
        height: 80px;
        position: relative;
        cursor: pointer;

        &-link {
          position: absolute;
          font-size: 20px;
          top: 29px;
          left: -200px;
          animation: move 1s ease-in-out forwards;
          animation-fill-mode: forwards; // 保持最后的状态
          transition: all 0.2s;
        }

        .link1 {
          animation-delay: 0.5s;
        }
        .link2 {
          animation-delay: 0.4s;
        }
        .link3 {
          animation-delay: 0.3s;
        }
        .link4 {
          animation-delay: 0.2s;
        }
        .link5 {
          animation-delay: 0.1s;
        }

        &-icon {
          position: absolute;
          right: 15px;
          font-size: 20px;
          top: 29px;
          color: #6f153c;
        }
      }

      .menu-item:hover {
        background-color: #fff;
      }
    }

    @keyframes move {
      0% {
        left: -200px;
        color: #fff;
        font-size: 18px;
      }
      25% {
        left: 45px;
        color: #4c5a7d;
        font-size: 22px;
      }
      50% {
        left: 15px;
        color: #fff;
        font-size: 18px;
      }
      75% {
        left: 35px;
        color: #4c5a7d;
        font-size: 20px;
      }
      100% {
        left: 20px;
        color: #6f153c;
        font-size: 18px;
      }
    }
  }

  .switch-wrap {
    width: 350px;
    height: 200px;

    .switch-box {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 100px;
      background-color: #77d672;
      border: 3px solid #ddd;
      overflow: hidden;

      input[type="checkbox"] {
        visibility: hidden;
      }

      input[type="checkbox"]:checked + label {
        left: 150px;
        background-color: #77d672;
      }

      .switch {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        cursor: pointer;
        border-radius: 96px;
        box-sizing: border-box;
        transition: all 0.2s;

        .round {
          display: block;
          position: absolute;
          top: 3px;
          left: 3px;
          width: 194px;
          height: 194px;
          box-shadow: 0 0 10px #ccc;
          background-color: #fff;
          border-radius: 50%;
        }
      }
    }
  }

  .img-wrap {
    width: 600px;
    height: 500px;
    position: relative;

    img {
      height: 100%;
    }

    .content {
      position: absolute;
      color: #fff;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 200px;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .content::before,
    .content::after {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      height: 100%;
      width: 0;
      transition: all 0.3s;
    }

    .content::before {
      border-left: 1px solid #fff;
      left: 0;
      top: 0;
    }

    .content::after {
      border-right: 1px solid #fff;
      right: 0;
      top: 0;
    }
  }

  .img-wrap::before,
  .img-wrap::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 0;
    opacity: 0;
    transition: all 0.3s;
  }

  .img-wrap::before {
    border-top: 1px solid #fff;
    top: 0;
    left: 0;
  }

  .img-wrap::after {
    border-bottom: 1px solid #fff;
    bottom: 0;
    left: 0;
  }

  .img-wrap:hover .content {
    opacity: 1;
  }

  // hover时找到自己的before
  .img-wrap:hover::before {
    opacity: 1;
    top: 50px;
  }

  .img-wrap:hover::after {
    opacity: 1;
    bottom: 50px;
  }

  .img-wrap:hover .content::before {
    left: 50px;
  }

  .img-wrap:hover .content::after {
    right: 50px;
  }

  .vertical-menu {
    margin-top: 50px;

    .vertical-item {
      border-left: 10px solid #000;
      box-shadow: 1px 2px 3px #ddd;
      margin-top: 5px;
      box-sizing: border-box;
      transition: all 0.3s;

      a {
        display: flex;
        width: 400px;
        height: 80px;
        border: 1px solid #ddd;
        color: #000;

        .left {
          width: 50px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          transition: all 0.3s;

          i {
            transition: all 0.3s;
          }
        }

        .right {
          height: 100%;
          padding-top: 15px;
          font-size: 16px;

          .title {
            transition: all 0.3s;
          }

          .content {
            font-size: 12px;
            transition: all 0.3s;
            color: #666;
            margin-top: 7px;
          }
        }
      }
    }

    .vertical-item:hover .right .title {
      font-size: 14px;
      color: #fff;
    }

    .vertical-item:hover .right .content {
      font-size: 16px;
      color: #fbd04f;
    }

    .vertical-item:hover .left i {
      color: #fbd04f;
      transform: scale(1.5);
    }

    .vertical-item:hover {
      border-color: #fbd04f;
      background-color: #000;
    }
  }

  .science-wrap {
    position: relative;
    width: 400px;
    height: 200px;
    display: flex;
    margin-top: 50px;
    box-shadow: 0 0 3px #b1db56;
    transition: box-shadow 0.3s;

    .line {
      display: block;
      position: absolute;
      color: #b1db56;
      opacity: 0;
      transition: all 0.3s;
    }

    .top-line {
      top: -1px;
      width: 100%;
      border-top: 1px solid #b1db56;
      right: -255px;
    }

    .bottom-line {
      bottom: -1px;
      width: 100%;
      border-bottom: 1px solid #b1db56;
      left: -255px;
    }

    .left-line {
      left: -1px;
      height: 200px;
      border-left: 1px solid #b1db56;
      top: -155px;
    }

    .right-line {
      right: -1px;
      height: 200px;
      border-right: 1px solid #b1db56;
      bottom: -155px;
    }

    .left {
      padding: 30px;
      box-sizing: border-box;
    }

    img {
      width: 100%;
      height: 100%;
      transition: transform 0.3s;
    }

    .right {
      text-align: center;
    }
  }

  .science-wrap:hover {
    box-shadow: 0 0 15px #b1db56;
  }

  .science-wrap:hover .line {
    opacity: 1;
  }

  .science-wrap:hover img {
    transform: rotate(360deg);
  }

  .science-wrap:hover .top-line {
    width: 399px;
    right: 0;
  }

  .science-wrap:hover .bottom-line {
    width: 399px;
    left: 0;
  }

  .science-wrap:hover .left-line {
    height: 199px;
    top: 0;
  }

  .science-wrap:hover .right-line {
    height: 199px;
    bottom: 0;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .radio-wrap {
    margin-top: 50px;
    display: flex;
    width: 100px;

    .radio-box {
      width: 50px;
      height: 50px;
      position: relative;

      label {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        background-color: #ddd;
        border-radius: 50px;
        text-align: center;
        line-height: 30px;
        border: 2px solid #eee;
        box-shadow: 1px 3px 5px #ccc;
        color: #fff;
        transition: background-color 0.5s;
      }

      input[type="radio"] {
        visibility: hidden;
      }

      input[type="radio"]:checked + label.male {
        background-color: #add8e6;
      }

      input[type="radio"]:checked + label.female {
        background-color: #d8bfd8;
      }
    }
  }
}
</style>
