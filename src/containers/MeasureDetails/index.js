import React from "react";
import { observer, inject } from "mobx-react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import "antd/lib/row/style";
import "antd/lib/col/style";
import Button from "antd/lib/button";
import "antd/lib/button/style";
import {
  HeaderDiv,
  HeaderLeft,
  HeaderRight,
  ContentDiv
} from "./MeasureDetailsStyle";
// import SearchForHeader from "../../components/SearchForHeader";
import SimpleTable from "../../components/SimpleTable";
import WithStore from "../../components/WithStore";
import MeasureLibHeader from "../../components/MeasureLibHeader";
import Loading from "../../components/Loading";
import ReactTree from "../../components/ReactTree";
import doTree from "./../../utils/dotreedata";

const columnsDiv = (text, record) => {
  return <div>{text}</div>;
};
const MeasureDetails = inject("details", "measureRelate")(
  observer(props => {
    const { history } = props;
    const HocTable = WithStore(SimpleTable, "details", {
      dataSource: "measuredetails"
    });
    // console.log(props);
    if (
      !props.details.detail ||
      props.details.detail.id != props.location.state.id
    ) {
      props.details.loadData(props.location.state.id);
      props.details.getUserList(props.location.state.id);
    }
    const leftDoTreeData = doTree(props.details.leftTreeData, "users");
    const columns = [
      {
        title: "指标集名称",
        dataIndex: "name",
        key: "name",
        render: (text, record) => columnsDiv(text, record)
      },
      {
        title: "使用的数据集",
        dataIndex: "dataset_name",
        key: "dataset_name",
        render: (text, record) => columnsDiv(text, record)
      },
      {
        title: "使用指标",
        dataIndex: "field_name",
        key: "field_name",
        render: (text, record) => columnsDiv(text, record)
      }
    ];

    return (
      <div>
        {!props.details.detail ? (
          <div>
            {" "}
            <Loading />{" "}
          </div>
        ) : (
          <div>
            <HeaderDiv>
              <HeaderLeft>
                <MeasureLibHeader />
                {/* <SearchForHeader /> */}
              </HeaderLeft>
              <HeaderRight>
                <Button
                  className="measure-lib-btn-1"
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    history.push("/measurelibApp/addmeasure", {
                      id: +props.details.detail.id,
                      type: "createinit"
                    });
                  }}
                >
                  前往配置
                </Button>
                <Button
                  className="measure-lib-btn-2"
                  type="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    history.push("/measurelibApp/measurerelate", {
                      folderId: props.location.state.id
                    });
                  }}
                >
                  前往关联
                </Button>
              </HeaderRight>
            </HeaderDiv>
            <ContentDiv
              className="measure-lib-scroll-bar-style"
              style={{ padding: 0, height: "calc(100vh - 41px)" }}
            >
              <div className="content" style={{ paddingTop: 15 }}>
                <Row style={{ lineHeight: "30px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    指标库名称：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    {props.details.detail.name}
                  </Col>
                </Row>
                <Row style={{ lineHeight: "30px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    创建时间：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    {props.details.detail.create_time}
                  </Col>
                </Row>
                <Row style={{ lineHeight: "30px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    创建者：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    {props.details.detail.create_by}
                  </Col>
                </Row>
                <Row style={{ lineHeight: "30px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    最后修改时间 ：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    {props.details.detail.update_time}
                  </Col>
                </Row>
                <Row style={{ lineHeight: "30px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    修改者：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    {props.details.detail.update_by}
                  </Col>
                </Row>
                <Row style={{ lineHeight: "50px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    <span style={{ position: "relative", top: -12 }}>
                      指标集：
                    </span>
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    <ContentDiv style={{ padding: "10px 0px 13px 0px" }}>
                      <HocTable rowKey="id" columns={columns} />
                    </ContentDiv>
                  </Col>
                </Row>
                <Row style={{ lineHeight: "10px" }}>
                  <Col span={2} style={{ textAlign: "right" }}>
                    使用的用户：
                  </Col>
                  <Col span={14} style={{ textAlign: "left" }}>
                    <ReactTree
                      doTreeData={leftDoTreeData}
                      ischeckable={false}
                    />
                  </Col>
                </Row>
              </div>
            </ContentDiv>
          </div>
        )}
      </div>
    );
  })
);

export default MeasureDetails;
