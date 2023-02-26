let id = 0;

export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = []; // 存放watcher的容器
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }
}

// 被观察者 在subs里收集watcher 当数据变动的时候通知自身所有subs所有的watcher更新

// 全局Wacher指向 初始状态为null
Dep.target = null;
const targetStack = [];

export function pushTarget(watcher) {
  targetStack.push(watcher);
  Dep.target = watcher;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
