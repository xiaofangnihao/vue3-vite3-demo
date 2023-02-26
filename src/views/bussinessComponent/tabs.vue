<template>
  <div class="tab">
    <p v-if="title">{{ title }}:</p>
    <div
      v-for="(item, index) of typeList"
      :class="['tab-item', { active: index === currentIndex }]"
      :key="item.value"
      :style="item.style || ''"
      @click="changeType(item, index)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0,
  },
  title: String,
  typeList: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const emit = defineEmits(["changeType"]);

const changeType = (item, index) => {
  emit("changeType", item, index);
};
</script>

<style scoped lang="less">
.tab {
  display: flex;
  align-items: center;

  &-item {
    width: 70px;
    height: 50px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 100%;
    background-color: #fff;
    cursor: pointer;
  }

  &-item:first-child {
    margin-left: 0;
  }

  .active {
    background-color: @main-color;
    color: #fff;
    transition: all 0.5s;
  }
}
</style>
