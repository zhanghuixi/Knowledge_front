import { syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";
import RoutingStore from "./models/RoutingStore";

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, RoutingStore);

export default history;
