import React from "react";
import Breadcrumb from "antd/lib/breadcrumb";
import "antd/lib/breadcrumb/style";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
//import { Link } from "react-router-dom";
const MeasureLibHeader = inject("routing")(
  observer(props => {
    const AddnewerBreadcrumb = styled(Breadcrumb)`
      .ant-breadcrumb-link a {
        text-decoration: none; //去掉横杠
      }
    `;
    const breadcrumbNameMap = {
      "/measurelibApp": "指标库",
      "/measurelibApp/measuredetails": "指标库详情",
      "/measurelibApp/measurerelate": "指标库关联",
      "/measurelibApp/addmeasure": "指标配置"
    };
    const { routing } = props;
    const go = url => {
      //console.log(url);
      routing.push(
        url,
        url === "/measurelibApp/addmeasure"
          ? {
              id: props.id,
              type: "createinit"
            }
          : {}
      );
    };

    const pathSnippets = routing.history.location.pathname
      .split("/")
      .filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <a
            style={
              pathSnippets.length !== index + 1
                ? { color: "#1C8ACD", fontSize: "16px" }
                : { color: "#55595B", fontSize: "14px" }
            }
            onClick={() => go(url)}
          >
            {breadcrumbNameMap[url]}
          </a>
        </Breadcrumb.Item>
      );
    });
    return (
      <AddnewerBreadcrumb separator=">">
        {extraBreadcrumbItems}
      </AddnewerBreadcrumb>
    );
  })
);
export default MeasureLibHeader;
