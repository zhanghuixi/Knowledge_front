import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import "antd/lib/row/style";
import "antd/lib/col/style";
import Form from "antd/lib/form";
import "antd/lib/form/style";
import Select from "antd/lib/select";
import "antd/lib/select/style";
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
    id: 0, //指标集库id
    name: "",
    dataset_id: "", // 提交
    folder_id: "",
    dimension: [],
    measures: [],
    checkKeys: [],
    selectedRowKeys: [],
    gather_id: 0 //指标集id
  };
  componentDidMount() {
    this.setState({
      id: this.props.location.state.id,
      gather_id: this.props.location.state.gather_id
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.gatherDetail !== nextProps.gatherDetail) {
      await this.load(nextProps.gatherDetail);
    }
  }

  // 编辑获取数据
  load = async data => {
    const { setFieldsValue } = this.props.form;
    if (!_.isEmpty(data)) {
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
  create = async () => {
    await this.getInputData();
    const { form } = this.props;
    form.validateFields({ force: true }, async (err, values) => {
      if (_.isEmpty(err)) {
        if (_.isEmpty(this.props.type)) {
          this.props.createGather(this.state);
        } else {
          this.props.editGather(this.state);
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
          folder_id: _.isEmpty(+values.folder_id)
            ? this.props.location.state.id
            : +values.folder_id,
          gather_id: this.props.location.state.gather_id
        });
      }
    });
  };

  //获取dataset详情
  handleChange = async value => {
    this.props.getDateSetMeasure(+value);
    this.setState({
      dataset_id: +value
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

  edit = () => {
    this.props.history.push("/measurelibApp/addmeasure", {
      id: 23,
      type: "detail"
    });
  };

  render() {
    const { form, datasetList, measureTree, gatherDetail } = this.props;
    let { datasetMeasure } = this.props;
    if (!_.isEmpty(gatherDetail)) {
      datasetMeasure = gatherDetail.measure;
    }
    //显示已经选择的指标
    let checkMeasure = null;
    if (!_.isEmpty(datasetMeasure)) {
      checkMeasure = datasetMeasure.filter(i => +i.checked === 1);
    }
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
        {_.isEmpty(gatherDetail) ? (
          <Loading />
        ) : (
          <div>
            <Top>
              <Namep>
                {_.isEmpty(gatherDetail) ? null : gatherDetail.gather_name}
              </Namep>
              <Ca
                onClick={() => {
                  this.props.history.push("/measurelibApp/addmeasure", {
                    id: this.state.id,
                    gather_id: this.state.gather_id,
                    type: "edit"
                  });
                }}
              >
                <a>编辑</a>
              </Ca>
            </Top>
            <Row gutter={24} style={{ lineHeight: "40px" }}>
              <Col span={4} style={{ textAlign: "right" }}>
                指标集名称：
              </Col>
              <Col span={2}>
                {_.isEmpty(gatherDetail) ? null : gatherDetail.gather_name}
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                选择文件夹：
              </Col>
              <Col span={4}>
                {_.isEmpty(gatherDetail) ? null : gatherDetail.folder.name}
              </Col>
            </Row>
            <Row gutter={24} style={{ lineHeight: "40px" }}>
              <Col span={4} style={{ textAlign: "right" }}>
                选择数据集：
              </Col>
              <Col span={16}>
                {_.isEmpty(gatherDetail) ? null : gatherDetail.dataset.name}
              </Col>
            </Row>
            <Row gutter={24} style={{ lineHeight: "40px" }}>
              <Col span={4} style={{ textAlign: "right" }}>
                选择指标：
              </Col>
              <Col span={16}>
                {checkMeasure.length > 5 ? (
                  <SimpleTable
                    dataSource={checkMeasure}
                    rowKey={"id"}
                    rowSelection={rowSelection}
                    columns={columns}
                    scroll={{ y: 200 }}
                  />
                ) : null}
                {checkMeasure.length < 5 ? (
                  <SimpleTable
                    dataSource={checkMeasure}
                    rowKey={"id"}
                    rowSelection={rowSelection}
                    columns={columns}
                    // scroll= {null}
                  />
                ) : null}
              </Col>
            </Row>
            <Row gutter={24} style={{ lineHeight: "40px" }}>
              <Col span={4} style={{ textAlign: "right" }}>
                已选指标
              </Col>
            </Row>
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
          </div>
        )}
      </div>
    );
  }
}
export default FormCom;
