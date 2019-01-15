import React from 'react'
import {Modal} from 'antd'
import ReactDOM from 'react-dom'


function defaultShow () {
  alert('should not happen')
}

export let Modals = { show: defaultShow}
export default Modals

export class Model extends React.Component {
    state = { visible: false, confirmLoading: false, modalProps: {}, child: null, childOnOK: null }
    componentDidMount () {
      Modals.show = this.show
    }
    // 显示model
    show = (child, props = {}) => {
      this.setState({ child, modalProps: props, childOnOk: null, visible: true })
      return new Promise((resolve, reject) => {
        this.defer = { resolve, reject }
      })
    };
    // 完成事件，取消和保存都会调用
    finish = async (result) => {
      if(!result ) return
      if (!result.then) { // 将result转换为一个Promise
        result = Promise.resolve(result)
      }
      this.setState({ confirmLoading: true })
      try {
        const res = await result
        if (!res) return this.setState({ confirmLoading: false, child: null, visible: false }, () => this.defer.resolve(res))
        if (res instanceof Error) {
          this.setState({ confirmLoading: false })
        }
        this.setState({ confirmLoading: false, child: null, visible: false }, () => this.defer.resolve(res))
      } catch (err) {
        this.setState({ confirmLoading: false })
        console.error(err)
      }
    };
    // model 确定
    onOk = () => this.state.childOnOK ? this.state.childOnOK(this.finish) : this.finish(true)
    // 键盘事件
    keyDown = (e) => {
      if (e.keyCode === 27) { this.finish(false) } else if (e.keyCode === 13 && !this.state.modalProps.disableEnter) {
        this.onOk()
      }
    };

    // 设置显示隐藏
    hideModal = () => {
      this.setState({
        visible: false
      });
    }
    render() {
        let props = this.state.modalProps
        return (
            <div ref='modal' tabIndex='1' onKeyDown={this.keyDown}>
                <Modal
                  {...props}
                  visible={this.state.visible}
                  onOk={this.onOk}
                  onCancel={this.hideModal}
                  destroyOnClose={true}
                  confirmLoading={this.state.confirmLoading}
                  maskClosable={false}
                  cancelText='取消'
                  okText= '保存'
                >
                { this.state.child ? React.cloneElement(this.state.child, { ref: 'child', onOk: cb => this.setState({ childOnOK: cb }), onCancel: () => this.finish(false) }) :null}
                </Modal>
            </div>
        )
    }
}

let div = document.createElement('div')
document.body.appendChild(div)

ReactDOM.render(<Model />, div)
