import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style";
import styled from "styled-components";

const AddnewerTable = styled(Table)`
  .ant-table-placeholder {
    border-bottom: 0px;
  }
  .ant-table-thead > tr, .ant-table-tbody > tr {
      transition: none;
  }
  .ant-table-thead > tr > th {
    background: #fff;
  }
  .ant-table-body {
    tr td,
    tr th {
      padding: 8px 8px;
      font-size: 12px;
    }
    .ant-table-tbody > tr:hover > td.ant-table-column-sort {
      background: #e6f7ff;
    }
    .ant-table-row {
      td:last-child {
        .action-box-1 {
          a, .ant-divider.ant-divider-vertical {
            visibility: hidden;
          }
        }
      }
      &:hover {
        background: #f8f8f8 !important;
        .action-span {
          visibility: initial;
        }
        td:last-child {
          .action-box-1 {
            a, .ant-divider.ant-divider-vertical {
              visibility: initial;
            }
          }
        }
      }
    }
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, 
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
      background: #f8f8f8;
    }
    .ant-table-thead {
      tr th {
        div {
          white-space: nowrap;
          width: 100%;
          color: #6a6a6a;
        }
        background-color: #f2f2f2;
      }
      
    }
    .action-span {
      visibility: hidden;
      a {
        color: #1b9dd6;
      }
    }
    .action-span .action-a {
      color: #1b9dd6;
      text-decoration: none;
      &:first-child {
        margin-right: 10px;
      }
      div {
        margin: 0 10px;
      }
    }
    .ant-input.input::-webkit-input-placeholder,
    .ant-input-number-input::-webkit-input-placeholder {
      font-size: 12px;
    }
  }
`;
// const SimpleTable = props => {
//   //console.log(props[]);
//   const { tableConfig, dataSource, columns } = props;
//   //console.log(dataSource);

//   return (
//     <AddnewerTable
//       showHeader={dataSource && dataSource.length > 0}
//       dataSource={dataSource && dataSource.length > 0 ? dataSource : null}
//       columns={columns}
//     />
//   );
// };
class SimpleTable extends React.Component {
  render() {
    const { tableConfig, dataSource, columns, rowSelection, scroll} = this.props;
    return (
      <AddnewerTable
        className='addnewer-table-warp'
        rowKey="id"
        pagination = {false}
        showHeader={dataSource && dataSource.length > 0}
        dataSource={dataSource && dataSource.length > 0 ? dataSource : null}
        columns={columns}
        rowSelection={rowSelection}//多选框
        scroll={scroll}
      />
    );
  }
}
export default SimpleTable;
