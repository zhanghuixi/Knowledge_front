import { observable, action } from "mobx";

export default class GenericTreeStore {
    @observable
    expandedKeys
    @observable
    autoExpandParent
    @observable
    checkedKeys
    @observable
    selectedKeys

    // @observable
    // @action
    // loadData(search) {
    //   try {
    //     post("/OrgMeasures/Measures/getMeasureList", { search }, false).then(
    //       response => {
    //         if (response.code !== 0) {
    //           ErrHandler.GetDataListError(response);
    //         } else {
    //           this.measurelibs = observable.array(response.data);
    //         }
    //       }
    //     );
    //     //this.measurelibs = observable.array(data);
    //   } catch (error) {
    //     //format error for user warning
    //     throw new Error(`Network error, details:${error.message}`);
    //   }
    // }
}