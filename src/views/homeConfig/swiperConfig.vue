<template>
  <div class="swiperConfig">
    <base-form
      :form-config="state.formConfig"
      :form-data="state.formData"
      :form-list="state.formList"
      @handleClick="handleClick"
    ></base-form>
    <base-table
      :config="tableConfig"
      :table-data="state.tableData"
      :total="total"
      :current-page="1"
      :page-size="10"
      @newAdd="newAdd"
    ></base-table>
    <base-dialog
      :dialog-config="state.dialogConfig"
      :form-config="state.formConfig"
      :form-data="state.formData"
      :form-list="state.formList"
    ></base-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const tableConfig = ref({
  column: [
    {
      label: "名称",
      prop: "name",
    },
    {
      label: "Logo",
      prop: "logo",
      type: "img",
    },
    {
      label: "添加时间",
      prop: "addDate",
    },
    {
      label: "修改时间",
      prop: "updateDate",
    },
  ],
});
const state = reactive({
  tableData: [
    {
      name: "图片1",
      logo: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      addDate: "2022-03-12",
      updateDate: new Date(),
    },
    {
      name: "图片1",
      logo: "",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1",
      logo: "11",
    },
    {
      name: "图片1212",
      logo: "11212",
    },
  ],
  formData: {},
  formConfig: { inline: true, columnNum: 3, labelWidth: 70 },
  formList: [
    {
      type: "input",
      label: "名称",
      prop: "name",
    },
    {
      type: "input",
      label: "添加时间",
      prop: "addDate",
    },
  ],
  dialogConfig: {
    show: false,
    title: "测试新增",
    formConfig: {},
    formData: { inline: false, columnNum: 2 },
    formList: [
      {
        type: "input",
        label: "名称",
        prop: "name",
      },
      {
        type: "upload",
        label: "Logo",
        prop: "name",
      },
      {
        type: "input",
        label: "添加时间",
        prop: "addDate",
      },
    ],
  },
});

const total = state.tableData.length;

const handleClick = (val) => {
  console.log(val);
  tableConfig.value.column.push({ label: "测试", prop: "test" });
};

function newAdd() {
  console.log(1);
  state.dialogConfig.show = true;
}
</script>

<style>
</style>