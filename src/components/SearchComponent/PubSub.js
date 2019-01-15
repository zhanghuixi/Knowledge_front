import React from "react";

export const InputContext = React.createContext({
  input: "",
  changeInput: input => {}
});

export default class PubSub extends React.Component {
  constructor(props) {
    super(props);
    this.value = { input: props.input, changeInput: props.changeInput };
  }
  render() {
    return (
      <InputContext.Provider value={this.value}>
        {this.props.children}
      </InputContext.Provider>
    );
  }
}
