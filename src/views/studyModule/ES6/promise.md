Promise: 构造函数内的内容同步执行, 实例的.then 方法异步执行.
有三种状态: pending、fulfilled 和 rejected. 状态一旦改变就不能再变, 且只有第一次 resolve 或 reject 有效.
promise 每次调用.then 或者.catch 都会返回一个新的 promise,因此可以实现链式调用.
promise 的 then 或者 catch 可以被调用多次,但是 Promise 构造函数只执行一次.
promise 内部状态一经改变且有了一个值之后, 后续每次调用.then 或者.catch 都会直接拿到该值.
返回任意一个非 promise 的值都会被包裹成 promise 对象.
.then 或.catch 的返回值不能是 promise 本身.

1. const first = () =>
   new Promise((resolve, reject) => {
   console.log(3);
   let p = new Promise((resolve, reject) => {
   console.log(7);
   setTimeout(() => {
   console.log(5);
   resolve(6);
   }, 0);
   resolve(1);
   });
   resolve(2);
   p.then((arg) => {
   console.log(arg);
   });
   });

first().then((arg) => {
console.log(arg);
});
console.log(4);
解析:
第一轮事件循环, 执行宏任务,first() -> Promise 构造函数中同步执行, 立即输出 3
p 的 Promise 构造函数立即执行, 输出 7, 遇到 setTimeout, 将回调函数放入下一轮任务队列(Event Quene)
然后 resolve 了 1; p 的 then 为 then1, 放入微任务队列中, 之后是 first 的 then,为 then2,resolve 的值是 2;
此时执行外层 console 为 4, 宏任务执行结束.此时输出 3,7,4; 执行微任务,依次为 1, 2;
开始第二轮事件循环,执行 setTimeout 里的回调,输出 5; 此时 resolve6 无效, p 的 Promise 状态一经改变就不会再变化了.

2. const promise = new Promise((resolve, reject) => {
   setTimeout(() => {
   console.log("once");
   resolve("success");
   }, 1000);
   });

const start = Date.now();
promise.then((res) => {
console.log(res, Date.now() - start);
});

promise.then((res) => {
console.log(res, Date.now() - start);
});

解析:
因为 new Promise 中没有 resolve 出来值, promise 实例处于 pending 状态, 无法执行.then 回调函数.
1s 后 resolve 了 success, then 也接着执行. once -> success, '' -> success, ''

3. Promise.resolve()
   .then(() => {
   return new Error("error!!"); -> === return Promise.resolve(new Error("error!!"));
   })
   .then((res) => {
   console.log("then", res);
   })
   .catch((err) => {
   console.log("catch", err);
   });

解析: 返回任意一个非 promise 的值都会被包裹成 promise 对象, -> 'then', Error: error!!

4.  Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)

解析: .then 或.catch 的期望参数是函数, 传入非函数会发生值穿透 -> 1

5. 红灯3秒亮一次,  绿灯1秒亮一次, 黄灯2秒亮一次, 使用Promise让三个灯不断交替重复亮;
解析: 根据promise链式调用, 将每一个亮灯动作写在then()方法中，同时返回一个新的Promise，并将其状态由pending设置为fulfilled，允许下一盏灯亮起。
function red() {
  console.log("red");
  console.log(new Date());
}

function green() {
  console.log("green");
  console.log(new Date());
}

function yellow() {
  console.log("yellow");
  console.log(new Date());
}

let myLight = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

let myStep = () => {
  Promise.resolve()
    .then(() => {
      return myLight(3000, red);
    })
    .then(() => {
      return myLight(1000, green);
    })
    .then(() => {
      return myLight(2000, yellow);
    })
    .then(() => {
      myStep();
    });
};

myStep();
