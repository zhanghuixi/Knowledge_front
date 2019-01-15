import React from "react";
import uuid from "uuid";
import { observer, inject } from "mobx-react";
import SplitPane from "react-split-pane";
import Button from "antd/lib/button";
import "antd/lib/button/style";
import {
  HeaderDiv,
  HeaderLeft,
  HeaderRight,
  ContentDiv,
  LeftTitleBoxWarp
} from "../../ContainerStyle";
import { ImgDiv, Mp } from "../../MeasureLib/AddMeasure/AddMeasureStyle";
import MeasureLibHeader from "../../../components/MeasureLibHeader";
import FormCom from "../Form";
import FormDetail from "../FormDetail";
import * as _ from "lodash";
import Loading from "../../../components/Loading";
import { MeasureLibTree } from "../../../components/GenericTree";
import doTree from "../../../utils/dotreedata";
import newGather from "../../../style/imgs/u111.png";
import MeasureLibName from "./MeasureLibName";
import models from "../../../components/Models";
import MoveFolder from "./MoveFolder";
import ChangeName from "./ChangeName"
@inject("measurelib")
@observer
class AddMeasure extends React.Component {
  state = {
    loading: false,
    name: ""
  };

  async componentDidMount() {
    //初始化
    this.props.measurelib.datasetMeasure = null;
    this.props.measurelib.gatherDetail = null;
    this.load();
  }

