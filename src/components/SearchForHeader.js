import React from "react";
import styled from "styled-components";
import { observable, action } from "mobx";
import { inject, observer } from "mobx-react";
import Input from "antd/lib/input";
import "antd/lib/input/style";
export class SearchStore {
  @observable
  input = "";
  @observable
  isInput = false;

  @action
  changeViewType() {
    this.isInput = !this.isInput;
    if (!this.isInput) {
      this.input = "";
    }
  }
  @action
  changeInput(input) {
    this.input = input;
  }
}
const SearchForHeader = inject("search")(
  observer(({ search }) => {
    const SearchDiv = styled("div")`
      padding-left: 30px;
      padding-right: 30px;
      width: 300px;
      display: inline-block;
    `;
    const IconSearch = styled("i")`
      font-size: 22px;
      cursor: pointer;
      font-size: 16px;
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
    let valueTimeoutID = -1;
    const onChange = e => {
      let value = e.target.value;
      window.clearTimeout(valueTimeoutID);
      valueTimeoutID = setTimeout(() => {
        search.changeInput(value);
      }, 800);
    };
    return (
      <SearchDiv className='search-div'>
        {search.isInput ? (
          <SearchInputDiv>
            <SearchInput
              ref={input => {
                if (input) input.focus();
              }}
              type="text"
              suffix={
                <IconSearchInput
                  className=" iconfont"
                  onClick={e => search.changeViewType()}
                >
                  &#xe684;
                </IconSearchInput>
              }
              onChange={onChange}
            />
          </SearchInputDiv>
        ) : (
          <IconSearch
            className="iconfont"
            onClick={e => search.changeViewType()}
          >
            &#xe77a;
          </IconSearch>
        )}
      </SearchDiv>
    );
  })
);

export default SearchForHeader;
