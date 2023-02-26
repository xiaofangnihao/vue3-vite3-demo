let callbacks = [];
let pending = false;
function flushCallbacks() {
  pending = false; // 把标志还原为false
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}

let timeFunc; // 定义异步方法 采用优雅降级
if (typeof Promise !== "undefined") {
  const p = Promise.resolve();
  timeFunc = () => {
    p.then(flushCallbacks);
  };
} else if (typeof MutationObserver !== "undefined") {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timeFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== "undefined") {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // 最后降级采用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb) {
  // 除了渲染watcher 还有用户自己手动调用的nextTick一起收集到数组
  callbacks.push(cb);
  if (!pending) {
    // 若多次调用nextTick 只会执行一次异步 等异步队列清空之后再把标志变成false
    pending = true;
    timeFunc();
  }
}
