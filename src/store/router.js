import { defineStore } from 'pinia'

export const useRt = defineStore({
  id: 'rt',
  state: () => ({
    routers: []
  }),

  actions: {
    setRouter(routers) {
      this.routers = routers
    }
  }
})