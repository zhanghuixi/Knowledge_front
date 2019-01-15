import styled from "styled-components";

export const Top = styled("div")`
  margin: 0px 14px;
  height: 40px;
  line-height: 30px;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  box-sizing: border-box;
`;
export const Namep = styled("span")`
  margin: 0px;
  position: relative;
  line-height: 40px;
  font-size: 16px;
`;
export const Ca = styled("div")`
float: right;
margin-right: 5px;
line-height: 40px;
font-size: 12px
display: inline-block;
`;

export const Folder = styled("div")`
  padding-left: 200px;
  padding-right: 20px;
  margin-left:200px
  margin-top:-10px
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableDiv = styled("div")`
  padding-left: 0px;
  padding-right: 20px;
  margin-left: 20px;
  margin-top: -10px;
  height: 255px;
  width: 900px;
  display: inline-block;
  justify-content: space-between;
  align-items: center;
`;

export const Measure = styled("div")`
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Pmeasure = styled("p")`
  font-size: 14px;
  margin-left: 80px;
  display: flex;
`;

export const Measures = styled("div")`
  padding-left: 20px;
  padding-right: 20px;
`;
export const Pmeasures = styled("p")`
  font-size: 12px;
  margin-left: 140px;

  display: inline-block;
`;

export const Gather = styled("div")`
  padding-left: 20px;
  padding-right: 20px;
`;
export const Pgather = styled("p")`
  font-size: 12px;
  margin-left: 140px;
  display: inline-block;
`;
export const Mspan = styled("span")`
  position: relative;
  min-width: 49px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  display: inline-block;
  margin-right: 0px;
  margin-left: 15px;
  &:hover {
    i {
      display: block;
    }
  }
`;

export const HeaderRight = styled("div")`
  display: flex;
  align-items: center;
  height: 100%;
`;
export const ContentDiv = styled("div")`
  .check-name {
    position: relative;
    min-width: 49px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    display: inline-block;
    margin-right: 5px;
    &:hover {
      border: 1px dotted #ddd;
      i {
        display: block;
      }
    }
  }
  padding: 30px;
  line-height: 28px;
`;

export const Di = styled("i")`
  position: absolute;
  display: none;
  cursor: pointer;
  top: -4px;
  right: -6px;
  width: 12px;
  height: 12px;
  background-repeat: no-repeat;
  background-image: url("./close-icon-svg.svg");
  background-size: 100%;
  z-index: 100;
`;
