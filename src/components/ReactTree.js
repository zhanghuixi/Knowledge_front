import React from 'react';
import Tag  from 'antd/lib/tag';
import "antd/lib/tag/style"
import Tree from "antd/lib/tree"
import "antd/lib/tree/style"
import { AddnewerTreeBox } from './ReactTree.style'
import * as _ from 'lodash'
import { HoverBox }from './ActiveBox'
const TreeNode = Tree.TreeNode;
const ReactTree = React.forwardRef((props, ref) => {

    const { doTreeData, ischeckable } = props
    const renderTreeNodes = doTreeData => doTreeData.map((item) => {

        if (item.children) {
            return (<TreeNode title={item.name} key={item.id} dataRef={item} isLeaf={ischeckable ? false : true} >
                {renderTreeNodes(item.children)}
            </TreeNode>
            )
        } else {
            const disabled=item.users && item.users.length == 0 ? true : false
            if (item.field_id) {//处理指标集树
                //判断字段是否大于5个
                let arrField = []
                let fieldNum =6
                if (item.field_id.length > fieldNum) {
                    for (var i = 0; i < fieldNum; i++) {
                        arrField[i] = item.field_id[i]
                    }                   
                    arrField[fieldNum] = {
                        'field_name':'...',
                        'field_type':item.field_id[fieldNum].field_type
                    }                          
                } else {
                    arrField = item.field_id
                }
                               
                let tapData = arrField.map((gv, gi) => {
                    return (
                        <Tag key={gi} style={gv.field_type != 1 ? { background: "#d7f4ac" } : { background: "#e5eff1" }}  >{gv.field_name}</Tag>
                    )
                })

                return (
                    <TreeNode disabled={disabled} title={<div>{item.name} {tapData} </div>} key={item.id} isLeaf />
                )
            } else {  //处理用户树
                return (
                    <TreeNode disabled={disabled} title={ischeckable ? (item.folder?item.name + '(' + item.folder + ')':item.name) : item.name} key={item.id} isLeaf />
                )
            }
        }
    })
    

    if (!_.isEmpty(doTreeData)&&(_.isArray(doTreeData)&&doTreeData.length > 0)) {
        return (
            <AddnewerTreeBox
                onScroll = {(e) => {
                    const elm = document.querySelector('.addnewer-tree-hover-active-box')
                    if (elm && elm.style.top.indexOf('-') == -1) {
                        document.querySelector('.addnewer-tree-hover-active-box').style.top = '-1000px'
                    }
                }}
                className="addnewer-tree-box measure-lib-scroll-bar-style">
                {props.children ? props.children : null}
                <Tree
                    className='addnewer-tree'
                    ref={ref}
                    checkable={ischeckable ? true : false}
                    defaultExpandAll
                    onMouseEnter={({event,node}) => {
                        HoverBox({
                            e: event,
                            cls: '.addnewer-tree-hover-active-box',
                            widthCls: '.relate-split-pane-warp .Pane.vertical.Pane1',
                            isDisabled: node.isDisabled()
                        })
                    }}
                    onMouseLeave={({event,node}) => {
                        HoverBox({
                            cls: '.addnewer-tree-hover-active-box'
                        })
                    }}
                >
                    {renderTreeNodes(doTreeData)}
                </Tree>
            </AddnewerTreeBox>
        );
    } else {
        return (
            <div style={{textAlign: 'center', marginTop: 30}}>暂无数据</div>
        )
    }

}
)
export default ReactTree;
