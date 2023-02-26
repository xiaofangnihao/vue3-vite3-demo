import Watcher from "./observer/watcher.js";
import { patch } from "./vdom/patch.js";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // patch是渲染vnode为真实dom核心
    vm.$el = patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  vm.$el = el;
  console.log(vm, el);
  // 定义一个渲染Watcher 执行方法渲染视图
  let updateComponent = () => {
    /**
     * vm._render: 调用生成的render函数 生成虚拟DOM
     * vm._update: 把虚拟DOM渲染到页面
     */
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, null, true);
}
