// @ts-ignore
/* eslint-disable */

declare namespace API {
  /**
   * 用户管理
   */
  type CurrentUser = {
    id: number;
    username:string;
    userAccount:string;
    avatarUrl?:string;
    gender:number;
    userPassword:string;
    phone:string;
    email:string;
    userStatus:number;
    createTime:Date;
    updateTime:Date;
    userRole:number;
    uuid:number

  };
  /**
   * 用于对接后端的接口
   */
  type BaseResponse<T> ={
    code:number,
    data: T,
    message:string,
    description:string
  }
  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type RegisterResult = number;
  type DeleteResult = number;
  type userinfoChangeResult = number;

  /**
   * 用户中心接口
   */
  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    verify?:string;
    email?:string;
  };
  type EditParams = {
    userID?:number,
    userRole?: number,
    userStatus?: number;
  };
  type DeleteParams = {
    userID?:number
  };
  type userinfoEditParams = {
    id?:number,
    nickName?:string,
    email?:string,
    phone?:string,
    image?:string,
    password?:string,
  };

  /**
   * 自定义组件接口
   */
  type cardInfo = {
    avatar?:string,
    value?:any,
    style?:any,
    tip?:string
  };


  /**
   * 卡密系统接口
   */
  /** timeType  搜索卡类型返回*/
  type timeType = {
    id: number,
    type: number,
    name: string,
    userid: string,
    createTime: Date,
    updateTime:Date,
    isDelete:number

  };
  /** typeAdd  创建卡类型提交参数*/
  type typeAdd = {
    name:string,
    type:number
  }
  /** typeDelete  删除卡类型提交参数*/
  type typeDelete = {
    id:number
  };
  /** editSoftwareResult  修改软件返回参数*/
  type editSoftwareResult = number;
  /** useKamiParams  使用卡密提交参数*/
  type useKamiParams = {
    userid?:string,
    software?:string,
    kami?:string,
    machine?:string,
    ip?:string,
  };



  /**
   * 软件接口
   */
  /** softwareCreate  创建软件提交参数*/
  type softwareCreate = {
    name:string,
    notice:string,
    version:string,
    machine:number
  }
  /** softwareSearch  搜索软件返回参数*/
  type softwareSearch = {
    id:string,
    name:string,
    notice:string,
    version:string,
    secret:string,
    userid:string,
    createTime:Date,
    updateTime:Date,
    status:number,
    machine:number,
    updateUrl?:string

  }
  /** softwareDelete  删除软件提交参数*/
  type softwareDelete = {
    id:number
  };
  /** softwareAddParams  添加软件提交参数*/
  type softwareAddParams = {
      name:string,
      notice:string,
      version:string,
      switch:boolean
  };
  /** softwareEditParams  修改软件提交参数*/
  type softwareEditParams = {
    id:number,
    name:string,
    secret:string,
    notice:string,
    version:string,
    machine:number,
    status:number
  };
  /** uploadParams  修改版本提交参数*/


  /**
   * 卡密接口
   */
  type uploadParams = {
    id:string
    secret:string,
    version:string,
    updateUrl:string
  };
  /** kamiSearch  搜素名下卡密返回参数*/
  type kamiSearch = {
    id:string,
    software:string,
    kami:string,
    type:string,
    ip:string,
    machine:string,
    online:number,
    createTime:Date,
    updateTime:Date,
    validTime:Date,
    status:number,


  }
  /** kamiDelete  删除kami提交参数*/
  type kamiDelete = {
    id:number
  };
  /** kamiAddParams  添加卡密提交参数*/
  type kamiAddParams = {
    software:string,
    type:string,
    num:number,
    prefix:string
  };

  type useKamiResult = string;


  /**
   * 云控系统接口
   */
  /** devicesListSearchParams  获取设备返回参数*/
  type devicesListSearchParams = {
    id:string,
    remark: string,
    deviceName:string,
    deviceModel:string,
    deviceGroup:string,
    status:number,
    createTime:Date,
  }
  /** deviceAddParams  添加设备提交参数*/
  type deviceAddParams = {
    remark:string,
    deviceName:string,
    deviceModel:string
  }

  /** devicesGroupListSearchParams  获取设备分组返回参数*/
  type devicesListGroupSearchParams = {
    id:string,
    name:string,
    note:string,
    status:number,
    createTime:Date,
    updateTime:dete,
  }

  /** deviceGroupAddParams  添加设备分组提交参数*/
  type deviceGroupAddParams = {
    groupName:string,
    note:string
    status:boolean
  }
  /** phoneGroupEditParams  修改设备分组提交参数*/
  type phoneGroupEditParams = {
    id:number,
    groupName:string,
    note:string,
    status:number
  };
  /** editPhoneGroupResult  修改设备分组返回参数*/
  type editPhoneGroupResult = number;

  /** ScriptsItem  查询脚本列表返回参数*/
  type ScriptsItem = {

      id: number;
      scriptName: string;
      scriptGroup: string;
      userid: string;
      url?: string;
      type: number;
      version: string;
      note: string;
      whiteList: string;
      courseUrl: string;
      status: number;
      createTime: Date;

  }


  /** addScriptsItem  增加脚本返回参数*/
  type addScriptsItem = string
  /** editScriptsItem  修改脚本返回参数*/
  type editScriptsItem = number
  /** deleteScriptsItem  删除脚本返回参数*/
  type deleteScriptsItem = number
  /** scriptAddParams  增加脚本提交参数*/
  type scriptAddParams = {
    name:string,
    group:string,
    note:string,
    type:number,
    version: string,
    whiteList:string,
    status:number,
    url:string,
    courseUrl:string

  };

  /** scriptEditParams  修改脚本提交参数*/
  type scriptEditParams = {
    id:number,
    scriptName:string,
    scriptGroup:string,
    note:string,
    type:number,
    version: string,
    whiteList:string,
    status:number,
    scriptUrl?:string,
    courseUrl:string

  };

  /** scriptDeleteParams  删除脚本提交参数*/
  type scriptDeleteParams = {
    id:number,

  };

  /** taskAddParams  添加任务提交参数*/
  type taskAddParams = {
    scriptGroup:string,
    scriptName: string,
    devices:string,
    taskNote?:string,
    executionModel:string,
    sendTime?:string
    uuid: number | undefined
    msg: string
    createTime:string
  };

  /** addTaskItem  添加任务返回参数*/
  type addTaskItem = string
  /** taskListItem  查询任务列表返回参数*/
  type taskListItem = {
    id: number;
    scriptName: string;
    scriptGroup: string;
    executionModel:string;
    devices:string;
    taskNote: string;
    status: number;
    sendTime:string;
    createTime: string;

  }



  /**
   * pro自带
   */
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
