import React from 'react';
import uuid from 'uuid'
let className = '';
const STYLES_SHOW = "width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;cursor: col-resize;background-color: transparent;display: block;z-index: 100;";
export const Mask = (props) => {
    if (props && isArrays(props.cls) && props.cls.length != 0 && hasElm(props.cls)) {
        const { cls, show } = props
        if (show) {
            const div = document.createElement("div")
            className = "split-pane-mask-" + uuid()
            div.setAttribute('class', className)
            div.setAttribute('style', STYLES_SHOW)
            cls.map(v => document.querySelector(v).appendChild(div.cloneNode(true)))
        } else {
            setTimeout(() => {
                const elms = document.querySelectorAll("." + className)
                for (let i = 0; i < elms.length; i++) {
                    elms[i].remove()
                }
                className = ''
            }, 100)

        }
    }
}
const isArrays = (par) => Object.prototype.toString.call( par ) === '[object Array]'
const hasElm = (par) => par.filter(v => document.querySelector(v)).length == par.length