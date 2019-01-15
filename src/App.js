import React from "react";
import { Provider } from "mobx-react";
import { Router } from "react-router";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import MainRoute from "./routes/MainRoute";
import history from "./history";
import RoutingStore from "./models/RoutingStore";
import { SearchStore } from "./components/SearchForHeader";
import MeasureLibStore from "./models/domain/MeasureLibStore";
import DetailsStore from "./models/domain/DetailsStore";
// import MeasureRelateStore from "./models/domain/MeasureRelateStore";
import GenericTreeStore from "./models/domain/GenericTreeStore";
//import RootStore from "./models/RootStore";
import { setConfiguration } from "./utils/configuration";
setConfiguration(`API_ROOT`, `/api`);

const stores = {
  routing: RoutingStore,
  search: new SearchStore(),
  measurelib: new MeasureLibStore(),
  details: new DetailsStore(),
  // measureRelate: new MeasureRelateStore(),
  generictree: new GenericTreeStore()
};
//const rootStore = new RootStore();
const App = () => {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <AuthorizedRoute path="/measurelibApp" component={MainRoute} />
      </Router>
    </Provider>
  );
};
export default App;
