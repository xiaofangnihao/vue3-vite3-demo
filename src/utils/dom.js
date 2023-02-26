// 在需要处理大量DOM操作时,抛出一个文档碎片用于保存,之后再作相关操作.避免引起大量重绘重排
export function createFragment() {
  return document.createDocumentFragment();
}
