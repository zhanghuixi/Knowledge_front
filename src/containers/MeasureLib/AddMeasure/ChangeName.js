import React, { Component } from "react";
import { Form, Input, Select, TreeSelect } from "antd";
import * as _ from 'lodash'
// import './index.less'
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {labelCol: {
  xs: { span: 24 },
  sm: { span: 6 }
},
wrapperCol: {
  xs: { span: 24 },
  sm: { span: 16 }
}}
@Form.create()
class ChangeName extends Component {
  async componentDidMount() {
    const {form, data, treeData}  = this.props
    this.load(data)
    // 保存
    this.props.onOk(async close => {
      form.validateFields({ force: true }, async (err, values) => {
        if (_.isEmpty(err)) {
          const postFrom = {
            folder_id:+treeData[0].id,
            id: +data.id,
            pid:+data.pid,
            name:values.name
            // is_folder: 1,
            // to_folder: values.folder_id === undefined ? +treeData[0].id : +values.folder_id,
          };
          await this.props.editFolder(postFrom);
          close(true); // 隐藏model
        }
      });
    });
  }
  //加载编辑的详情
  load = async (data)=> {
    const {setFieldsValue} = this.props.form
    setFieldsValue({
      name: data.name,
    })
  }
  
  render() {
    const { form} = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form hideRequiredMark>
          <FormItem {...formItemLayout} label="文件夹名称" className="margin-bottom-10">
             {getFieldDecorator("name", {
               rules: [{ 
                // validator: (rule, value, callback) => this.checkName('name', rule, value, callback)
                }],
               validateTrigger: "onBlur"
             })(
               <Input
                 className="input"
                 maxLength={20}
                //  placeholder="请输入权限名称"
                 style={{ width: 248 }}
               />
             )}
           </FormItem>
        </Form>
      </div>
    );
  }
}

export default ChangeName;
