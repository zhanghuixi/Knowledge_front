import React from "react";
import Modal from "antd/lib/modal/index";
import "antd/lib/modal/style";

export const Confirm = ({
   title,
   content,
   className = 'measure-relate-modal-confirm',
   onOk,
   onCancel,
}) => {
    Modal.confirm({
        title,
        content,
        destroyOnClose: true,
        maskClosable: true,
        className,
        cancelText: '取消',
        okText: '确定',
        onOk() {
            if (typeof onOk == 'function') onOk()
        },
        onCancel() {
            if (typeof onCancel == 'function') onCancel()
        },
    })
}
