// @ts-ignore
/* eslint-disable */
// @ts-ignore
import request from '@/plugins/globalRequest';




/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 增加登录历史 POST /api/history/add */
export async function addHis(body: API.addHistory, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/history/add ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 注册接口 POST /api/user/register    */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**  管理员修改权限接口 POST /api/user/edit */
export async function edit(body: API.EditParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户修改信息接口 POST  /api/user/changeInfo */
export async function userinfoEdit(body: API.userinfoEditParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.userinfoChangeResult>>('/api/user/changeInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户  POST /api/user/delete */
export async function deleteUser(body: API.DeleteParams, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.DeleteResult>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'GET',
    ...(options || {}),
  });
}



/** 搜索卡类型 GET /api/kami/search */
export async function searchType(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.timeType[]>>('/api/kami/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建卡类型 POST /api/kami/create */
export async function createType(body: API.typeAdd, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/kami/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除卡类型 POST /api/kami/delete */
export async function deleteType(body: API.typeDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/kami/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}




/** 创建软件 POST /api/kami/createSoftware */
export async function createSoftware(body: API.softwareCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/kami/createSoftware', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索软件 GET /api/kami/searchSoftware */
export async function searchSoftware(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.softwareSearch[]>>('/api/kami/searchSoftware', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除软件 POST /api/kami/deleteSoftware */
export async function deleteSoftware(body: API.softwareDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/kami/deleteSoftware', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改软件 POST /api/kami/editSoftware */
export async function editSoftware(body: API.softwareEditParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editSoftwareResult>>('/api/kami/editSoftware', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改版本 POST /api/kami/uploadVersion */
export async function uploadVersion(body: API.uploadParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editSoftwareResult>>('/api/kami/uploadVer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建卡密 POST /api/kami/createKami */
export async function createKami(body: API.kamiAddParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/kami/createKami', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索卡密 GET /api/kami/searchKami */
export async function searchKami(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.kamiSearch[]>>('/api/kami/searchKami', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除卡密 POST /api/kami/deleteKami */
export async function deleteKami(body: API.kamiDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/kami/deleteKami', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 查询设备列表 GET /api/device/getList */
export async function searchDevicesList(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.devicesListSearchParams[]>>('/api/device/getList', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 添加设备 POST /api/device/add */
export async function deviceAdd(body: API.deviceAddParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/device/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除设备 POST /api/device/delete */
export async function deleteDevice(body: API.typeDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/device/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 修改设备分组 POST /api/device/editPhone */
export async function editDevice(body: API.deviceEditParams, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/device/editPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询设备分组列表 GET /api/device/getGroupList */
export async function searchDeviceGroupList(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.devicesListGroupSearchParams[]>>('/api/device/getGroupList', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 添加设备分组 POST /api/device/addGroup */
export async function addGroup(body: API.deviceGroupAddParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/device/addGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除设备分组 POST /api/device/deleteGroup */
export async function deleteGroup(body: API.typeDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/device/deleteGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });

}

/** 修改软件分组 POST /api/device/editPhoneGroup */
export async function editGroup(body: API.phoneGroupEditParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editPhoneGroupResult>>('/api/device/editPhoneGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}




/** 搜索脚本 GET /api/script/getList */
export async function searchScript(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ScriptsItem[]>>('/api/script/getList ', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 增加脚本 POST /api/script/add */
export async function addScript(body: API.scriptAddParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.addScriptsItem>>('/api/script/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 修改脚本 POST /api/script/edit */
export async function editScript(body: API.scriptEditParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editScriptsItem>>('/api/script/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除脚本 POST /api/script/delete */
export async function deleteScript(body: API.scriptDeleteParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.deleteScriptsItem>>('/api/script/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 增加任务 POST /api/task/add */
export async function addTask(body: API.taskAddParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.addTaskItem>>('/api/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 搜索任务 GET /api/task/getTask */
export async function searchTask(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.taskListItem[]>>('/api/task/getTask ', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 删除任务 POST /api/task/delete */
export async function deleteTask(body: API.typeDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/task/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

  /**
   * 资源管理
   */

  /** 搜索关键词分组 GET /api/resource/searchKeyGroup */
  export async function searchKeyGroup(options?: { [key: string]: any }) {
    return request<API.BaseResponse<API.keyGroupSearch[]>>('/api/resource/searchKeyGroup', {
      method: 'GET',
      ...(options || {}),
    });
  }

/** 搜索关键词 GET /api/resource/searchKey */
export async function searchKey(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.keySearch[]>>('/api/resource/searchKey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 搜索术语分组 GET /api/comments/searchComGroup */
export async function searchComGroup(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.comGroupSearch[]>>('/api/comments/searchComGroup', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 根据分组搜索术语 POST /api/comments/searchGroupComments*/
export async function searchGroupComments(body: API.comKeyWordSearchParams,options?: { [key: string]: any }) {

  return request<API.BaseResponse<API.searchGroupComments[]>>('/api/comments/searchGroupComments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 搜索术语 GET /api/comments/searchComments */
export async function searchComments(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.searchComments[]>>('/api/comments/searchComments', {
    method: 'GET',
    ...(options || {}),
  });
}





/** 修改关键词分组 POST /api/resource/editKeyGroup */
export async function editKeyGroup(body: API.editKeyGroupParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editKeyGroupResult>>('/api/resource/editKeyGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 修改术语分组 POST /api/comments/editComGroup */
export async function editComGroup(body: API.editComGroupParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editComGroupResult>>('/api/comments/editComGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除关键词分组 POST /api/resource/deleteKeyGroup */
export async function deleteKeyGroup(body: API.KeyGroupResultDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/resource/deleteKeyGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除术语分组 POST /api/comments/deleteComGroup */
export async function deleteComGroup(body: API.ComGroupResultDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/comments/deleteComGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



/** 创建关键词 POST /api/resource/addKey */
export async function addKey(body: API.keyCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/resource/addKey ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 创建关键词分组 POST /api/resource/addKeyGroup */
export async function addKeyGroup(body: API.keyGroupCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/resource/addKeyGroup ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建术语分组 POST /api/comments/addComGroup */
export async function addComGroup(body: API.comGroupCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/comments/addComGroup ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 创建术语 POST /api/comments/addComments */
export async function addComments(body: API.commentsCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/comments/addComments ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改关键词 POST /api/resource/editKey */
export async function editKey(body: API.editKeyParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editKeyResult>>('/api/resource/editKey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改术语 POST /api/comments/editComments */
export async function editComments(body: API.editCommentsParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.editCommentsResult>>('/api/comments/editComments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除关键词 POST /api/resource/deleteKey */
export async function deleteKey(body: API.KeyResultDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/resource/deleteKey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除术语 POST /api/comments/deleteComments */
export async function deleteComments(body: API.CommentsResultDelete, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/comments/deleteComments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 邮件发送 POST /api/email/send */
export async function sendEmail(body: API.emailSendParams, options?: { [p: number]: any }) {
  return request<API.BaseResponse<string>>('/api/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 搜索邮件配置 GET /api/email/search */
export async function searchEmail(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.searchEmail[]>>('/api/email/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 增加邮件配置 POST /api/email/add */
export async function addEmail(body: API.addEmail, options?: { [p: number]: any }) {
  return request<API.BaseResponse<string>>('/api/email/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 修改邮件配置 POST /api/email/edit */
export async function editEmail(body: API.editEmail, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/email/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索历史记录 GET /api/history/search */
export async function searchHistory(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.searchHis[]>>('/api/history/search', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 搜索热更新文件 GET /api/hot/search */
export async function searchHot(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.hotList[]>>('/api/hot/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建热更新文件 POST /api/hot/add */
export async function addHot(body: API.hotCreate, options?: { [key: string]: any }) {
  return request<API.BaseResponse<String>>('/api/hot/add ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改热更新文件 POST /api/hot/edit */
export async function editHot(body: API.editHot, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/hot/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 获取网站配置 GET /api/webConfig/search */
export async function currentWebConfig(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.searchWebConfig>>('/api/webConfig/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 配置网站配置  POST /api/webConfig/edit */
export async function editWebConfig(body: API.WebConfigParams, options?: { [p: number]: any }) {
  return request<API.BaseResponse<number>>('/api/webConfig/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
