import { RouterStore } from "mobx-react-router";
import { SearchStore } from "../components/SearchForHeader";

class RootStore {
  static type = {
    GENERIC_SEARCH_STORE: "searchStore",
    ROUTER_STORE: "routerStore"
  };

  constructor() {
    this.searchStore = new SearchStore();
    this.routerStore = new RouterStore();
  }

  getStores = () => ({
    [RootStore.type.GENERIC_SEARCH_STORE]: this.searchStore,
    [RootStore.type.ROUTER_STORE]: this.routerStore
  });
}

export default RootStore;
