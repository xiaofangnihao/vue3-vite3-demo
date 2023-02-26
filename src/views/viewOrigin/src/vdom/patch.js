// patch用来渲染和更新视图
export function patch(oldVnode, vnode) {
  /** 判断传入的oldVnode是否是一个真实元素
   * 初次渲染时,传入的vm.$el是传参的el选项 因此是真实dom
   * 若是视图更新时 vm.$el就被替换成了更新之前的老的虚拟dom
   * */
  const isRealElement = oldVnode.nodeType;
  console.log(isRealElement);
  console.log(oldVnode);
  if (isRealElement) {
    // 此处是初次渲染
    const oldElm = oldVnode;
    console.log(oldElm.parentNode);
    const parentElm = oldElm.parentNode;
    console.log(parentElm);
    // 将虚拟dom转化成真实dom节点
    let el = createElm(vnode);
    console.log(vnode);
    // 插入到老el节点下一个节点的前面 就相当于插入到老的el节点的后面
    // insertBefore(newNode, where insert)
    parentElm.insertBefore(el, oldElm.nextSibling);
    // 删除老的el节点
    parentElm.removeChild(oldVnode);
    return el;
  }
}

// 虚拟dom转成真实dom -> 调用原生方法生成dom树
function createElm(vnode) {
  let { tag, data, key, children, text } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    // 解析虚拟dom属性
    updateProperties(vnode);
    // 若有子节点 递归插入到父节点中
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    // 文本节点
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

// 解析vnode的data属性 映射到真实dom上
function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (let k in newProps) {
    // style 特殊处理
    if (k === "style") {
      for (let styleName in newProps[k]) {
        el.style[styleName] = newProps[k][styleName];
      }
    } else if (k === "class") {
      el.className = newProps[k];
    } else {
      el.setAttribute(k, newProps[k]);
    }
  }
}
