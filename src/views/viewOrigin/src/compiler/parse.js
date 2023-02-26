/**
 * 利用正则 匹配 html 字符串 遇到开始标签 结束标签和文本 解析完毕之后生成对应的 ast 并建立相应的父子关联
 * 不断的 advance 截取剩余的字符串 直到 html 全部解析完毕
 */

const ncname = `[a-zA-z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名 如abc-123
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 匹配特殊标签 如abc:234 前面的abc:可有可无
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开始 如<abc-123 捕获里面的标签名
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束 >
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾 如</abc-123> 捕获里面的标签名
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性 形如id="app"

// 根节点和当前父节点
let root, currentParent;

// 栈结构 表示开始和结束标签
let stack = [];
// 元素和文本type
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

// 生成ast方法
function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null,
  };
}

// 对开始标签进行处理
function handleStartTag({ tagName, attrs }) {
  let element = createASTElement(tagName, attrs);
  console.log(element);
  if (!root) {
    root = element;
  }
  currentParent = element;
  stack.push(element);
  console.log(stack);
}

// 对结束标签进行处理
function handleEndTag(tagName) {
  let element = stack.pop();
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    // 在此处赋值parent 同时给父级增加子级
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}

function handleChars(text) {
  // 去除空格正则
  text = text.replace(/\s/g, "");
  console.log(text);
  if (text) {
    currentParent.children.push({
      type: TEXT_TYPE,
      text,
    });
  }
  console.log(currentParent);
  console.log(stack);
}

export function parse(html) {
  while (html) {
    /**
     * <div id="app">
      <p>{{ a }}</p>
      <button class="btn">测试</button>
      </div>
      第一次循环去掉了<div id="app">
      第二次循环去掉了<p>前的空格
      第三次循环去掉了<p>
      第四次循环处理了{{ a }}
      第五次循环处理了</p>
     */
    console.log(html, "-------");
    // 若有数据显示异常为空格的原因
    let textEnd = html.indexOf("<");
    console.log(textEnd);
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      console.log(startTagMatch);
      if (startTagMatch) {
        handleStartTag(startTagMatch);
        // continue：结束本次循环，继续下次循环
        continue;
      }
      const endTagMatch = html.match(endTag);
      console.log(endTagMatch);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        handleEndTag(endTagMatch[1]);
        continue;
      }
    }

    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
      console.log(text);
    }

    // 此时是字符串的'    ' 因此为true
    if (text) {
      advance(text.length);
      handleChars(text);
    }
  }

  function parseStartTag() {
    const start = html.match(startTagOpen);
    console.log(start);

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      let end, attr;
      console.log(html);
      console.log((end = html.match(startTagClose)));
      console.log(html.match(attribute));
      while (
        // 这里的end会根据html变化了自动更新值 经过一次处理后end不再是null
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        advance(attr[0].length);
        console.log(html);

        attr = {
          name: attr[1],
          value: attr[3] || attr[4] || attr[5], // 这里是因为正则捕获支持双引号 单引号 和无引号的属性值
        };
        match.attrs.push(attr);
      }
      if (end) {
        advance(1);
        return match;
      }
    }
  }

  // 截取html字符串 每次匹配到了就往前继续匹配
  function advance(n) {
    html = html.substring(n);
    console.log(html);
  }

  console.log(root);

  return root;
}
