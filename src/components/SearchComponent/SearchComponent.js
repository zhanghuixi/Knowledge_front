import React from "react";
import Input from "antd/lib/input";
import "antd/lib/input/style";
import styled from "styled-components";
import { InputContext } from "./PubSub";

const SearchDiv = styled("div")`
  padding-left: 30px;
  padding-right: 30px;
  width: 300px;
`;
const IconSearch = styled("i")`
  font-size: 22px;
  cursor: pointer;
  &:hover {
    color: #40a9ff;
  }
`;
const IconSearchInput = styled("i")`
  font-size: 22px;
  cursor: pointer;
  &:hover {
    color: #40a9ff;
  }
`;
const SearchInputDiv = styled("div")`
  display: flex;
`;
const SearchInput = styled(Input)`
  .ant-input {
    background-color: rgba(0, 0, 255, 0);
    border: 0px;
    border-bottom: 1px solid #40a9ff;
    letter-spacing: 2px;
    :focus {
      box-shadow: none;
    }
  }
`;
class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.changeViewType = this.changeViewType.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { isInput: false, input: "" };
    this.valueTimeoutID = -1;
  }
  changeViewType() {
    this.setState({ isInput: !this.state.isInput }, () => {
      if (this.state.isInput) {
        this.textInput.current.focus();
      } else {
        this.context.changeInput("");
      }
    });
  }
  onChange(e) {
    let value = e.target.value;
    window.clearTimeout(this.valueTimeoutID);
    this.valueTimeoutID = setTimeout(() => {
      this.setState({ input: value });
      this.context.changeInput(value);
    }, 800);
  }
  render() {
    return (
      <SearchDiv className="search-div">
        {this.state.isInput ? (
          <SearchInputDiv className='SearchInputDiv'>
            <SearchInput
              ref={this.textInput}
              type="text"
              suffix={
                <IconSearchInput
                  className=" iconfont"
                  onClick={this.changeViewType}
                >
                  &#xe684;
                </IconSearchInput>
              }
              onChange={this.onChange}
            />
          </SearchInputDiv>
        ) : (
          <IconSearch className="iconfont" onClick={this.changeViewType}>
            &#xe77a;
          </IconSearch>
        )}
      </SearchDiv>
    );
  }
}
SearchComponent.contextType = InputContext;
export default SearchComponent;
