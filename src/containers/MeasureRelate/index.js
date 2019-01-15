import React from "react";
import ReactTree from "../../components/ReactTree";
import Button from "antd/lib/button";
import "antd/lib/button/style";
import Divider from "antd/lib/divider";
import "antd/lib/divider/style";
import Modal from "antd/lib/modal";
import "antd/lib/modal/style";
import SplitPane from "react-split-pane";
import {
  HeaderDiv,
  HeaderLeft,
  HeaderRight,
  ContentDiv,
  LeftTitleBoxWarp
} from "./../ContainerStyle";
import { RelateStyle, SearchInputWarp } from "./MeasureRelateStyle";
import MeasureLibHeader from "../../components/MeasureLibHeader";
import { observer, inject } from "mobx-react";
import CollapseRadio from "./CollapseRadio";
import SearchForHeader from "../../components/SearchForHeader";

import Loading from "../../components/Loading";
import { Confirm } from "../../components/PromptDialog";
import Select from "antd/lib/select";
import "antd/lib/select/style";
import * as _ from "lodash";

import doTree from "./../../utils/dotreedata";
import cycleTree from "./../../utils/cycletree";
import { PubSub, SearchComponent } from "../../components/SearchComponent";
import { Mask } from "../../components/SplitPaneMask";
import SearchInput from "./SearchInput";
const Option = Select.Option;

@inject("search", "measureRelate")
@observer
class MeasureRelate extends React.Component {
  constructor(props) {
    super(props);
    this.leftRefTree = React.createRef();
    this.checkRedio = React.createRef();
    this.selectList = React.createRef();
  }

  state = {
    isdisplay: 0
  };

  //保存
  onClick = () => {
    let relate = JSON.parse(
      JSON.stringify(this.props.measureRelate.relateData)
    );
    let ischeck = !_.isEmpty(relate) ? false : true;
    this.bindingOnClick(ischeck);
    // console.log(this.props.measureRelate.relateData);
    if (!_.isEmpty(relate)) {
      this.props.measureRelate.saverelate(Object.values(relate));
      this.props.history.push("/measurelibApp");
    }
  };

  //绑定
  bindingOnClick = (ischeck = true) => {
    if (!this.leftRefTree.current.tree) return;
    let cf = this.checkRedio.current.props.checkFolder;
    let ck = this.leftRefTree.current.tree.state.checkedKeys;
    let readyUserData = this.props.measureRelate.leftTreeUserFolderData;
    if (this.props.location.state != undefined) {
      cf = this.props.location.state.folderId;
    }
    if (ischeck) {
      if (!cf) {
        Confirm({
          title: (
            <div className="icon-Exclamation_mark-box">
              <i className="iconfont">&#xe676;</i>
            </div>
          ),
          content: "请选择指标库后再次操作"
        });
        return;
      }
      if (ck.length == 0) {
        Confirm({
          title: (
            <div className="icon-Exclamation_mark-box">
              <i className="iconfont">&#xe676;</i>
            </div>
          ),
          content: "请选择用户后再次操作"
        });
        return;
      }
    }

    //处理切换指标库提示信息
    let relate = JSON.parse(
      JSON.stringify(this.props.measureRelate.relateData)
    );
    let userMes = [];
    let userMesNum = 0; //初始化变量为下面赋值时从0开始

    for (let ui = 0; ui < ck.length; ui++) {
      let b = ck[ui].split("_");
      if (b[0] == "u") {
        if (
          readyUserData[ck[ui]].folder_id != cf &&
          readyUserData[ck[ui]].folder_id != 0
        ) {
          userMes[userMesNum] = readyUserData[ck[ui]].user_name;
          userMesNum++;
        }
        relate[ck[ui]] = { user_id: parseInt(b[1]), folder_id: parseInt(cf) };
      }
    }

    if (userMes.length > 0) {
      //查找变动的用户
      let userMessage = (
        <div>
          当前用户：
          {userMes.join(",")} 拥有其他指标库，确认切换指标库吗？
        </div>
      );
      Confirm({
        title: (
          <div className="icon-Exclamation_mark-box">
            <i className="iconfont">&#xe676;</i>
          </div>
        ),
        content: userMessage,
        className:
          "measure-relate-modal-confirm measure-relate-modal-confirm-show-cancel-btn",
        onOk: () => {
          this.bingingRelading(ck, relate, cf);
        },
        onCancel: () => {}
      });
    } else {
      this.bingingRelading(ck, relate, cf);
    }
  };
  bingingRelading = (ck, relate, cf) => {
    //刷新左侧树
    let freshCacheTree = {};
    let folderNameById = [];
    let folderData = this.props.measureRelate.data;
    for (let index = 0; index < folderData.length; index++) {
      folderNameById[folderData[index]["id"]] = folderData[index]["name"];
    }
    for (let userindex = 0; userindex < ck.length; userindex++) {
      let b = ck[userindex].split("_");
      if (b[0] == "u") {
        freshCacheTree[ck[userindex]] = folderNameById[cf];
      }
    }
    let newTreeData = cycleTree(
      this.props.measureRelate.leftTreeData,
      freshCacheTree
    );
    this.props.measureRelate.setRelateData(relate);
    //临时刷新左侧树
    this.props.measureRelate.setleftTreeData(newTreeData);
  };
  //指标库下拉选择
  handleChange = value => {
    this.props.measureRelate.getUserList(parseInt(value));
  };

