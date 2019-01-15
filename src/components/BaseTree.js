import React from 'react';
import Tree from "antd/lib/tree"
import "antd/lib/tree/style"
import styled from "styled-components"

const BaseTree = React.forwardRef((props,ref) => {
    const AddnewerTree = styled(Tree)``
    const {doTreeData,ischeckable}=props
    const { TreeNode } = Tree;
    const onSelect = (key)=>{
        console.log(key);
        
    } 
    const renderTreeNodes = doTreeData => doTreeData.map((item) => {
        if (item.children){
            return (<TreeNode title={item.name} key={item.id} dataRef={item} isLeaf={ischeckable?false:true} >
                {renderTreeNodes(item.children)}
            </TreeNode>
            )
        }else{
            return (
                <TreeNode title={item.name} key={item.id} isLeaf />
            )
        }
      })
   
      return (
        <AddnewerTree
          ref = {ref}
          checkable = {ischeckable?true:false}
          defaultExpandAll
          onSelect
        >
        
          {renderTreeNodes(doTreeData)}
        </AddnewerTree>
      );
   
}
)
export default BaseTree;
