import { initState } from "./state.js";
import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./lifecycle.js";

// 把_init方法挂载在Vue原型上供Vue实例调用
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // this代表调用_init方法的对象(实例对象)
    const vm = this;
    vm.$options = options;
    // 把vm实例传入
    initState(vm);

    // 若有el属性, 进行模板渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    // 先render再template
    if (!options.render) {
      let template = options.template;

      if (!template && el) {
        // 直接将模板赋值到el所在的外层html结构（就是el本身 -><div id="app">....</div> 并不是父元素）
        template = el.outerHTML;
      }
      console.log(template, "---", typeof template);
      // 将处理好的template模板转化成render函数
      if (template) {
        const render = compileToFunctions(template);
        options.render = render;
      }
    }

    // 将当前组件实例挂载到真实的el节点上
    return mountComponent(vm, el);
  };
}
