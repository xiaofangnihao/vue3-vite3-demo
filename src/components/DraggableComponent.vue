<template>
  <div class="draggable">
    <draggable
      item-key="id"
      :list="list"
      ghost-class="ghost"
      chosen-class="chosen-class"
      animation="300"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
/**
 * vuedraggable@next-vue3拖拽组件
 * ghost-class: 拖动元素的类名
 * chosen-class: 被选中元素的类名
 */
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["onStart", "onEnd"]);

function onStart(list) {
  emit("onStart", list);
}

function onEnd(list) {
  emit("onEnd", list);
}
</script>

<style scoped lang="less">
.draggable {
  width: 100%;
  display: flex;
}

.draggable > div:nth-of-type(1) {
  flex: 1;
}
.draggable > div:nth-of-type(2) {
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
  border: solid 1px red;
}
.chosen-class {
  background-color: @main-color;
}
</style>
