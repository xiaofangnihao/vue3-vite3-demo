import { createElement, createTextNode } from "./vdom/index.js";
import { nextTick } from "./util/next-tick.js";

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    console.log(render);
    // 生成虚拟DOM
    const vnode = render.call(vm);
    console.log(vnode);
    return vnode;
  };

  Vue.prototype._c = function (...args) {
    return createElement(...args);
  };

  Vue.prototype._v = function (text) {
    return createTextNode(text);
  };

  Vue.prototype._s = function (val) {
    return val === null
      ? ""
      : typeof val === "object"
      ? JSON.stringify(val)
      : val;
  };

  Vue.prototype.$nextTick = nextTick;
}
