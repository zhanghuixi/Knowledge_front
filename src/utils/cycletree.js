import * as _ from 'lodash'
export default function doTree(tree,column){
    tree.map((v,i) => {
        let tempChildren = v.children?v.children:[]
        if(!_.isEmpty(tempChildren)) { 
            doTree(v.children,column)
        }
        if (!_.isEmpty(column[v.id])){
            v.folder = column[v.id]           
        }  
        return v
        });
    return tree 
}

