import React from "react";
import { inject, observer } from "mobx-react";

const WithStore = (WrappedComponent, storeName, arr) => {
  return inject(storeName)(
    observer(props => {
      let con = {};
      Object.keys(arr).map(v => {
        return (con[v] = props[storeName][arr[v]]);
      });
      return <WrappedComponent {...props} {...con} ref={props.elRef} />;
    })
  );
};

export default WithStore;
