import { initMixin } from "./init.js";
import { lifecycleMixin } from "./lifecycle.js";
import { renderMixin } from "./render.js";

function Vue(options) {
  // Vue初始化工作
  // _init方法是挂载在Vue原型的方法
  // 在初始化时需要数据处理、事件处理、生命周期处理 划分不同文件引入利于代码分割
  this._init(options);
}

initMixin(Vue);

renderMixin(Vue);
lifecycleMixin(Vue);
export default Vue;

/**
 * 响应式流程: Vue构造函数定义 -> initMixin(Vue)--初始化方法(代码拆分) ->
 * _init初始化方法挂载在Vue原型 传入options调用 -> initState(vm) -> init->props,data,methods.... ->
 * initData-- proxy代理_data属性,使得this.xxx === this._data.xxx; observe(data) -- 对响应式数据进行观察
 * Object: 递归调用defineReactive对data的每一项属性进行get和set的劫持;
 * 在get方法里进行依赖收集: dep.depend() -- 每个属性都有dep实例保存自己的watch
 * 在set方法里进行派发更新: dep.notify() -- 通知所有与属性相关的watch更新并刷新视图
 * Array: 1.重写数组原型的7种变异方法: 采用AOP思想,将push unshift splice新增的对象进行响应式处理-- 利用已被
 * 响应式处理的数据__ob__属性(Observer实例对象) 再调用数组原型的方法完成数组的改变.
 * 数组的依赖收集和派发更新都是基于对象数据的__ob__属性来完成的
 * 2.对数组内部的对象进行劫持
 */
