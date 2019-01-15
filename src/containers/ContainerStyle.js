import styled from "styled-components";

export const HeaderDiv = styled("div")`
  background: #f2f2f2;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
  height:40px;
  .ant-btn {
    background-color: #1c8acd;
    width: 86px;
    height: 32px;
    text-shadow: none;
    box-shadow: none;
    &:hover {
      background: #1e7fb7;
    }
  }
`;
export const HeaderLeft = styled("div")`
  font-size: 30px;
  color: #333;
  display: flex;
`;
export const HeaderRight = styled("div")`
  display: flex;
  align-items: center;
  height: 100%;
`;
export const ContentDiv = styled("div")`
    &.relate-content-div {
        height: calc(100% - 40px);
        .relate-split-pane-warp {
            height: calc(100vh - 40px) !important;
            .Pane vertical Pane1 {
                overflow: auto;
            }
        }
    }
    .Resizer {
        background: #333333;
        opacity: .2;
        z-index: 1;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -moz-background-clip: padding;
        -webkit-background-clip: padding;
        background-clip: padding-box;
    }
    
    .Resizer:hover {
        -webkit-transition: all 2s ease;
        transition: all 2s ease;
    }
    
    .Resizer.horizontal {
        height: 11px;
        margin: -5px 0;
        border-top: 5px solid rgba(255, 255, 255, 0);
        border-bottom: 5px solid rgba(255, 255, 255, 0);
        cursor: row-resize;
        width: 100%;
    }
    
    .Resizer.horizontal:hover {
        border-top: 5px solid rgba(0, 0, 0, 0.5);
        border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }
    
    .Resizer.vertical {
        width: 11px;
        margin: 0 -5px;
        border-left: 5px solid rgba(255, 255, 255, 0);
        border-right: 5px solid rgba(255, 255, 255, 0);
        cursor: col-resize;
    }
    
    .Resizer.vertical:hover {
        border-left: 5px solid rgba(0, 0, 0, 0.5);
        border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
    .Resizer.disabled {
        cursor: not-allowed;
    }
    .Resizer.disabled:hover {
        border-color: transparent;
    }
`;

export const LeftTitleBoxWarp = styled('div')`
    &.left-title-box {
        margin: 0px 14px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        box-sizing: border-box;
        .customer-name {
            display: inline-block;
            width: 60px;
        } 
        .ant-select {
            width: 104px !important;
            position: relative;
            top: 4px;
            .ant-select-selection.ant-select-selection--single {
                height: 24px;
                &:active {
                    border-color: #d9d9d9;
                    box-shadow: none;
                }
                &:focus {
                    border-color: #d9d9d9;
                    box-shadow: none;
                }
                &:hover {
                    border-color: #d9d9d9;
                }
                .ant-select-selection__rendered {
                    margin: 0px;
                    height: 22px;
                    .ant-select-selection-selected-value {
                        height: 22px;
                        line-height: 22px;
                        padding: 0px;
                        font-size: 13px;
                        padding-left: 4px;
                    }
                }
            }
        }
        .ant-divider.ant-divider-vertical {
            margin-right: 0px;
            width: 1px;
            height: 23px;
            position: absolute;
            top: 9px;
            right: 22px;
        }
        .iconfont.search {
            position: absolute;
            right: 0px;
            cursor: pointer;
        }
    }
`



