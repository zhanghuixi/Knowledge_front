import { observable, action, computed, toJS } from "mobx";
import { post } from "../../utils/api";
import ErrHandler from "../../utils/error_handler";
import message from "antd/lib/message";
import "antd/lib/message/style";
import Modal from "antd/lib/modal";
import "antd/lib/modal/style";
import doTree from "../../utils/dotreedata";
import * as _ from "lodash";

const confirm = Modal.confirm;
export default class MeasureLibStore {
  @observable
  measurelibs = [];
  @observable
  datasetList = [];
  @observable
  datasetMeasure = null;
  @observable
  measureTree = [];
  @observable
  gatherDetail = null;
  @observable
  postData = null;
  @action
  loadData(search) {
    try {
      post("/OrgMeasures/Measures/getMeasureList", { search }, false)
        .then(response => {
          if (response.code !== 0) {
            ErrHandler.GetMeasureListError(response);
          } else {
            response.data.map(
              i => (i.status ? (i.status = "已关联") : (i.status = "未关联"))
            );
            this.measurelibs = observable.array(response.data);
          }
        })
        .catch(reson => {
          //console.log(reson);
        });
    } catch (error) {
      //format error for user warning
      ErrHandler.NetWorkError(`Network error, details:${error.message}`);
    }
  }
  //删除指标库
  @action
  delData(data) {
    let that = this;
    try {
      confirm({
        title: "Are you sure?",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        maskClosable: true,
        onOk() {
          post(
            "/OrgMeasures/Measures/del",
            { id: data.id, type: data.type },
            false
          ).then(response => {
            if (response.code !== 0) {
              message.error(response.msg);
              ErrHandler.GetMeasureListError(response);
            } else {
              message.success(response.msg);
              if (data.type === 1) {
                that.loadData();
              }
              if (data.type === 2 || data.type === 3) {
                that.getMeasureTree(data.folder_id);
              }
            }
          });
        }
      });
    } catch (error) {
      //format error for user warning
      ErrHandler.NetWorkError(`Network error, details:${error.message}`);
    }
  }
  //复制数据
  @action
  copyData(id) {
    try {
      post("/OrgMeasures/Measures/copyMeasure", { id: id }, false).then(
        response => {
          if (response.code !== 0) {
            message.error(response.msg);
            ErrHandler.GetDataListError(response);
          } else {
            message.success(response.msg);
            this.loadData();
          }
        }
      );
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  //获取dataset列表
  @action
  getDatasetList() {
    try {
      post("/OrgMeasures/Measures/getDateSetList", false).then(response => {
        if (response.code !== 0) {
          ErrHandler.GetMeasureListError(response);
        } else {
          this.datasetList = observable.array(response.data);
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  //获取dataset指标
  @action
  getDateSetMeasure(id) {
    this.datasetMeasure = null;
    try {
      post("/OrgMeasures/Measures/getDateSetMeasure", { id: id }, false).then(
        response => {
          if (response.code !== 0) {
            ErrHandler.GetMeasureListError(response);
          } else {
            this.datasetMeasure = observable.array(response.data.data);
          }
        }
      );
      //this.measurelibs = observable.array(data);
    } catch (error) {
      //format error for user warning
      ErrHandler.NetWorkError(`Network error, details:${error.message}`);
    }
  }
  //获取指标库层级关系
  @action.bound
  getMeasureTree(id, type) {
    if (type === "createinit") {
      this.measureTree = [];
    }
    try {
      post("/OrgMeasures/Measures/getMeasureTree", { id: id }, false).then(
        response => {
          if (response.code !== 0) {
            message.error(response.msg);
            ErrHandler.GetMeasureListError(response);
          } else {
            this.measureTree = observable.array(response.data);
          }
        }
      );
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  @action
  createGather(data, type) {
    try {
      post("/OrgMeasures/Measures/createGather", data, false).then(response => {
        if (response.code !== 0) {
          message.error(response.msg);
          ErrHandler.GetMeasureListError(response);
        } else {
          message.success(response.msg); //返回新加参数
          this.getMeasureTree(data.id); //设置方法加getMeasureTree.bound
          console.log(type);
          //type=1点击保存指标库 type =2点击保存
          if (type === 2) {
            this.history.push("/measurelibApp/addmeasure", {
              id: data.id,
              gather_id: response.data,
              type: "detail"
            });
          }
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  //编辑指标集
  @action
  editGather(data, type) {
    try {
      post("/OrgMeasures/Measures/editGather", data, false).then(response => {
        if (response.code !== 0) {
          message.error(response.msg);
          ErrHandler.GetMeasureListError(response);
        } else {
          message.success(response.msg);
          if (type === 2) {
            this.history.push("/measurelibApp/addmeasure", {
              id: data.id,
              gather_id: data.gather_id,
              type: "detail"
            });
          }
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  //获取指标集详情
  @action
  getGatherDetail(id) {
    try {
      post("/OrgMeasures/Measures/getGatherDetail", { id: id }, false).then(
        response => {
          if (response.code !== 0) {
            message.error(response.msg);
            ErrHandler.GetMeasureListError(response);
          } else {
            this.gatherDetail = response.data;
          }
        }
      );
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }
  @computed
  get AfterFormatTreeData() {
    if (!this.measureTree) {
      return [];
    } else {
      //console.log(this.measureTree);
      let treeData = _.cloneDeep(this.measureTree);
      treeData = doTree(treeData, "gather");
      //console.log(treeData);
      return treeData;
    }
  }
  @action
  insertTreeNode(treeNode) {
    if (this.measureTree) {
      this.measureTree[0].children.push(treeNode);
    }
  }
  //创建指标库文件夹
  @action
  addFolder(data) {
    try {
      post("/OrgMeasures/Measures/createFolder", data, false).then(response => {
        if (response.code !== 0) {
          message.error(response.msg);
          ErrHandler.GetMeasureListError(response);
        } else {
          message.success(response.msg);
          if (data.type === "addFolder") {
            this.getMeasureTree(data.pid);
          } else {
            this.getMeasureTree(response.data.id);
          }
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  //编辑指标库文件夹
  @action
  editFolder(data) {
    try {
      post("/OrgMeasures/Measures/editFolder", data, false).then(response => {
        if (response.code !== 0) {
          message.error(response.msg);
          ErrHandler.GetMeasureListError(response);
        } else {
          message.success(response.msg);
          if (data.pid != 0) {
            this.getMeasureTree(data.folder_id);
          } else {
            this.getMeasureTree(data.id);
          }
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }
  //移动文件夹
  @action
  moveFolder(data) {
    try {
      post("/OrgMeasures/Measures/moveGather", data, false).then(response => {
        if (response.code !== 0) {
          message.error(response.msg);
          ErrHandler.GetMeasureListError(response);
        } else {
          message.success(response.msg);
          this.getMeasureTree(data.folder_id);
          return true;
        }
      });
    } catch (error) {
      //format error for user warning
      throw new Error(`Network error, details:${error.message}`);
    }
  }

  @action
  removeTreeNode(treeNode) {
    if (this.measureTree) {
      _.remove(this.measureTree[0].children, function(node) {
        return node.id === treeNode.id;
      });
    }
  }  
}
