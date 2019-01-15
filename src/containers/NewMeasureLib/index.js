import React, { Component } from "react";
import { MeasureLibTree } from "../../components/GenericTree/";
import { PubSub } from "../../components/SearchComponent";
import * as _ from "lodash";
import MeasureLibName from "../../containers/MeasureLib/AddMeasure/MeasureLibName";
import { post } from "../../utils/api";
import ErrHandler from "../../utils/error_handler";
import { observable } from "mobx/lib/mobx";
import doTree from "./../../utils/dotreedata";
import { resData } from "./config";
//let data = doTree(resData, "gather")

let data = [
  {
    id: 0,
    name: "广告活动效果",
    is_folder: true,
    state: {
      expanded: true
    },
    children: [
      {
        id: 2,
        name: "广告活动效果_PV"
      },
      {
        id: 3,
        name: "广告活动效果_UV"
      }
    ]
  },
  {
    id: 1,
    name: "广告触达效果",
    is_folder: true,
    state: {
      expanded: false
    },
    children: [
      {
        id: 6,
        name: "广告触达效果_UV"
      },
      {
        id: 9,
        name: "广告触达效果_PV"
      }
    ]
  },
  {
    id: "z",
    name: "活动预算分配",
    state: {
      deletable: true,
      favorite: false
    }
  },
  {
    id: "778800",
    name: "销量分析",
    state: {
      deletable: true,
      favorite: false
    }
  },
  {
    id: "a",
    name: "其他",
    state: {
      deletable: true,
      favorite: false
    }
  }
];
const NODE_EDITING = {
  id: "8868868868",
  name: "文件夹",
  pid: +data[0].id,
  is_folder: true,
  state: {
    isEdit: { editing: true, type: "folder" }
  }
};
class NewMeasureLib extends Component {
  state = {
    reload: 1
  };
  reload = () => {
    this.setState({ reload: ++this.state.reload });
  };
  addFolder = () => {
    const ident = data.filter(
      v => v.state && v.state.isEdit && v.state.isEdit.editing
    );
    if (ident.length == 0) {
      data.push(NODE_EDITING);
      this.reload();
    }
  };
  eeee = value => {};
  render() {
    const extConfig = {
      createFolder: par => {
        // try {
        //     post("/OrgMeasures/Measures/createFolder", par, false).then(response => {
        //         if (response.code !== 0) {
        //             ErrHandler.GetMeasureListError(response);
        //         } else {
        //         }
        //     }).catch(reson => {
        //         //console.log(reson);
        //     });
        // } catch (error) {
        //     //format error for user warning
        //     ErrHandler.NetWorkError(`Network error, details:${error.message}`);
        // }
        console.log(par);
      },
      deleteFolder: treeNode => {
        _.remove(data, function(node) {
          if (node.id === treeNode.id) {
            console.log(node);
          }
          return node.id === treeNode.id;
        });
        this.reload();
      }
    };
    return (
      <div
        style={{
          height: "600px",
          marginLeft: "30px",
          width: "500px",
          overflow: "auto"
        }}
      >
        <PubSub
          input=""
          changeInput={value => {
            console.log(value);
          }}
        >
          <MeasureLibName addFolder={this.addFolder} />
        </PubSub>
        <MeasureLibTree
          data={data}
          getNodes={nodes => {
            console.log(nodes);
          }}
          extConfig={extConfig}
        />
      </div>
    );
  }
}
export default NewMeasureLib;
