import styled from "styled-components";


export const RelateStyle = styled("div")`
    margin-left: 20px;
    height: 100%;
    .searchFolder{
        font-weight: 500;
        font-size: 16px;
        min-width: 230px;
        height: 40px;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        box-sizing: border-box;
        line-height: 40px
        margin-right: 20px;
        .pub-sub-box-1 {
            .search-div {
                position: absolute;
                top: 0px;
                left: 50px;
            }
        }
        .search-div {
            padding-left: 8px;
        }
    }
    .spanButton  {
        float: right;
        margin-right: 26px;
        font-size: 14px;
        color: #1c8acd;
        cursor: pointer;
        &:hover {
            color: #1e7fb7;
        }
    }
    
    .ant-collapse-content-box {
        padding-top: 0px;
    }
    .measure-lib-scroll-bar-style {
        height: calc(100% - 40px);
        overflow: auto;
        padding-right: 20px;
    }
    .loading{
        position: absolute;
        right: 10px;
        top: 17px;
    }
    .ant-collapse-item{
        position:relative;
    }
    .ant-collapse-content-box{
        padding:0!important;
    }
    .panelLoading{
        top:50%;
        left:50%;
        position:absolute;
    }
`;





