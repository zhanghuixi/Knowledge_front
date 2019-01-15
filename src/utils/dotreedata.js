import * as _ from "lodash";
import uuid from "uuid";
export default function doTree(tree, column) {
  tree.map((v, i) => {
    let tempChildren = v.children ? v.children : v;
    if (!_.isEmpty(tempChildren) && v.children) {
      doTree(v.children, column);
    }
    if (!_.isEmpty(v[column])) {
      let con = [];
      v[column].map((uv, ui) => {
        con[ui] = uv;
        con[ui]["id"] = "u_" + uv.id;
        //con[ui]["id"] = uv.id;
        con[ui]["keys"] = uuid();
        return con;
      });
      v[column] = [];
      if (v.children) {
        con.unshift(...v.children);
      }
      v["children"] = con;
    }
    return v;
  });
  return tree;
}
