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
class MoveFolder extends Component {
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
            is_folder: 1,
            to_folder: values.folder_id === undefined ? +treeData[0].id : +values.folder_id,
          };
          await this.props.moveFolder(postFrom);
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
    const { form, treeData } = this.props;
    const { getFieldDecorator } = form;
    const tProps = {
      treeData: treeData,
      treeDefaultExpandAll: true,
      treeNodeFilterProp: "title",
      dropdownStyle: { maxHeight: 250, overflow: 'auto' },
      showSearch: true,
      searchPlaceholder: "请搜索",
      placeholder: "根目录",
      style: {
        width: 248
      }
    };
    return (
      <div>
        <Form hideRequiredMark>
          <FormItem {...formItemLayout} label="指标集文件夹" className="margin-bottom-10">
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
          <FormItem  label='选择文件夹'{...formItemLayout} >
          {getFieldDecorator('folder_id', {
            })(
              treeData.length && <TreeSelect {...tProps} />
          )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default MoveFolder;
