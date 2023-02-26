/**
 * 拿到生成好的 ast 之后
 * 需要把ast转化成类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))这样的字符串
 */

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //匹配花括号 {{  }} 捕获花括号里面的内容

function gen(node) {
  console.log(node);
  if (node.type === 1) {
    return generate(node);
  } else {
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    }
    let lastIndex = (defaultTagRE.lastIndex = 0);
    console.log(lastIndex);
    let tokens = [];
    let match, index;
    console.log(defaultTagRE.exec("{{a}}"));
    console.log(text);
    console.log((match = defaultTagRE.exec(text)), "aaaaaaaaaaaaaaaaa");

    // TODO 这里是null为什么也进来了? 是null为什么下面match又输出了值
    while ((match = defaultTagRE.exec(text))) {
      console.log(match);
      index = match.index;
      console.log(index, lastIndex);
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }

      tokens.push(`_s(${match[1].trim()})`);

      lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    console.log(tokens);
    console.log(tokens.join("+"));

    return `_v(${tokens.join("+")})`;
  }
}

function genProps(attrs) {
  let str = "";
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach((item) => {
        let [key, value] = item.split(":");
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }

  return `{${str.slice(0, -1)}}`;
}

function getChildren(el) {
  console.log(el, "第一次进入");
  const children = el.children;
  console.log(children);

  if (children) {
    return `${children.map((c) => gen(c)).join(",")}`;
  }
}

export function generate(el) {
  let children = getChildren(el);
  console.log(children);
  let code = `_c('${el.tag}',${
    el.attrs.length ? `${genProps(el.attrs)}` : "undefined"
  }${children ? `,${children}` : ""})`;
  console.log(code, "----");
  return code;
}
