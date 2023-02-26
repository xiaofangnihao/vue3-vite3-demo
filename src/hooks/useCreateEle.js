// customProps: 自定义属性
export const useCreateEle = (tag, className, text, customProps = {}) => {
  let element = document.createElement(tag);
  typeof className === "string"
    ? (element.className = className)
    : className.forEach((item, index) => {
        index === 0
          ? (element.className = item)
          : (element.className += ` ${item}`);
      });
  element.innerHTML = text;
  for (const [k, v] of Object.entries(customProps)) {
    element.setAttribute(k, v);
  }
  return element;
};
