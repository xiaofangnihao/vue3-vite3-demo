export class Dep {
  constructor() {
    this.subs = []; // 存放依赖的容器
  }

  addSubs(sub) {
    this.subs.push(sub);
  }

  removeSubs(sub) {
    remove(sub, this.subs);
  }

  depend() {
    if (window.target) {
      this.addSubs(window.target);
    }
  }

  notify() {
    const subs = this.subs.slice(); // slice方法不会改变原数组
    for (let i = 0; i < this.subs.length; i++) {
      subs[i].update();
    }
  }
}

function remove(sub, subs) {
  if (subs.length === 0) return;
  let index = subs.indexOf(sub);
  if (~index) {
    subs.splice(index, 1);
  }
}
