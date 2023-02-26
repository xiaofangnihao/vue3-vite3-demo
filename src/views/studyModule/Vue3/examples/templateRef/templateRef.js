import { ref } from "vue";

export const templateRef = () => {
  let refList = ref([]);

  const setRef = (el) => {
    el && refList.value.push(el);
  };

  return {
    refList,
    setRef,
  };
};
