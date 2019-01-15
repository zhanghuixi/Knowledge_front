import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import "./styles.less";
import "react-virtualized/styles.css";
import "react-virtualized-tree/lib/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";




ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
