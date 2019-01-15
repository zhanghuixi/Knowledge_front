import React from "react";
import Input from "antd/lib/input";
import "antd/lib/input/style";
import styled from "styled-components";
import { InputContext } from "./PubSub";

const SearchInput = styled(Input)`
  &.ant-input {
    width: 100%;
    &:hover {
      border-color: #828282;
    }
    &:focus {
      border-color: #828282;
      box-shadow: none;
    }
  }
`;
class NewRowSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.state = { isInput: false, input: "" };
    this.valueTimeoutID = -1;
  }
  onChange(e) {
    let value = e.target.value;
    window.clearTimeout(this.valueTimeoutID);
    this.valueTimeoutID = setTimeout(() => {
      this.setState({ input: value });
      this.context.changeInput(value);
    }, 800);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.show) {
      this.textInput.current.focus();
    } else if (!this.props.show) {
      this.textInput.current.input.value = "";
      this.context.changeInput("");
    }
  }
  render() {
    return (
      <SearchInput
        ref={this.textInput}
        type="text"
        onChange={this.onChange}
        style={this.props.show ? { display: "block" } : { display: "none" }}
      />
    );
  }
}
NewRowSearchComponent.contextType = InputContext;
export default NewRowSearchComponent;
