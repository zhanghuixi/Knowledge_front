import React from "react";
import Form from "antd/lib/form";
import "antd/lib/form/style";
import Select from "antd/lib/select";
import "antd/lib/select/style";
import Input from "antd/lib/input";
import "antd/lib/input/style";
import TreeSelect from "antd/lib/tree-select";
import "antd/lib/tree-select/style";
import Row from "antd/lib/row";
import "antd/lib/row/style";
import Col from "antd/lib/col";
import "antd/lib/col/style";
import { formItemLayout } from "./config";
import {
  Folder,
  Measure,
  Pmeasure,
  Measures,
  Pmeasures,
  Gather,
  Pgather,
  Mspan,
  Di,
  TableDiv,
  Top,
  Namep,
  Ca
} from "./FormStyle.js";

import * as _ from "lodash";
import SimpleTable from "../../../components/SimpleTable";
import { PubSub, SearchComponent } from "../../../components/SearchComponent";
import Loading from "../../../components/Loading";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class FormCom extends React.Component {
  state = {
    id: 0, //指标库id
    name: "",
    dataset_id: 0, // 提交
    folder_id: 0,
    dimension: [],
    measures: [],
    checkKeys: [],
    selectedRowKeys: [],
    gather_id: 0 //指标集id
  };
  componentDidMount() {
    //父组件使用子组件方法

    this.setState({
      id: this.props.location.state.id,
      gather_id: this.props.location.state.gather_id
    });
    if (this.props.type === "edit") {
      this.load(this.props.gatherDetail);
    }
    this.props.onRef(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.gatherDetail !== nextProps.gatherDetail) {
      await this.load(nextProps.gatherDetail);
    }
  }
  // 编辑获取数据
  load = async data => {
    const { setFieldsValue } = this.props.form;
    const formData = { name: data.gather_name };
    if (!_.isEmpty(data)) {
      setFieldsValue({
        name: data.gather_name,
        folder_id: data.folder.id,
        dataset: data.dataset.id
      });
      //获取被选中的checkbox
      this.getCheckData(data.measure);
      //处理checkbox选中
      this.setState({
        dataset_id: +data.dataset.id
      });
    }
  };
  //获取选中的checkbox
  getCheckData = datasetMeasure => {
    let selectKey = [];
    let selectData = [];
    datasetMeasure.map(
      i => (i.checked === 1 ? (selectKey.push(i.id), selectData.push(i)) : null)
    );
    this.onSelectChange(this.state.selectedRowKeys, selectData);
    this.setState({
      selectedRowKeys: selectKey
    });
  };
  //表单提交
  create = async type => {
    await this.getInputData();
    const { form } = this.props;
    form.validateFields({ force: true }, async (err, values) => {
      if (_.isEmpty(err)) {
        if (this.props.location.state.type === "create") {
          await this.props.createGather(this.state, type);
        } else {
          this.props.editGather(this.state, type);
        }
      }
    });
  };
  //获取表单数据
  getInputData = async () => {
    const { form } = this.props;
    form.validateFields({ force: true }, async (err, values) => {
      if (_.isEmpty(err)) {
        this.setState({
          name: values.name,
          folder_id:
            values.folder_id === undefined
              ? this.props.location.state.id
              : +values.folder_id,
          gather_id: this.props.location.state.gather_id
        });
      }
    });
  };

  //获取dataset详情
  handleChange = async value => {
    //清空之前选择的数据
    this.props.getDateSetMeasure(+value);
    this.setState({
      dataset_id: +value,
      dimension: [],
      measures: [],
      checkKeys: [],
      selectedRowKeys: []
    });
  };

  //删除选中的维度和指标
  del = (data, v, type) => {
    let checkKeys = this.state.checkKeys;
    const selectedRowKeys = this.state.selectedRowKeys;
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys.filter(i => +i !== +v)
    });
    type === 1
      ? this.setState({
          dimension: data.filter(i => +i !== +v)
        })
      : this.setState({
          measures: data.filter(i => +i !== +v)
        });
  };
  //checkoutbox改变
  onSelectChange = (selectedRowKeys, selectedRows) => {
    let measures = [];
    let dimension = [];
    selectedRows.map(
      i => (+i.field_type === 2 ? measures.push(+i.id) : dimension.push(+i.id))
    );
    this.setState({
      measures: measures,
      dimension: dimension,
      checkKeys: measures.concat(dimension)
    });
    this.setState({ selectedRowKeys });
  };
  render() {
    const { form, datasetList, measureTree, gatherDetail } = this.props;
    const { getFieldDecorator } = form;
    let { datasetMeasure } = this.props;
    if (!_.isEmpty(gatherDetail)) {
      datasetMeasure = gatherDetail.measure;
    }
    const optionsDataset =
      !_.isEmpty(datasetList) &&
      datasetList.map(i => (
        <Option key={i.id} value={i.id}>
          {i.name}
        </Option>
      ));
    //已选择指标显示
    const objDimension = {};
    const objMeasures = {};
    !_.isEmpty(datasetMeasure) &&
      datasetMeasure.map(
        i =>
          +i.field_type === 1
            ? (objDimension[i.id] = i.alias)
            : (objMeasures[i.id] = i.alias)
      );
    const tProps = {
      treeData: measureTree,
      treeDefaultExpandAll: true,
      treeNodeFilterProp: "title",
      dropdownStyle: { maxHeight: 250, overflow: "auto" },
      showSearch: true,
      searchPlaceholder: "请搜索",
      placeholder: "根目录",
      style: { width: 248 }
    };
    const columns = [
      {
        title: "字段名",
        dataIndex: "field",
        key: "field",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "指标名",
        dataIndex: "alias",
        key: "alias"
      },
      {
        title: "指标类型",
        dataIndex: "value_type",
        key: "value_type"
      },
      {
        title: "指标描述",
        dataIndex: "description",
        key: "description"
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let measures = [];
        let dimension = [];
        selectedRows.map(
          i =>
            +i.field_type === 2 ? measures.push(+i.id) : dimension.push(+i.id)
        );
        this.setState({
          measures: measures,
          dimension: dimension,
          checkKeys: measures.concat(dimension)
        });
        this.setState({ selectedRowKeys });
      },
      onSelection: this.onSelection
    };
    return (
      <div>
        <div>
          {_.isEmpty(gatherDetail) &&
          this.props.location.state.type === "edit" ? (
            <Loading />
          ) : null}
        </div>
        <Top>
          <Namep>
            {_.isEmpty(gatherDetail) ? null : gatherDetail.gather_name}
          </Namep>
          <Ca onClick={() => this.create(2)}>
            <a>保存</a>
          </Ca>
        </Top>
        <Form
          className="from-box"
          hideRequiredMark
          style={{ margin: "20px auto 80px", position: "relative" }}
        >
          <FormItem {...formItemLayout} label="指标集名称 ">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "指标集名称不能为空"
                }
              ],
              validateTrigger: "onBlur"
            })(
              <Input
                className="input"
                maxLength={200}
                placeholder="请输入指标集名称"
                style={{ width: 248 }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="选择文件夹 ">
            {getFieldDecorator("folder_id")(<TreeSelect {...tProps} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="选择数据集">
            {getFieldDecorator("dataset", {
              rules: [
                {
                  required: true,
                  message: "数据集不能为空"
                }
              ],
              validateTrigger: "onBlur"
            })(
              <Select
                className="tem"
                onChange={value => this.handleChange(value)}
                placeholder="请选择数据集"
                // defaultValue="请选择数据集"
                style={{ width: 248 }}
              >
                {optionsDataset}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="选择指标">
            <TableDiv>
              {datasetMeasure ? (
                <SimpleTable
                  dataSource={datasetMeasure}
                  rowKey={"id"}
                  rowSelection={rowSelection}
                  columns={columns}
                  scroll={{ y: 200 }}
                />
              ) : null}
            </TableDiv>
          </FormItem>
          <Measure>
            <Pmeasure>已选指标</Pmeasure>
          </Measure>
          <Measures>
            <Pmeasures>维度: </Pmeasures>
            {/* {console.log(objDimension)} */}
            {this.state.checkKeys.length
              ? this.state.dimension.map(
                  (v, i) =>
                    _.isEmpty(objDimension[v]) ? null : (
                      <Mspan
                        style={
                          i.field_type === 1
                            ? { background: "#d7f4ac" }
                            : { background: "#e5eff1" }
                        }
                        key={i}
                      >
                        {objDimension[v]}
                        <Di
                          onClick={() => this.del(this.state.dimension, v, 1)}
                        />
                      </Mspan>
                    )
                )
              : null}
          </Measures>
          <Gather>
            <Pgather>指标: </Pgather>
            {this.state.checkKeys.length
              ? this.state.measures.map((v, i) => (
                  <Mspan
                    style={
                      i.field_type != 1
                        ? { background: "#d7f4ac" }
                        : { background: "#e5eff1" }
                    }
                    key={i}
                  >
                    {objMeasures[v]}
                    <Di onClick={() => this.del(this.state.measures, v, 2)} />
                  </Mspan>
                ))
              : null}
          </Gather>
        </Form>
      </div>
    );
  }
}
export default FormCom;
