<template>
  <ScrollList :list-data="listData" />
  <!-- <el-button @click="showDetail">展示查看组件</el-button>
  <BaseShowDetail :config="state.config" :data="state.detailData" />
  <p ref="testP">{{ comValue }}</p>
  <button id="btn">{{ number }}</button>
  <div class="use-insert">
    <p class="config">{{ $translate("config") }}</p>
  </div>
  <el-button size="small" type="primary" @click="linkToNew"
    >路由跳转到新页面</el-button
  >
  <p>这是home组件</p>
  <p>查看无需根组件</p>
  <div class="form" style="width: 50%">
    <base-form
      ref="form"
      @click="handleClick"
      class="fatherClass"
      :form-config="state.formConfig"
      :form-list="state.formList"
      :form-data="state.formData"
    ></base-form>
  </div> -->
  <!-- <el-divider></el-divider> -->
  <!-- <base-dialog
    :test="test"
    :form-config="state.formConfig"
    :form-list="state.formList"
    :form-data="state.formData"
    :dialog-config="state.dialogConfig"
    @submit="submit"
  /> -->
  <!-- <SearchComponent
    :search-form="state.searchForm"
    :search-list="state.searchList"
  />
  <DraggableComponent :list="state.list" @onStart="onStart" @onEnd="onEnd" />
  <ImageVerify /> -->
</template>

