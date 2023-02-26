import { arrayMethods } from "./array.js";
import { Dep } from "./observer/dep.js";

const hasProto = "__proto__" in {}; // 判断__proto__属性是否支持

export class Observer {
  constructor(value) {
    this.value = value;

    if (!Array.isArray(value)) {
      this.walk(value);
    } else {
      // 覆盖原型
      const augment = hasProto ? protoAugment : copyAugment;
      value.__proto__ = arrayMethods;
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

function protoAugment (value) {
  value.__proto__ = arrayMethods
}

function copyAugment(value) {
  for(let k in arrayMethods) {
    value[k] = arrayMethods[k]
  }
}

export function defineReactive(data, key, value) {
  if (typeof value === "object") {
    new Observer(value);
  }
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,

    /**
     * 缺点: get/set只能追踪一个数据是否被修改,无法追踪新增或者删除.
     */
    get() {
      dep.depend(); // 收集依赖
      return value;
    },

    set(newValue) {
      if (newValue === value) return;
      value = newValue;
      dep.notify(); // 触发依赖
    },
  });
}