  //指标库筛选
  OptionData = listData =>
    this.props.measureRelate.data.map(item => {
      return (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      );
    });

  searchData = t => {
    if (t) {
      // t.props.measureRelate.loadData(search.input);
    }
  };
  searchHandle = () => {
    /*
    *   搜索框显示隐藏
    * */
    const ibElm = document.querySelector(".measurerelate-left-search-box");
    const dis = ibElm.style.display;
    ibElm.style.display = dis == "block" ? "none" : "block";
    /*
    *   调整tree的高度
    * */
    const h = document
      .querySelector(".measurerelate-left-search-box")
      .getBoundingClientRect().height;
    document.querySelector(
      ".addnewer-tree-box.measure-lib-scroll-bar-style"
    ).style.height = "calc(100% - 40px - " + h + "px)";
  };
  //框架加载完城后载入
  componentDidMount() {
    this.props.measureRelate.getUserList();
    if (this.props.location.state !== undefined) {
      this.props.measureRelate.loadData("", this.props.location.state.folderId);
      this.props.measureRelate.getCollapseRadioTreeList(
        this.props.location.state.folderId
      );
    } else {
      this.props.measureRelate.loadDataSynchronization("");
    }
  }
  render() {
    // console.log(this.props);

    if (!this.props.measureRelate.leftTreeData) {
      return <Loading />;
    } else {
      this.leftDoTreeData = doTree(
        this.props.measureRelate.leftTreeData,
        "users"
      );

      return (
        <div style={{ height: "100%" }}>
          <HeaderDiv>
            <HeaderLeft>
              <MeasureLibHeader />
              {/* <SearchForHeader /> */}
            </HeaderLeft>
            <HeaderRight>
              <Button type="primary" onClick={this.onClick}>
                保存
              </Button>
            </HeaderRight>
          </HeaderDiv>
          <ContentDiv className="relate-content-div">
            <SplitPane
              className="relate-split-pane-warp"
              split="vertical"
              minSize={300}
              defaultSize={300}
              onDragStarted={() =>
                Mask({
                  cls: [
                    ".relate-split-pane-left-warp",
                    ".relate-split-pane-right-warp"
                  ],
                  show: true
                })
              }
              onDragFinished={() =>
                Mask({
                  cls: [
                    ".relate-split-pane-left-warp",
                    ".relate-split-pane-right-warp"
                  ],
                  show: false
                })
              }
            >
              <div
                className="relate-split-pane-left-warp"
                style={{ height: "100%" }}
              >
                <LeftTitleBoxWarp className="left-title-box">
                  <span className="customer-name">用户</span>
                  <Select
                    defaultValue="指标库筛选"
                    style={{ width: 120 }}
                    onChange={this.handleChange}
                    ref={this.selectList}
                  >
                    <Option value={0}>指标库筛选</Option>
                    {this.OptionData(this.props.measureRelate.data)}
                  </Select>
                  <Divider type="vertical" />
                  <i
                    className="iconfont search"
                    onClick={() => {
                      this.setState(
                        { isdisplay: !this.state.isdisplay },
                        () => {
                          const h = this.state.isdisplay ? 42 : 0;
                          document.querySelector(
                            ".addnewer-tree-box.measure-lib-scroll-bar-style"
                          ).style.height = "calc(100% - 40px - " + h + "px)";
                        }
                      );
                    }}
                  >
                    &#xe77a;
                  </i>
                  {/*<SearchForHeader />*/}
                </LeftTitleBoxWarp>
                <PubSub
                  input=""
                  changeInput={value => {
                    let tempdatasetFolderId =
                      this.selectList.current.rcSelect.state.value[0] || "";
                    let datasetFolderId =
                      tempdatasetFolderId == "指标库筛选"
                        ? 0
                        : tempdatasetFolderId == null
                          ? 0
                          : tempdatasetFolderId;
                    this.props.measureRelate.getUserList(
                      parseInt(datasetFolderId),
                      value
                    );
                  }}
                >
                  <SearchInput
                    className="measurerelate-left-search-input"
                    setdisplay={this.state.isdisplay}
                  />
                </PubSub>
                {/* <SearchInputWarp className='measurerelate-left-search-input' style={{display: 'none'}} /> */}
                <ReactTree
                  ref={this.leftRefTree}
                  doTreeData={this.leftDoTreeData}
                  ischeckable={true}
                >
                  <div style={{ marginLeft: 15 }}>组织结构</div>
                </ReactTree>
              </div>
              <div
                className="relate-split-pane-right-warp"
                style={{ height: "100%" }}
              >
                <RelateStyle>
                  <div className="searchFolder">
                    <span>指标库</span>

                    {this.props.location.state === undefined ? (
                      <span className="pub-sub-box-1">
                        <PubSub
                          input=""
                          changeInput={value => {
                            this.props.measureRelate.loadData(value);
                          }}
                        >
                          <SearchComponent />
                        </PubSub>
                      </span>
                    ) : null}

                    <span className="spanButton" onClick={this.bindingOnClick}>
                      绑定
                    </span>
                  </div>
                  <div style={{ clear: "both" }} />
                  <div className="measure-lib-scroll-bar-style">
                    <CollapseRadio
                      ref={this.checkRedio}
                      measureRelate={this.props}
                      defaultRedio={this.props.location.state}
                    />
                  </div>
                </RelateStyle>
              </div>
            </SplitPane>
          </ContentDiv>
        </div>
      );
    }
  }
}

export default MeasureRelate;
