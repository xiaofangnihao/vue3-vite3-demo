<template>
  <div class="page">
    <SearchComponent
      :search-list="list"
      :search-form="searchForm"
      @search="search"
      @reset="reset"
    />
    <BaseTable />
    <BaseDialog
      :dialog-config="dialogConfig"
      :form-config="formConfig"
      :form-list="list"
      :form-data="form"
    />
  </div>
</template>

<script setup>
// 业务组件: 用于最基础的CRUD
import SearchComponent from "../SearchComponent/index.jsx";

const props = defineProps();

function search() {
  console.log("接收search事件");
}
</script>

<style></style>
