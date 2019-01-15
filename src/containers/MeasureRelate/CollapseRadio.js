import React from "react";
import Collapse from "antd/lib/collapse";
import "antd/lib/collapse/style";
import Radio from "antd/lib/radio";
import "antd/lib/radio/style";
import Icon from "antd/lib/icon";
import Spin from "antd/lib/spin";
import GenericTree from "../../components/ReactTree";
import { observer, inject } from "mobx-react";
import * as _ from "lodash";
import "./collapseradio.css";

const Panel = Collapse.Panel;

@inject("measureRelate")
@observer
class CollapseRadio extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        checkFolder: 0
    }
    checkFolder = 0
  render() {
    const rightRefTree = React.createRef();
    const { measureRelate, innerRef, defaultRedio } = this.props;
    //获取树形数据
    const panelHeader = (cleckVal, name) => {
      let deChecked = false;
      if (defaultRedio !== undefined) {
        deChecked = defaultRedio.folderId;
      } else if (this.state.checkFolder != 0) {
          deChecked = this.state.checkFolder
      } else if (this.props.measureRelate.measureRelate.checkFolder == cleckVal){
          this.checkFolder = this.props.measureRelate.measureRelate.checkFolder
          deChecked = cleckVal
      }
      //调取树形结构
      return (
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100
            }}
          />
          <Radio
            checked={
              cleckVal == this.state.checkFolder || deChecked == cleckVal
                ? true
                : false
            }
          >
            {name}
          </Radio>
        </div>
      );
    };

    const panelOnchange = key => {
      this.setState(
        {
          checkFolder: key
        },
        () => {
          this.props.measureRelate.measureRelate.getCollapseRadioTreeList(key);
        }
      );
    };

        //手风琴内容中的树
        const panelDataNodes = listData => measureRelate.measureRelate.data.map((item) => {
            return (
                <Panel showArrow={false} header={panelHeader(item.id, item.name)} key={item.id}   >
                    {this.props.measureRelate.measureRelate.isLoading?
                    <Icon className="loading" type="loading" />
                    :
                    <GenericTree key={item.id} ref={rightRefTree} doTreeData={this.props.measureRelate.measureRelate.folderTree} ></GenericTree>
                    }
                </Panel>
            ); 
        });
        if(this.props.measureRelate.measureRelate.panelLoading){
            return <Spin className="panelLoading" />
          }else{
            const defaultActiveKey = this.state.checkFolder == 0 ? this.props.measureRelate.measureRelate.checkFolder : this.state.checkFolder
            return (
                <Collapse ref={innerRef} bordered={false} accordion onChange={panelOnchange} activeKey={defaultRedio!== undefined?""+defaultRedio.folderId: ""+defaultActiveKey}
                checkFolder={defaultActiveKey} >
                   {panelDataNodes(measureRelate.measureRelate.data)}
                </Collapse>
            ) 
       }
    }
}

const CollapseRadioForwardingRef = React.forwardRef((props, ref) => {

  return <CollapseRadio {...props} innerRef={ref} />;
});
export default CollapseRadioForwardingRef;
