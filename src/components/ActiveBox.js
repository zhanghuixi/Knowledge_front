import React from "react";
const STYLE = {
  position: "absolute",
  top: -1000,
  left: 0,
  backgroundColor: "#f2f2f2",
  zIndex: 1
};
export const getElm = (currentTarget, nodeName) => {
  if (currentTarget.nodeName == nodeName) {
    return currentTarget;
  } else if (currentTarget.parentElement.nodeName == "LI") {
    return currentTarget.parentElement;
  } else {
    getElm(currentTarget.parentElement, nodeName);
  }
};
const getString = styles => {
  let output = "";
  Object.keys(styles).map(v => {
    output += v + ": " + styles[v] + ";";
  });
  return output;
};
export const HoverBox = props => {
  let { cls, styles, e, isDisabled, widthCls } = props;
  if (!e) {
    // 移出
    if (!document.querySelector(cls)) return;
    document.querySelector(cls).style.top = "-1000px";
  } else {
    // 移入
    if (isDisabled) return;
    if (!document.querySelector(widthCls)) return;
    const width = document.querySelector(widthCls).getBoundingClientRect()
      .width;
    const LI = getElm(e.currentTarget, "LI");
    const { y } = LI.getBoundingClientRect();
    styles = getString(
      Object.assign(
        {
          top: y + "px",
          width: width - 10 + "px",
          height: "32px",
          position: "absolute",
          left: 0,
          "background-color": "#f2f2f2",
          "z-index": 1
        },
        styles || {}
      )
    );
    if (!document.querySelector(".addnewer-tree-hover-active-box")) {
      const div = document.createElement("div");
      div.setAttribute("class", cls.slice(1));
      div.setAttribute("style", styles);
      document.body.appendChild(div);
    } else {
      document
        .querySelector(".addnewer-tree-hover-active-box")
        .setAttribute("style", styles);
    }
  }
};
