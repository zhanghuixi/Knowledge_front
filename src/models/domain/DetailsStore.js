import { observable, action } from "mobx";
import { post } from "../../utils/api";
import MeasureDetails from "../../containers/MeasureDetails";
import ErrHandler from "../../utils/error_handler";
import { withRouter } from "react-router-dom";
import * as _ from "lodash";
import {backRoutes} from "../../utils/backinterface"

export default class DetailsStore {
  @observable
  loading = true;
  @observable
  measuredetails = null;
  @observable
  detail = null;
  @observable
  leftTreeData = []
  @action
  loadData(id) {
    this.detail = null;
    this.measuredetails = null;
    try {
      post("/OrgMeasures/Measures/details", { folder_id: id }, false).then(
        response => {
          if (response.code !== 0) {
            ErrHandler.GetDataListError(response);
          } else {
            if (!_.isEmpty(response.data.gatherData[0])) {
              for (let j = 0; j < response.data.gatherData.length; j++) {
                let tmp = [];
                if (!_.isEmpty(response.data.gatherData[j].field_id)) {
                  response.data.gatherData[j].field_id.map(
                    i => (i.field_name ? tmp.push(i.field_name) : "")
                  );
                }
                response.data.gatherData[j].field_name = tmp
                  ? Object.values(tmp).join("、")
                  : null;
              }
              this.measuredetails = response.data.gatherData;
            }
            this.detail = response.data.baseInfo[0];
            // this.loading = false
          }
        }
      );

      //获取用户信息树形结构展示
      //组织指标集名称
    } catch (error) {
      //format error for user warning
      ErrHandler.NetWorkError(`Network error, details:${error.message}`);
    }
  }

  //获取组织下的分部门用户树
  @action
  getUserList(datasetFolderId=0,search='') {
     try {
         post(backRoutes.getuserlist, {datasetFolderId,search}, false).then(
             response => {
                 if (response.code !== 0) {
                     ErrHandler.GetMeasureListError(response);
                 } else {
                     let classify = !_.isEmpty(response.data.classify)?response.data.classify:[];
                     let tempunclassify = !_.isEmpty(response.data.unclassify)?response.data.unclassify:[];
                     let unclassify = _.isEmpty(tempunclassify)?[]:tempunclassify.map((v)=>{
                         return {'id':'u_'+v['id'],'name':v['name'],'org_id':v['org_id'],'folder':v['folder']}
                     })
                     classify.push.apply(classify,unclassify)
                     this.leftTreeData  = observable.array(classify); 
                     this.leftTreeUserFolderData = !_.isEmpty(response.data.userFolder)?response.data.userFolder:[];               
                 }
             }
         );
     } catch (error) {
         //format error for user warning
         ErrHandler.NetWorkError(`Network error, details:${error.message}`);
     }
 }
}
