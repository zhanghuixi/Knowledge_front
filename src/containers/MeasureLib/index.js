import React from "react";
import { observer, inject } from "mobx-react";
import Button from "antd/lib/button";
import "antd/lib/button/style";
import Divider from "antd/lib/divider";
import "antd/lib/divider/style";
import {
  HeaderDiv,
  HeaderLeft,
  HeaderRight,
  ContentDiv,
  Link
} from "./MeasureLibStyle";
import { PubSub, SearchComponent } from "../../components/SearchComponent";
import SimpleTable from "../../components/SimpleTable";
import WithStore from "../../components/WithStore";

// import MeasureLibStore from "../../models/domain/MeasureLibStore";

const MeasureLib = inject("search", "measurelib")(
  observer(props => {
    const { history, search } = props;
    const HocTable = WithStore(SimpleTable, "measurelib", {
      dataSource: "measurelibs"
    });
    const columns = [
      {
        title: "指标库名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "包含指标集",
        dataIndex: "gather_num",
        key: "gather_num"
      },
      {
        title: "拥有人数",
        dataIndex: "user_num",
        key: "user_num"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time"
      },
      {
        title: "创建者",
        dataIndex: "create_by",
        key: "create_by"
      },
      {
        title: "最后修改时间",
        dataIndex: "update_time",
        key: "update_time"
      },
      {
        title: "修改者",
        dataIndex: "update_by",
        key: "update_by"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "",
        key: "action",
        render: (text, record) => (
          <div className="action-box-1">
            <Link onClick={() => edit(record.id)}>编辑</Link>
            <Link
              onClick={() => {
                props.history.push("/measurelibApp/measurerelate", {
                  folderId: record.id
                });
              }}
            >
              关联
            </Link>
            <Link onClick={() => showDetail(record.id)}>查看详情</Link>
            <Link onClick={() => copyData(record.id)}>复制</Link>
            <Divider type="vertical" style={{ margin: "0 10px 0 0px" }} />
            <Link onClick={() => delData(record.id)}>删除</Link>
          </div>
        )
      }
    ];
    //查看详情
    const showDetail = id => {
      props.history.push("/measurelibApp/measuredetails", { id: id });
    };
    //删除数据
    const delData = id => {
      if (id) {
        props.measurelib.delData({ id: id, type: 1 });
      }
    };
    //复制指标库
    const copyData = id => {
      if (id) {
        props.measurelib.copyData(id);
      }
    };
    //编辑指标集
    const edit = id => {
      if (id) {
        props.history.push("/measurelibApp/addmeasure", {
          id: id,
          type: "createinit"
        });
        // props.history.push(`/measurelib/addmeasure/${id}`, {id:id})
      }
    };
    const searchData = t => {
      if (t) {
        t.props.measurelib.loadData(search.input);
      }
    };
    const loadData = value => {
      props.measurelib.loadData(value);
    };
    return (
      <div>
        <HeaderDiv>
          <HeaderLeft>
            <span id="red">知识管理</span>
            <PubSub
              input=""
              changeInput={value => {
                loadData(value);
              }}
            >
              <SearchComponent />
            </PubSub>
          </HeaderLeft>
          <HeaderRight className="header-right">
            {/* <Button
              className="measure-lib-btn-1"
              style={{ marginRight: 20 }}
              onClick={() => {
                history.push("/measurelibApp/measurerelate");
              }}
            >
              关联指标库
            </Button> */}
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              className="measure-lib-btn-2"
              onClick={() => {
                history.push("/measurelibApp/addmeasure/", {
                  id: 0,
                  type: "createinit"
                });
              }}
            >
              新建知识库
            </Button>
          </HeaderRight>
        </HeaderDiv>
        <ContentDiv>
          <HocTable columns={columns} elRef={searchData} />
        </ContentDiv>
      </div>
    );
  })
);

export default MeasureLib;
