import styled from "styled-components";

export const AddnewerTreeBox = styled('div')`
    &.addnewer-tree-box {
        height: calc(100% - 40px);
        padding-top: 10px;
        overflow-x: auto;
        .addnewer-tree {
            font-size: 12px;
            position: relative;
            z-index: 10;
            .ant-tree-node-content-wrapper {
                &:hover {
                    background-color: transparent;
                }
            }
            .ant-tree-node-selected {
                background-color: transparent;
            }
        }
    }
`