<script setup>
import {
  inject,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  nextTick,
  onMounted,
  computed,
  onUpdated,
  h,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseForm from "@/components/BaseComponent/BaseForm.jsx";
import SearchComponent from "@/components/SearchComponent/index.jsx";
import DraggableComponent from "@/components/DraggableComponent.vue";
import ImageVerify from "./bussinessComponent/imageVerify.vue";
import ScrollList from "../components/NativeComponent/ScrollList.vue";

let listData = reactive([
  {
    title: "无缝滚动第一行",
  },
  {
    title: "无缝滚动第二行",
  },
  {
    title: "无缝滚动第三行",
  },
  {
    title: "无缝滚动第四行",
  },
  {
    title: "无缝滚动第五行",
  },
  {
    title: "无缝滚动第六行",
  },
  {
    title: "无缝滚动第七行",
  },
  {
    title: "无缝滚动第八行",
  },
  {
    title: "无缝滚动第九行",
  },
  {
    title: "无缝滚动第十行",
  },
  {
    title: "无缝滚动第十一行",
  },
]);

let testWatch = reactive({ a: 0 });

const test = ref(0);

const vnode = h("div", { id: "foo", class: "bar", innerHTML: "测试" });
// console.log(vnode);
const res = watch(
  () => testWatch,
  (nv, ov) => {
    // console.log(ov, nv);
  },
  { immediate: true, deep: true }
);

testWatch.a++;
// console.log(res);
onUpdated(() => {
  // console.log("钩子函数");
});

var a = "background: red; color: #fff;";

const router = useRouter();
const number = ref(0);
const form = ref(null);
onMounted(async () => {
  console.log(form);
  // form.value.test();
  // number.value++;
  // console.log(form.value.elForm);
  // let oConfig = document.getElementsByClassName("use-insert")[0];
  // console.log(oConfig);
  // console.log(oConfig.childNodes);
  // let oNew = document.createElement("p");
  // oNew.innerText = "测试插入";
  // (new, old)
  // oConfig.insertBefore(oNew, oConfig.childNodes[1]);
});

const fromValue = ref(1);
// 可写的计算属性
const comValue = computed({
  get: () => fromValue.value + 1,
  set: (nv) => (fromValue.value = nv - 1),
});
comValue.value++;
console.log(comValue.value);

const option = inject("i18n");

function handleClick() {
  console.log(1);
}

function linkToNew() {
  let routerUrl = router.resolve({
    path: "/login",
    query: {
      id: 1,
    },
  });
  window.open(routerUrl.href, "_blank");
}

const state = reactive({
  searchList: [
    {
      label: "日期",
      prop: "date",
      type: "date",
      required: true,
    },
    {
      label: "测试",
      prop: "text",
      type: "input",
      required: true,
    },
    {
      label: "测试222",
      prop: "text222",
      type: "input",
    },
    {
      label: "测试2323",
      prop: "text23",
      type: "input",
    },
    {
      label: "测试23123",
      prop: "text231",
      type: "input",
    },
  ],
  searchForm: {},
  formConfig: { labelWidth: 100, inline: true, columnNum: 3 },
  formList: [
    {
      label: "日期",
      prop: "date",
      type: "date",
      required: true,
    },
    [
      {
        label: "测试",
        prop: "text",
        type: "input",
        required: true,
      },
      {
        label: "测试222",
        prop: "text222",
        type: "input",
      },
    ],
    [
      {
        label: "测试2323",
        prop: "text23",
        type: "input",
      },
      {
        label: "测试1",
        prop: "text1",
        type: "select",
        selectOptions: [
          {
            label: "测试",
            value: 1,
          },
          {
            label: "测试1",
            value: 2,
          },
        ],
      },
    ],
    [
      {
        label: "级联",
        type: "cascader",
        options: [
          {
            value: "guide",
            label: "Guide",
            children: [
              {
                value: "disciplines",
                label: "Disciplines",
                children: [
                  {
                    value: "consistency",
                    label: "Consistency",
                  },
                  {
                    value: "feedback",
                    label: "Feedback",
                  },
                  {
                    value: "efficiency",
                    label: "Efficiency",
                  },
                  {
                    value: "controllability",
                    label: "Controllability",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "side nav",
                    label: "Side Navigation",
                  },
                  {
                    value: "top nav",
                    label: "Top Navigation",
                  },
                ],
              },
            ],
          },
          {
            value: "component",
            label: "Component",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout",
                  },
                  {
                    value: "color",
                    label: "Color",
                  },
                  {
                    value: "typography",
                    label: "Typography",
                  },
                  {
                    value: "icon",
                    label: "Icon",
                  },
                  {
                    value: "button",
                    label: "Button",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox",
                  },
                  {
                    value: "input",
                    label: "Input",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber",
                  },
                  {
                    value: "select",
                    label: "Select",
                  },
                  {
                    value: "cascader",
                    label: "Cascader",
                  },
                  {
                    value: "switch",
                    label: "Switch",
                  },
                  {
                    value: "slider",
                    label: "Slider",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker",
                  },
                  {
                    value: "upload",
                    label: "Upload",
                  },
                  {
                    value: "rate",
                    label: "Rate",
                  },
                  {
                    value: "form",
                    label: "Form",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table",
                  },
                  {
                    value: "tag",
                    label: "Tag",
                  },
                  {
                    value: "progress",
                    label: "Progress",
                  },
                  {
                    value: "tree",
                    label: "Tree",
                  },
                  {
                    value: "pagination",
                    label: "Pagination",
                  },
                  {
                    value: "badge",
                    label: "Badge",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert",
                  },
                  {
                    value: "loading",
                    label: "Loading",
                  },
                  {
                    value: "message",
                    label: "Message",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox",
                  },
                  {
                    value: "notification",
                    label: "Notification",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "Menu",
                  },
                  {
                    value: "tabs",
                    label: "Tabs",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown",
                  },
                  {
                    value: "steps",
                    label: "Steps",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip",
                  },
                  {
                    value: "popover",
                    label: "Popover",
                  },
                  {
                    value: "card",
                    label: "Card",
                  },
                  {
                    value: "carousel",
                    label: "Carousel",
                  },
                  {
                    value: "collapse",
                    label: "Collapse",
                  },
                ],
              },
            ],
          },
          {
            value: "resource",
            label: "Resource",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "docs",
                label: "Design Documentation",
              },
            ],
          },
        ],
        props: {
          checkStrictly: true,
        },
      },
    ],
  ],
  formData: {
    text: "",
  },
  dialogConfig: {
    show: true,
    title: "11",
  },
  config: {
    show: false,
    draggable: false,
  },
  detailData: [
    [
      {
        label: "行内一",
        value: "这是一段文字",
      },
      {
        label: "行内二",
        value:
          "测试超过宽度测试超过宽度测试超过宽度测试超过宽度测试超过宽度测试超过宽度测试超过宽度",
      },
    ],
    {
      label: "单行文本",
      value: "测试11",
    },
    {
      label: "多行文本",
      value:
        "设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号设置溢出显示为省略号",
    },
  ],
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "www.itxst.com", id: 0 },
    { name: "www.baidu.com", id: 1 },
    { name: "www.google.com", id: 2 },
  ],
});

function onStart(list) {
  console.log("onStart", list);
}

function onEnd(list) {
  console.log("onEnd", list);
  console.log(state.list[list.oldIndex]);
  // 被拖拽的数组项
  console.log(state.list[list.newIndex]);
  // 数组顺序已变化
  console.log(state.list);
}

function showDetail() {
  state.config.show = true;
}

function submit() {
  state.dialogConfig.show = false;
}
</script>

<style scoped lang="less">
.itxst {
  width: 600px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(19, 41, 239);
}
.chosenClass {
  background-color: @main-color;
}
</style>
