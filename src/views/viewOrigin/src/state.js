import { observe } from "./observer/index.js";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // 实例的_data属性就是传入的data,可以取到vue实例data里的值(实时更新)
  // 实例的$options.data(): 获取到vue实例第一次初始化的值
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
  for (let key in data) {
    // 把data数据代理到Vue实例上,可以使用this.a来访问this._data.a
    proxy(vm, `_data`, key);
  }
  // 对数据进行观测 -- 响应式数据核心
  observe(data);
}

function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key];
    },
    set(newValue) {
      object[sourceKey][key] = newValue;
    },
  });
}
