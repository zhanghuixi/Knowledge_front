import Input from "antd/lib/input"
import React, { Component } from 'react';
import styled from "styled-components";
import {InputContext} from "../../components/SearchComponent"
import "antd/lib/input/style";

export const SearchInputWarp = styled(Input)`
    &.measurerelate-left-search-input {
        margin: 5px 14px;
        width: calc(100% - 28px);
        &:hover {
            border-color: #828282;
        }
        &:focus {
            border-color: #828282;
            box-shadow: none;
        }
    }
`

class SearchInput extends Component {
    constructor(props) {
        super(props)
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
        if(!prevProps.setdisplay){
           // this.textInput.current.value=""
        this.textInput.current.focus()
        }
        else if(!this.props.setdisplay){
            console.log(this.textInput.current);
            
            // this.textInput.current.input.value=""
            this.context.changeInput("");
        }
    }
    componentDidMount() {
        this.textInput.current.focus()
    }
    render() {
        return (
            <SearchInputWarp className="measurerelate-left-search-input" style={!this.props.setdisplay?{display: 'none'}:{display: 'block'}}
                ref={this.textInput}
                type="text"
                onChange={this.onChange}
            >
            </SearchInputWarp>
        );
    }
} 
SearchInput.contextType = InputContext;
export default SearchInput;