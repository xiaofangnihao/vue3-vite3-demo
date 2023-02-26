import { defineStore } from 'pinia'

export const useLayout = defineStore({
  id: 'layout',
  state: () => {
    return {
      type: 2, // 1: header栏宽度为100% 2: aside栏高度为100%
      footer: false, // 是否需要展示footer部分
      isCollapse: false, // 是否展开左侧菜单
    }
  },
  getters: () => { },
  actions: {}
})