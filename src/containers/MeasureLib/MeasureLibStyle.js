import styled from "styled-components";

export const HeaderDiv = styled("div")`
  background: #f2f2f2;
  height: 70px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderLeft = styled("div")`
  font-size: 30px;
  color: #333;
  display: flex;
  #red {
    color: #55595B;
    font-weight: 300;
  }
  .search-div {
    .SearchInputDiv {
        position: relative;
        top: 6px;
    }
  }
`;
export const HeaderRight = styled("div")`
    &.header-right {
        display: flex;
        align-items: center;
        height: 100%;
    }
`;
export const ContentDiv = styled("div")`
  padding: 30px;
`;
export const Link = styled("a")`
  color: #1b9dd6;
  margin-right: 10px;
  visibility: initial;
  cursor: pointer;
`;
