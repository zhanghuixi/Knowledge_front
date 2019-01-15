import React from "react";
import { MeasureLibTree } from "./index";

export const data = [
  {
    id: 0,
    name: "广告活动效果",
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
    id: "a",
    name: "销量分析",
    state: {
      deletable: true,
      favorite: false
    }
  },
  {
    id: "iii",
    name: "其他",
    state: {
      deletable: true,
      favorite: false
    }
  },
  {
    id: "uyuyu",
    name: "文件夹",
    state: {
      isEdit: { editing: true, type: "folder" }
    }
  },
  {
    id: "uiuoi",
    name: "文件夹1",
    state: {
      isEdit: { editing: true, type: "folder" }
    }
  }
];
const NewMeasureLib = () => {
  return (
    <div
      style={{
        height: "400px",
        marginLeft: "100px",
        width: "400px",
        overflow: "auto"
      }}
    >
      <MeasureLibTree
        data={data}
        getNodes={nodes => {
          console.log(nodes);
        }}
      />
    </div>
  );
};

export default NewMeasureLib;
