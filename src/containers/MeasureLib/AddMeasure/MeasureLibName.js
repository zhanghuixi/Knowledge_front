import React from "react";
import styled from "styled-components";
import Input from "antd/lib/input";
import "antd/lib/input/style";
import { NewRowSearchComponent } from "../../../components/SearchComponent";

const SearchRowDiv = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 0px 14px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  box-sizing: border-box;
`;
const SearchLeftBoxDiv = styled("div")`
  display: flex;
  font-size: 14px;
  font-weight: bold;
`;
const SearchRightBoxDiv = styled("div")`
  display: flex;
  justify-content: space-between;
`;
const EditIcon = styled("i")`
  cursor: pointer;
  padding-left: 5px;
  &:hover {
    color: #40a9ff;
  }
`;
const CommitIcon = styled("i")`
  cursor: pointer;
  color: #40a9ff;
  padding-left: 5px;
`;
const AddIcon = styled("i")`
  cursor: pointer;
  &:hover {
    color: #40a9ff;
  }
  padding-left: 5px;
`;
const IconSearch = styled("i")`
  cursor: pointer;
  padding-left: 5px;
  &:hover {
    color: #40a9ff;
  }
`;
const SearchInput = styled(Input)`
  &.ant-input {
    margin: 5px 2px;
    width: calc(100% - 5px);
    &:hover {
      border-color: #828282;
    }
    &:focus {
      border-color: #828282;
      box-shadow: none;
    }
  }
`;
const EditInput = styled(Input)`
    &.ant-input {
        width:150px;
        height: 20px;
        letter-spacing: 2px;
        :focus {
        box-shadow: none;
        }
`;

class MeasureLibName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false, isSearch: false };
  }
  render() {
    const {
      addGather,
      addMeasurelib,
      addFolder,
      name,
      changeInput,
      showSearch
    } = this.props;
    return (
      <div className="MeasureLibName">
        <SearchRowDiv>
          <SearchLeftBoxDiv>
            {this.state.isEdit ? (
              <div>
                <EditInput
                  defaultValue={name}
                  onChange={e => {
                    changeInput(e.currentTarget.value);
                  }}
                />
                <CommitIcon
                  className=" iconfont"
                  onClick={() => {
                    this.setState({ isEdit: false });
                    addMeasurelib();
                  }}
                >
                  &#xe76f;
                </CommitIcon>
              </div>
            ) : (
              <div>
                <span>{name}</span>
                <EditIcon
                  className=" iconfont"
                  onClick={() => {
                    this.setState({ isEdit: true });
                  }}
                >
                  &#xe680;
                </EditIcon>
              </div>
            )}
          </SearchLeftBoxDiv>
          <SearchRightBoxDiv>
            <AddIcon className="iconfont 11" onClick={addFolder}>
              &#xe779;
            </AddIcon>
            <AddIcon className="iconfont 22" onClick={addGather}>
              &#xe76c;
            </AddIcon>
            <IconSearch
              className="iconfont"
              onClick={() => {
                this.setState({ isSearch: !this.state.isSearch }, () => {
                  showSearch(this.state.isSearch);
                });
                //showSearch(this.state.isSearch);
              }}
            >
              &#xe77a;
            </IconSearch>
          </SearchRightBoxDiv>
        </SearchRowDiv>
        <div style={{ width: "calc(100% - 28px)", margin: "5px 14px" }}>
          <NewRowSearchComponent />
        </div>
      </div>
    );
  }
}
export default MeasureLibName;
