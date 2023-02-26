export class Watcher {
  /**
   * 
   * @param {vue实例} vm 
   * @param {表达式或函数} expOrFn 
   * @param {要执行的回调函数} cb 
   */
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 执行this.getter就可以读取数据的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this; // 把当前Watcher实例赋值到window.target -> 对应dep实例的depend方法
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value; // 原始值
    this.value = this.get(); // 变化后的值
    this.cb.call(this.vm, this.value, oldValue); // 数据变化要执行的回调函数
  }
}

const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
