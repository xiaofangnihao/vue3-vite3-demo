import { computed } from "vue";

export const useField = (config, defaultConfig) => {
  const fieldConfig = computed(() => {
    // 此处若使用...扩展运算符 结果不会实时更新
    // Object.assign 后面的覆盖前面的: 传递的配置覆盖默认的配置
    return Object.assign(defaultConfig, config);
    // return { ...defaultConfig, ...config };
  });

  return {
    fieldConfig,
  };
};
