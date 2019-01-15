import { observable, action, runInAction } from "mobx";
import { post } from "../../utils/api";
import ErrHandler from "../../utils/error_handler";
import {backRoutes} from "../../utils/backinterface"
import doTree from "../../utils/dotreedata"
import * as _ from 'lodash'

// @Form.create()
export default class MeasureRelateStore {
    state = {
        checkFolder: 0,
        treeData:[]
    }
    @observable
    checkFolder = 0
    @observable
    data = []
    @observable
    leftTreeData = []
    @observable
    leftTreeUserFolderData = [] //已分配指标库的用户
    @observable
    relateData = {} //临时存储绑定的数据

    @observable
    folderTree = [] //文件包树数据
    @observable
    isLoading = true //是否显示loading
    @observable
    panelLoading = true //是否显示loading

    @action
    loadData(search,folderId=0) {
        try {  
            this.panelLoading =true;  
            post(backRoutes.folderList, { search ,folderId}, false).then(
                response => {
                    if (response.code !== 0) {
                        ErrHandler.GetMeasureListError(response);
                    } else {
                        this.data = observable.array(response.data);  
                        this.panelLoading =false;            
                    }
                }
            );
        } catch (error) {
            //format error for user warning
            ErrHandler.NetWorkError(`Network error, details:${error.message}`);
        }
    }
    @action
    loadDataSynchronization(search,folderId=0) { // 同步
        try {
            this.panelLoading =true;
            post(backRoutes.folderList, { search ,folderId}, false).then(
                response => {
                    if (response.code !== 0) {
                        ErrHandler.GetMeasureListError(response);
                    } else {
                        this.data = observable.array(response.data);

                        this.panelLoading =false;
                        this.checkFolder = response.data[0].id
                        this.getCollapseRadioTreeList(response.data[0].id)
                    }
                }
            );
        } catch (error) {
            //format error for user warning
            ErrHandler.NetWorkError(`Network error, details:${error.message}`);
        }
    }

    //保存
    @action
     saverelate(relate) {
        try {
            post(backRoutes.saverelate, { 'relate':relate }, false).then(
                response => {
                    if (response.code !== 0) {
                        ErrHandler.GetMeasureListError(response);
                    } else {
                        this.getUserList()
                        alert("save成功")
                    }
                }
            );
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

    //获取组织下的分部门用户树
    @action
    setleftTreeData(cacheTree) {
        this.leftTreeData = observable.array(cacheTree)
   }

   @action
   setLeftTreeUserFolderData(data){
       this.leftTreeUserFolderData = observable.array(data)
   }
   @action
   setRelateData(data){
       this.relateData = observable.object(data) 
    // this.relateData = observable.array(data) 
   }


   @action
    getCollapseRadioTreeList(key){
    //请求treeData
    if (key) {
        try {
            this.isLoading =true;
            post(backRoutes.measuresFolder, { datasetFolderId: parseInt(key) }, false).then(
                response => {
                    if (response.code !== 0) {
                        ErrHandler.GetMeasureListError(response);
                    } else {
                        this.isLoading =false;      
                        let tempTree = doTree(observable.array(response.data), 'gather')
                        // console.log(tempTree);
                        
                        this.folderTree= observable.array(tempTree[0].children)
                    }
                }
            );
        } catch (error) {
            //format error for user warning
            ErrHandler.NetWorkError(`Network error, details:${error.message}`);
        }
    }
} 

}
