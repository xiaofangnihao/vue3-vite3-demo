<template>
  <div class="aboutES6"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { oTitle, oContent } from "./ES6Config";
import { useCreateDom } from "@/hooks/useCreateDom";

for (var i = 0; i < 3; i++) {}
console.log(i);

const { objA: test1, objB } = {
  objA: 23,
  objB: 12,
};
console.log(test1, objB);

function initDom() {
  const { oFrag } = useCreateDom(oTitle, "h2", "mt-20", oContent, "p", "mt-10");
  console.log(oFrag);
  let oFather = document.getElementsByClassName("aboutES6")[0];
  oFather.appendChild(oFrag);
}
// propKey in Object -> 某个属性名是否存在于某个对象中,返回Boolean
// Proxy实现链式调用函数的效果
window.double = (n) => n * 2;
window.pow = (n) => n * n;
window.reverseInt = (n) => n.toString().split("").reverse().join("");
function pile(value) {
  let funcStack = [];
  let p = new Proxy(
    {},
    {
      get: function (target, propKey) {
        if (propKey === "get") {
          return funcStack.reduce((inital, item) => {
            return item(inital);
          }, value);
        } else {
          funcStack.push(window[propKey]);
          return p;
        }
      },
    }
  );
  return p;
}
// console.log(pile(3).double.pow.reverseInt.get);
// Proxy实现一个生成各种DOM节点的Proxy实例dom, div下有a,ul,ul下有li
const dom = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return function (attrs = {}, ...children) {
        const el = document.createElement(propKey);
        for (let k of Object.keys(attrs)) {
          el.setAttribute(k, attrs[k]);
        }
        for (let child of children) {
          if (typeof child === "string") {
            child = document.createTextNode(child);
          }
          el.appendChild(child);
        }
        return el;
      };
    },
  }
);
onMounted(() => {
  initDom();
  let parentProxy = document.getElementsByClassName("parent-proxy")[0];
  parentProxy.appendChild(
    dom.div({}, "我是测试", dom.a({ href: "#" }, "我是a"))
  );
});
let person = {
  age: 100,
};
let sProxy = new Proxy(person, {
  set: function (obj, prop, value, proxy) {
    // console.log(obj, prop, value, proxy);
    obj[prop] = value;
    // 必须返回true
    return true;
  },
});
sProxy.age = 200;

function add(a, b, c, d) {
  return a + b + c + d;
}
var p = new Proxy(add, {
  apply(target, ctx, args) {
    // console.log(target, ctx, args);
    // return 12323;
  },
});
// console.log(p(1, 3, 4, 5));
let p1 = new Proxy(
  { a: 1, b: 2 },
  {
    has: function (target, prop) {
      return false;
    },
    deleteProperty: function (target, prop) {
      if (prop === "a") {
        throw new Error("禁止删除!");
      }
      delete target[prop];
      return true;
    },
  }
);
// delete p1.a;
console.log(p1);
console.log(typeof p1)
console.log("a" in p1);
console.log("a" in { a: 1 });
console.log({ a: 1, b: 2 });

("------------------------------------");
// Reflect
// console.log(Reflect);
function curryAdd(a) {
  return function (b) {
    return function (c) {
      return function (d) {
        return a + b + c + d;
      };
    };
  };
}
// console.log(curryAdd(1)(2)(3)(4));

function myCurrying(fn) {
  function curried(...args) {
    console.log(args);
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      function curried2(...args2) {
        // console.log(args2);
        return curried.apply(this, [...args, ...args2]);
      }
      return curried2;
    }
  }
  return curried;
}
// console.log(myCurrying(add)(1)(2)(3)(5));
// Set
let s = new Set();
s.add(2).add({}).add("3");
// console.log(s);
// console.log(s[2]);
for (let i of s) {
  // console.log(i);
}
// console.log(Array.from(s, (v) => typeof v === "object"));

let ws = new WeakSet();
let te = { b: 22 };
ws.add({}).add({ a: 1 }).add(te);
// console.log(ws.has(te));
// console.log(Object.prototype.toString.call(ws));

let a = new Map([["title", "测试"], [{ a: 1 }, "我是对象"], [123]]);
let ccc = new Map();
let bItems = [["title", "测试"], [{ a: 1 }, "我是对象"], [123]];
bItems.forEach(([key, value]) => {
  ccc.set(key, value);
});
// ccc.set(["1"], 5);
// console.log(a.keys());

// 解构赋值
const obj = {
  q: 1,
  w: 2,
};
// prop: myProp(想要的属性名)
const { q: myWantPropName, w } = obj;
// console.log(w);
// console.log(myWantPropName);

// find
const array = [1, 2, 3, 4, 5];
let b = array.filter((item) => item === 3);
let c = array.find((item) => item === 3);
// console.log(b, c); // [3], 3

// flat
const array1 = [1, 2, [1, 2, 3, [4, 5, 6]]];
const array2 = array1.flat();
const array3 = array1.flat(Infinity); // Infinity会展开所有嵌套数组, flat() === flat(1)
// console.log(array2);
// console.log(array3);

// Promise
const fn1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
      reject("11");
      console.log("我是fn1");
    }, 1000);
  }).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      throw new Error(err);
    }
  );
};

const p11 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("fail"), 5000));
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p11), 1000);
});

p2.then((res) => console.log(res)).catch((err) => console.log(err));

const fn2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
      console.log("我是fn2");
    }, 2000);
  });
};

const awaitFn = async () => {
  let res1 = await fn1();
  let res2 = await fn2();
  console.log(res1, res2);
};
const fn = () => {
  fn1().then((res) => {
    console.log(res);
    fn2().then((res1) => {
      console.log(res1);
      awaitFn();
    });
  });
};
// fn();

// 并发, 同时执行, 1s后打印出fn1的结果, 再1s后打印出fn2的结果, 但可以同时处理它俩的resolve值array
const fn3 = () => {
  Promise.all([fn1(), fn2()]).then((res) => {
    console.log(res);
  });
};
// fn3();

// 其中一个异步执行完成就返回结果, -> 1
const fn4 = () => {
  Promise.race([fn1(), fn2()]).then((res) => {
    console.log(res);
  });
};
// fn4();
</script>

<style scoped lang="less">
.progress {
  width: 0;
  height: 20px;
  line-height: 20px;
}
</style>
