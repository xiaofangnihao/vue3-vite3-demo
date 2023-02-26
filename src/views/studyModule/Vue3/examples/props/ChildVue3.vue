<template>
  <p style="margin-top: 10px">{{ $attrs }}</p>
  <p>我是子元素</p>
  <p>{{ id }}</p>
  <p v-bind="$attrs">{{ name }}</p>
  <slot></slot>
  <p>{{ objVal.test }}</p>
  <p @click="$emit('testFun')">{{ fun() }}</p>
  <el-button @click="handleClick($event)">修改父组件值</el-button>
</template>

<script>
import { useAttrs } from "vue";
export default {
  inheritAttrs: false,
};
</script>

<script setup>
const props = defineProps({
  id: Number,
  name: String,
  objVal: {
    type: Object,
    validator(value) {
      console.log(value);
      return [1, 2].includes(value.test);
    },
  },
  test: {
    type: String,
    // required: true,
  },
  fun: {
    type: Function,
    default: () => "console.log(1)",
  },
});

const emit = defineEmits({
  // payload只校验第一个参数
  handleClick: (payload) => {
    console.log(payload, "---------------");
    return typeof payload === "string";
  },
  testFun: () => true,
});

const attrs = useAttrs();
console.log(attrs, "-----js中访问所有透传attributes");

function handleClick(e) {
  props.id++;
  props.objVal.show = false;
  props.objVal.test++;
  console.log(props.objVal, "变化了");
  console.warn(
    "子组件接收的值类型是基本类型,修改会报警告;若是Object类型,则修改生效"
  );
  emit("handleClick", e, 1);
}
</script>

<style></style>
