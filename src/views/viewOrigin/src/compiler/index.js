import { parse } from "./parse.js";
import { generate } from "./codegen.js";

export function compileToFunctions(template) {
  // 1.把html代码转成ast语法树 ast用来描述代码本身形成树结构
  let ast = parse(template);
  // 2.优化静态节点
  // if(options.optimize !== false) {
  //   optimize(ast, options)
  // }
  // 3.通过ast 重新生成代码 -> 生成render函数
  // 最后生成的代码需要和render函数一样
  // 类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))
  // _c代表创建元素 _v代表创建文本 _s代表Json.stringify--把对象解析成文本
  let code = generate(ast);
  console.log(code);
  // 使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值 比如 name值就变成了this.name
  let renderFn = new Function(`with(this){return ${code}}`);
  console.log(renderFn, "sssss");
  return renderFn;
}
