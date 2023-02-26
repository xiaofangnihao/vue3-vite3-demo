import { pushTarget, popTarget } from "./dep.js";
import { queueWatcher } from "./scheduler.js";

// 定义一个全局变量id 每次new Watcher都会自增
let id = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb; // 回调函数 比如在Watcher更新之前可以执行beforeUpdate方法
    this.options = options; // 额外的选项true代表渲染watcher
    this.id = id++; // watcher的唯一标识
    this.deps = [];
    this.depsId = new Set(); // 去重dep
    if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    }
    // 实例化默认调用get方法
    this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  update() {
    // 每次watcher更新时 先将它们缓存起来 之后再一起调用
    // 异步队列机制
    queueWatcher(this);
    // this.get()
  }
  run() {
    // 真正的触发更新
    this.get();
  }
}
