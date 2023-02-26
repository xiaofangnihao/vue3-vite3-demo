import { defineStore } from "pinia";
import router from "../router/index.js";

export const useLogin = defineStore({
  id: "login",
  state: () => {
    return {
      token: "",
      userId: "",
    };
  },
  getters: () => {},
  actions: {
    setToken(token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("currentTime", Date.parse(new Date()));
      this.token = token;
      router.push("/");
    },

    clearToken() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("currentTime");
      this.token = "";
      router.push("/login");
    },
  },
});
