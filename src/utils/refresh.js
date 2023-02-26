// TODO: 未验证
export class Updater {
  // 根据打完包之后生成的script src 的hash值去判断，每次打包都会生成唯一的hash值，只要轮询去判断不一样了，那一定是重新部署了.
  constructor(options) {
    this.oldScript = []; // 存储第一次script的hash信息
    this.newScript = [];
    this.dispatch = {};
    this.init();
    this.timing(options?.timer); // 轮询
  }
  async init() {
    const html = await this.getHtml();
    this.oldScript = this.parseScript(html);
  }

  async getHtml() {
    const html = await fetch("/").then((res) => res.text()); // 读取index.html
    return html;
  }

  parseScript(html) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi); // script正则
    return html.match(reg);
  }

  // 发布订阅通知
  on(key, fn) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);
    return this;
  }

  compare(oldArr, newArr) {
    const base = oldArr.length;
    const arr = Array.from(new Set(oldArr.concat(newArr)));
    // 新旧length一样无更新
    if (arr.length === base) {
      this.dispatch["no-update"].forEach((fn) => {
        fn();
      });
    } else {
      // 通知更新
      this.dispatch["update"].forEach((fn) => {
        fn();
      });
    }
  }

  timing(time = 10000) {
    let t = setTimeout(async () => {
      const newHtml = await this.getHtml();
      this.newScript = this.parseScript(newHtml);
      // console.log(this.oldScript, this.newScript);
      this.compare(this.oldScript, this.newScript);
    }, time);
  }
}
