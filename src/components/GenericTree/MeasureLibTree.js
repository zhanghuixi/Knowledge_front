import React, { Component } from "react";
import Tree, {
  selectors,
  FilteringContainer,
  renderers
} from "react-virtualized-tree";
import styled from "styled-components";
import classNames from "classnames";
import Tooltip from "antd/lib/tooltip";
import "antd/lib/tooltip/style";
import "./MeasureLibTree.less";
import Input from "antd/lib/input";
import "antd/lib/input/style";

const IconEdit = styled("i")`
  cursor: pointer;
  padding-left: 10px;
  font-size: 12px;

  &:hover {
    color: #40a9ff;
  }
`;

const EDIT = 4;
const FolderRenderer = ({
  onChange,
  node,
  children,
  iconsClassNameMap = {
    expanded: "measuretree-arrow-down",
    collapsed: "measuretree-arrow-right",
    lastChild: ""
  },
  extConfig
}) => {
  const { isExpanded } = selectors.getNodeRenderOptions(node);
  const { is_folder, state: { isEdit } = {} } = node;
  const className = classNames({
    [iconsClassNameMap.expanded]: is_folder && isExpanded,
    [iconsClassNameMap.collapsed]: is_folder && !isExpanded,
    [iconsClassNameMap.lastChild]: !is_folder
  });
  const className1 = classNames({
    "measuretree-folder-open": is_folder && isExpanded,
    "measuretree-folder":
      (is_folder && !isExpanded) || (isEdit && isEdit.type === "folder"),
    "measuretree-leaf":
      (!is_folder && !isEdit) || (isEdit && isEdit.type === "file")
  });
  const handleChange = () => {
    return onChange(selectors.updateNode(node, { expanded: !isExpanded }));
  };
  let name = node.name;
  const onVisibleChange = v => {
    const elm = document.getElementById(node.id);
    const paeElm = elm.parentElement;
    const styles = paeElm
      .getAttribute("style")
      .split(";")
      .filter(v => v.indexOf("background-color:") === -1)
      .join(";");
    if (v) {
      paeElm.style.backgroundColor = "#f2f2f2";
      // elm.querySelector('.more-icon').style.visibility = "unset";
    } else {
      paeElm.setAttribute("style", styles);
      // elm.querySelector('.more-icon').style.visibility = "hidden";
    }
  };
  return (
    <span
      onDoubleClick={handleChange}
      onClick={() => {
        if (extConfig && typeof extConfig.getMeasureDetail == "function") {
          if (!node.is_folder) {
            extConfig.getMeasureDetail(node);
          }
        }
      }}
      className="measuretree-node"
      id={node.id}
      style={{
        paddingLeft: node.deepness * 30 + "px"
        // width: `calc(100% - ${node.deepness * 30}px)`
      }}
    >
      {isEdit && isEdit.editing ? (
        <div style={{ display: "inline-block" }}>
          <i className={className1} />
          <Input
            defaultValue={node.name}
            onChange={e => {
              name = e.target.value;
            }}
            style={{ width: 60, height: 20, fontSize: 12 }}
          />
          <IconEdit
            className="qq iconfont"
            onClick={() => {
              if (extConfig && typeof extConfig.createFolder == "function") {
                extConfig.createFolder({ name: name, pid: node.pid });
              }
              onChange({
                node: {
                  ...node,
                  name: name,
                  state: {
                    ...(node.state || {}),
                    isEdit: { editing: false, type: node.state.isEdit.type }
                  }
                },
                type: EDIT
              });
            }}
          >
            &#xe76f;
          </IconEdit>
          <IconEdit
            className="qqq iconfont"
            onClick={() => {
              if (extConfig && typeof extConfig.deleteFolder == "function") {
                extConfig.deleteFolder({ name: node.name, id: node.id });
              }
              //onChange(selectors.deleteNode(node));
            }}
          >
            &#xe768;
          </IconEdit>
          {children}
        </div>
      ) : (
        <div style={{ display: "inline-block" }}>
          <i onClick={handleChange} className={"arrow-icon-i " + className} />
          <i onClick={handleChange} className={"folder-icon-i " + className1} />
          {children}
          {is_folder ? (
            <span className="measuretree-node-more">
              <Tooltip
                overlayClassName="measuretree-tooltip"
                placement="bottom"
                onVisibleChange={v => onVisibleChange(v)}
                title={
                  <div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        extConfig.changeFolderName(node);
                      }}
                    >
                      重命名
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        extConfig.moveGather(node);
                      }}
                    >
                      移动
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.stopPropagation();
                        if (
                          extConfig &&
                          typeof extConfig.deleteMeasure == "function"
                        ) {
                          extConfig.deleteMeasure(node);
                        }
                        //onChange(selectors.deleteNode(node));
                      }}
                    >
                      删除
                    </div>
                  </div>
                }
              >
                <span>
                  <i className="more-icon iconfont">&#xe60f;</i>
                </span>
              </Tooltip>
            </span>
          ) : (
            <span className="measuretree-node-more">
              <Tooltip
                overlayClassName="measuretree-tooltip"
                placement="bottom"
                onVisibleChange={v => onVisibleChange(v)}
                title={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                      e.stopPropagation();
                      if (
                        extConfig &&
                        typeof extConfig.deleteMeasure == "function"
                      ) {
                        extConfig.deleteMeasure(node);
                      }
                      //onChange(selectors.deleteNode(node));
                    }}
                  >
                    删除
                  </div>
                }
              >
                <span>
                  <i className="more-icon iconfont">&#xe60f;</i>
                </span>
              </Tooltip>
            </span>
          )}
        </div>
      )}
    </span>
  );
};
const EXPANDED = "EXPANDED";
class MeasureLibTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.data
      //groupsEnabled: true,
      //selectedGroup: EXPANDED
    };
  }
  handleChange = nodes => {
    this.setState({ nodes }, () => {
      if (this.props.getNodes) {
        this.props.getNodes(nodes);
      }
    });
  };
  handleSelectedGroupChange = selectedGroup => {
    console.log(selectedGroup);
    this.setState({ selectedGroup });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        nodes: nextProps.data
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let el = document.getElementsByClassName("tree-lookup-input")[0];
    if (el) {
      el.firstChild.placeholder = "";
      el.firstChild.focus();
    }
  }
  isHasSameName(name, data) {
    let index = data.findIndex(match => {
      console.log(match);
      if (typeof match.children !== "undefined" && match.children) {
        return this.isHasSameName(name, match.children);
      } else {
        return match.name === name;
      }
    });
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
  editNodes = (nodes, edited) =>
    nodes.map(n => ({
      ...n,
      children: n.children ? this.editNodes(n.children, edited) : [],
      state: {
        ...n.state,
        edited
      }
    }));

  nodeEditHandler = (nodes, updatedNode) =>
    nodes.map(node => {
      if (node.id === updatedNode.id) {
        if (this.props.originalTreeData) {
          let treeData = this.props.originalTreeData;
          if (this.isHasSameName(updatedNode.name, treeData[0].children)) {
            return {
              ...node,
              children: node.children
            };
          } else {
            return {
              ...updatedNode,
              children: node.children
                ? this.editNodes(node.children, updatedNode.state.selected)
                : []
            };
          }
        }
      }

      if (node.children) {
        return {
          ...node,
          children: this.nodeEditHandler(node.children, updatedNode)
        };
      }

      return node;
    });
  render() {
    return (
      <div className="measure-lib-tree-box" style={{ fontSize: "14px" }}>
        {this.props.showSearch ? (
          <FilteringContainer
            nodes={this.state.nodes}
            style={{ fontSize: "14px" }}
          >
            {({ nodes }) => {
              return (
                <div style={{ height: "500px" }}>
                  <Tree
                    nodes={nodes}
                    onChange={this.handleChange}
                    nodeMarginLeft={0}
                    extensions={{
                      updateTypeHandlers: {
                        [EDIT]: this.nodeEditHandler
                      }
                    }}
                  >
                    {({ node, ...rest }) => (
                      <FolderRenderer
                        node={node}
                        {...rest}
                        extConfig={this.props.extConfig}
                      >
                        {node.state !== undefined &&
                        node.state.isEdit !== undefined &&
                        node.state.isEdit.editing
                          ? ""
                          : node.name}
                      </FolderRenderer>
                    )}
                  </Tree>
                </div>
              );
            }}
          </FilteringContainer>
        ) : (
          <div style={{ height: "500px" }}>
            <Tree
              nodes={this.state.nodes}
              onChange={this.handleChange}
              nodeMarginLeft={0}
              extensions={{
                updateTypeHandlers: {
                  [EDIT]: this.nodeEditHandler
                }
              }}
            >
              {({ node, ...rest }) => (
                <FolderRenderer
                  node={node}
                  {...rest}
                  extConfig={this.props.extConfig}
                >
                  {node.state !== undefined &&
                  node.state.isEdit !== undefined &&
                  node.state.isEdit.editing
                    ? ""
                    : node.name}
                </FolderRenderer>
              )}
            </Tree>
          </div>
        )}
      </div>
    );
  }
}

export default MeasureLibTree;
