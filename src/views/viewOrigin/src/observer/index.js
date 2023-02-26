import { arrayMethods } from "./array.js";
import Dep from "./dep.js";

class Observer {
  constructor(value) {
    /**
     * 给每个响应式数据增加一个不可枚举的__ob__属性,指向Observer实例.
     * 可以防止已经被响应式观察的数据反复被观测.
     * 响应式数据可以使用__ob__来获取Observer实例的相关方法
     */
    Object.defineProperty(value, "__ob__", {
      // 值指代的就是Observer的实例
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    /**
     * 若data里的数据包含Array 直接修改数组下标也会触发set更新
     * 当数组中的元素过多时 需要给每一项下标都添加get和set 过于消耗性能
     * 因此只能劫持对象
     */
    if (Array.isArray(value)) {
      // 重写数组原型方法来对数组的七种方法进行拦截
      value.__proto__ = arrayMethods;
      // 若数组里面的元素有对象 递归判断
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }

  walk(data) {
    // 对象上的所有属性依次进行观测 !!!!!
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}

// Object.defineProperty数据劫持核心
// 缺点: 对象新增或者删除的属性无法被set监听到 只有对象本身存在的属性修改才会被劫持
function defineReactive(data, key, value) {
  let childOb = observe(value); // 递归关键
  // 若value还是一个对象会继续走一遍defineReactive 层层遍历直到value不是对象为止
  // 若vue数据嵌套层级过深 -> 性能会受到影响

  let dep = new Dep(); // 给每个属性实例化一个Dep

  Object.defineProperty(data, key, {
    get() {
      // 页面取值的时候 把watcher收集到dep中 -> 依赖收集
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);
      // 在set中通知视图更新
      value = newValue;
      dep.notify(); // 通知渲染watcher去更新 -> 派发更新
    },
  });
}

function dependArray(value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

export function observe(value) {
  // 若传过来的是对象或者数组 进行属性劫持 -> 即 data里的值还是对象
  if (
    Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value)
  ) {
    return new Observer(value);
  }
}
