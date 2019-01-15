import styled from "styled-components";

export const HeaderDiv = styled("div")`
  background: #f2f2f2;
  height: 40px;
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
`;
export const HeaderRight = styled("div")`
  display: flex;
  align-items: center;
  height: 100%;
`;
export const ContentDiv = styled("div")`
  padding: 30px;  
  line-height: 28px;
  overflow: auto;
  .content {
    font-size: 12px;
  }
`;