  load = async () => {
    this.setLoading(true);
    if (!_.isEmpty(this.props.location.state)) {
      const id = this.props.location.state.id;
      // this.props.measurelib.getMeasureTree(id);
      //处理编辑指标库之后进入页面左侧树
      if (
        this.props.location.state.type === "createinit" ||
        this.props.location.state.type == "create"
      ) {
        this.props.measurelib.getMeasureTree(
          id,
          this.props.location.state.type
        );
      }
      if (id != 0) {
        const gather_id = this.props.location.state.gather_id;
        if (
          this.props.location.state.type === "edit" ||
          this.props.location.state.type === "detail"
        ) {
          await this.props.measurelib.getGatherDetail(gather_id);
          await this.props.measurelib.getMeasureTree(id);
        }
        if (this.props.location.state.type === "edit") {
          await this.props.measurelib.getMeasureTree(id);
        }
      }
    }
    //加载dataset列表
    // if (this.props.location.state.type === 'edit' || this.props.location.state.type === "create") {
    this.props.measurelib.getDatasetList();
  };
  // 设置loading
  setLoading = load => {
    this.setState({
      loading: load
    });
  };
  getDateSetMeasure = async id => {
    this.props.measurelib.gatherDetail = null;
    await this.props.measurelib.getDateSetMeasure(id);
  };
  //保存指标库
  onRef = ref => {
    this.FormCom = ref;
  };
  onClick = async e => {
    await this.FormCom.create(1);
    this.props.history.push("/measurelibApp");
  };
  addMeasurelib = data => {
    if (_.isEmpty(this.props.measurelib.measureTree)) {
      this.props.measurelib.addFolder({
        name: this.state.name,
        pid: 0,
        type: "addMeasurelib"
      });
    } else {
      const name = this.state.name.length
        ? this.state.name
        : this.props.measurelib.measureTree[0].name;
      this.props.measurelib.editFolder({
        id: +this.props.measurelib.measureTree[0].id,
        name: name,
        pid: 0,
        type: "addMeasurelib"
      });
    }
  };
  changeInput = value => {
    this.setState({
      name: value
    });
  };
  showSearch = isShow => {
    this.setState({
      isShow: isShow
    });
  };
  addFolder = () => {
    this.props.measurelib.insertTreeNode({
      id: uuid(),
      name: "文件夹",
      pid: this.props.measurelib.measureTree[0].id,
      is_folder: true,
      state: {
        isEdit: { editing: true, type: "folder" }
      }
    });
  };
  addGather = () => {
    this.props.history.push("/measurelibApp/addmeasure/", {
      id: !_.isEmpty(this.props.measurelib.measureTree)
        ? +this.props.measurelib.measureTree[0].id
        : 0,
      type: "create"
    });
  };
  extConfig = {
    deleteFolder: node => {
      this.props.measurelib.removeTreeNode(node);
    },
    deleteMeasure: node => {
      //删除文件夹
      if (node.is_folder === 1) {
        this.props.measurelib.delData({
          folder_id: +this.props.measurelib.measureTree[0].id,
          id: +node.id,
          type: 3
        });
      } else {
        //删除指标集
        let gather_id = node.id.substr(2);
        this.props.measurelib.delData({
          folder_id: +this.props.measurelib.measureTree[0].id,
          id: +gather_id,
          type: 2
        });
      }
    },
    moveGather: node => {
      models.show(
        <MoveFolder
          refs={this}
          treeData={this.props.measurelib.measureTree}
          data={node}
          moveFolder={this.props.measurelib.moveFolder}
          getMeasureTree={this.props.measurelib.getMeasureTree}
        />,
        { title: `指标集文件夹` }
      );
    },
    createFolder: node => {
      this.props.measurelib.addFolder({
        name: node.name,
        pid: parseInt(node.pid),
        type: "addFolder"
      });
    },
    getMeasureDetail: node => {
      let gather_id = node.id.substr(2);
      this.props.history.push("/measurelibApp/addmeasure", {
        id: +this.props.measurelib.measureTree[0].id,
        gather_id: parseInt(gather_id),
        type: "detail"
      });
    },
    changeFolderName: node => {
      models.show(
        <ChangeName
          refs={this}
          treeData={this.props.measurelib.measureTree}
          data={node}
          editFolder ={this.props.measurelib.editFolder }
          getMeasureTree={this.props.measurelib.getMeasureTree}
        />,
        { title: `指标集文件夹` }
      );
    },
  };
  render() {
    let leftDoTreeData = null;
    let id = null;
    let deep = _.cloneDeep(this.props.measurelib.measureTree);
    if (!_.isEmpty(this.props.measurelib.measureTree)) {
      leftDoTreeData = doTree(deep, "gather");
    }
    id = this.props.location.state.id;
    return (
      <div>
        {!this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <HeaderDiv>
              <HeaderLeft>
                <MeasureLibHeader
                  id={
                    !_.isEmpty(this.props.measurelib.measureTree)
                      ? +this.props.measurelib.measureTree[0].id
                      : 0
                  }
                />
              </HeaderLeft>
              <HeaderRight>
                <Button
                  className="measure-lib-btn-1"
                  style={{ marginRight: 20, width: "auto" }}
                  onClick={() => {
                    this.onClick();
                  }}
                >
                  保存指标库
                </Button>
                <Button
                  className="measure-lib-btn-2"
                  type="primary"
                  style={{ marginLeft: 10, width: "auto" }}
                  onClick={() => {
                    this.props.history.push("/measurelibApp/measurerelate/");
                  }}
                >
                  前往关联
                </Button>
              </HeaderRight>
            </HeaderDiv>
            <ContentDiv>
              {!_.isEmpty(this.props.measurelib.datasetList) ? (
                <SplitPane
                  className="relate-split-pane-warp"
                  split="vertical"
                  minSize={300}
                  defaultSize={300}
                >
                  <div>
                    {/*<LeftTitleBoxWarp className="left-title-box">*/}
                    <MeasureLibName
                      addFolder={this.addFolder}
                      addMeasurelib={this.addMeasurelib}
                      addGather={this.addGather}
                      name={
                        _.isEmpty(leftDoTreeData) ? "" : leftDoTreeData[0].name
                      }
                      changeInput={this.changeInput}
                      showSearch={this.showSearch}
                    />
                    {/*</LeftTitleBoxWarp>*/}
                    <div
                      style={{
                        height: "auto",
                        paddingLeft: "10px",
                        width: "auto",
                        overflow: "auto"
                      }}
                    >
                      {/* {console.log(id)
                        }  */}
                      {_.isEmpty(leftDoTreeData) &&
                      this.props.location.state.id != 0 &&
                      this.props.location.state.type != "create" &&
                      this.props.location.state.type != "detail" &&
                      this.props.location.state.type != "edit" ? (
                        <Loading />
                      ) : null}
                      {!_.isEmpty(leftDoTreeData) ? (
                        <MeasureLibTree
                          className="measure-lib-tree"
                          data={leftDoTreeData[0].children}
                          extConfig={this.extConfig}
                          getNodes={nodes => {}}
                          originalTreeData={this.props.measurelib.measureTree}
                          showSearch={this.state.isShow}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div>
                    {(!_.isEmpty(this.props.location.state) &&
                      this.props.location.state.type === "create") ||
                    this.props.location.state.type === "edit" ? (
                      <FormCom
                        datasetList={
                          this.props.measurelib.datasetList
                            ? this.props.measurelib.datasetList
                            : null
                        }
                        getDateSetMeasure={this.getDateSetMeasure}
                        datasetMeasure={this.props.measurelib.datasetMeasure}
                        measureTree={this.props.measurelib.measureTree}
                        gatherDetail={this.props.measurelib.gatherDetail}
                        createGather={this.props.measurelib.createGather}
                        getMeasureTree={this.props.measurelib.getMeasureTree}
                        editGather={this.props.measurelib.editGather}
                        location={this.props.location}
                        history={this.props.history}
                        type={this.state.type}
                        onRef={this.onRef}
                        // id={this.props.location.state ? this.props.location.state.id : ''}//指标库id(编辑和新建)
                      />
                    ) : null}
                    {/* 查看详情 */}
                    {!_.isEmpty(this.props.location.state) &&
                    this.props.location.state.type === "detail" ? (
                      <FormDetail
                        gatherDetail={this.props.measurelib.gatherDetail}
                        getMeasureTree={this.props.measurelib.getMeasureTree}
                        history={this.props.history}
                        location={this.props.location}
                      />
                    ) : null}
                    {/* 新建指标集入口 */}
                    {!_.isEmpty(this.props.location.state) &&
                    this.props.location.state.type === "createinit" ? (
                      <ImgDiv>
                        <div style={{ margin: "0px", textAlign: "center" }}>
                          <img
                            src={newGather}
                            alt=""
                            style={{ textAlign: "center" }}
                          />
                        </div>
                        <p
                          style={{
                            margin: "0px",
                            color: "#BCBCBC",
                            textAlign: "center"
                          }}
                        >
                          <span>您可以通过左侧栏</span>
                        </p>
                        <p style={{ margin: "0px", textAlign: "center" }}>
                          {" "}
                          <a
                            onClick={() => {
                              this.props.history.push(
                                "/measurelibApp/addmeasure/",
                                {
                                  id: !_.isEmpty(
                                    this.props.measurelib.measureTree
                                  )
                                    ? +this.props.measurelib.measureTree[0].id
                                    : 0,
                                  type: "create"
                                }
                              );
                            }}
                          >
                            新建指标集
                          </a>
                        </p>
                      </ImgDiv>
                    ) : null}
                  </div>
                </SplitPane>
              ) : null}
            </ContentDiv>
          </div>
        )}
      </div>
    );
  }
}
export default AddMeasure;
