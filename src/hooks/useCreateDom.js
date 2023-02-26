import { createFragment } from "@/utils/dom";
import { useCreateEle } from "./useCreateEle";

export const useCreateDom = (
  titleData,
  fTag,
  fClass,
  contentData,
  cTag,
  cClass
) => {
  let oFrag = createFragment();
  titleData.forEach((title, index) => {
    let dom =
      index === 0
        ? useCreateEle(fTag, "", `${title}:`)
        : useCreateEle(fTag, fClass, `${title}:`);
    let childItem = contentData.find((i) => i.key === title);
    if (childItem) {
      let oChildFrag = createFragment();
      childItem.content.forEach((child) => {
        /* if child has extra classNames, define a 'className' item in child array **/
        let oChildItem = child.includes("className")
          ? useCreateEle(cTag, cClass + " " + child.slice(10), "")
          : useCreateEle(cTag, cClass, child);
        oChildFrag.appendChild(oChildItem);
      });
      dom.appendChild(oChildFrag);
    }
    oFrag.appendChild(dom);
  });

  /* return object **/
  return {
    oFrag,
  };
};
