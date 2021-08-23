const api = {
  //  密码登录
  loginByPassword: {
    url: 'cloud-api-login/api/login/web/loginByPassword',
    method: 'post',
  },
  //  /手机登录，获取验证码
  getCaptcha: {
    url: 'cloud-api-login/api/login/web/getCaptcha',
    method: 'post',
  },
  //  手机登录
  loginByMobile: {
    url: 'cloud-api-login/api/login/web/loginByMobile',
    method: 'post',
  },
  //  自定义图片列表
  queryCustomizeList: {
    url: 'cloud-api-user/api/user/accout/customize/queryCustomizeList',
    method: 'get',
  },
  //  保存用户-自定义图片
  saveAccountCustomize: {
    url: 'cloud-api-user/api/user/accout/customize/saveAccountCustomize',
    method: 'post',
  },
  //  故障Top5
  getFaultTop5: {
    url: 'cloud-api-home/api/home/group/web/getFaultTop5',
    method: 'get',
  },
  //  工单Top5
  getRepairTop5: {
    url: 'cloud-api-home/api/home/group/web/getRepairTop5',
    method: 'get',
  },
  // 预警Top5
  getWarningTop5: {
    url: 'cloud-api-home/api/home/group/web/getWarningTop5',
    method: 'get',
  },
  // 设备故障&预警趋势
  getDeviceTrend: {
    url: 'cloud-api-home/api/home/group/web/getDeviceTrend',
    method: 'get',
  },
  // 9张图-5 设备统计
  getBreakerGroupStat: {
    url: 'cloud-api-home/api/home/group/web/getBreakerGroupStat',
    method: 'get',
  },
  // 9张图-6 设备状态
  getBreakerState: {
    url: 'cloud-api-home/api/home/group/web/getBreakerState',
    method: 'get',
  },
  // 9张图-7 能耗预测
  getEnergyWeekTrend: {
    url: 'cloud-api-home/api/home/group/web/getEnergyWeekTrend',
    method: 'get',
  },
  // 9张图-8 能耗同环比
  getEnergyMonthYyMm: {
    url: 'cloud-api-home/api/home/group/web/getEnergyMonthYyMm',
    method: 'get',
  },
  // 9张图-9 能耗曲线
  getEnergyTwoDayTrend: {
    url: 'cloud-api-home/api/home/group/web/getEnergyTwoDayTrend',
    method: 'get',
  },
  // 地图-1 站点列表
  getStationStat: {
    url: 'cloud-api-home/api/home/group/web/getStationStat',
    method: 'post',
  },
  // 地图-1 站点列表
  getStationStatMap: {
    url: 'cloud-api-home/api/home/group/web/getStationStatMap',
    method: 'post',
  },
  // 获取当前位置信息
  getLocation: {
    url: 'cloud-api-sys/api/map/getLocation',
    method: 'post',
  },
  // 底部-2 故障&预警
  getBreakerFaultWarning: {
    url: 'cloud-api-home/api/home/group/web/getBreakerFaultWarning',
    method: 'get',
  },
  // 底部-1 离线
  getBreakerOnlineOffline: {
    url: 'cloud-api-home/api/home/group/web/getBreakerOnlineOffline',
    method: 'get',
  },
  // 底部-3 运维
  getRepairNotHandle: {
    url: 'cloud-api-home/api/home/group/web/getRepairNotHandle',
    method: 'get',
  },
  // 用户信息
  getAccountDetail: {
    url: 'cloud-api-user/api/user/accout/setting/getAccountDetail',
    method: 'get',
    loding: false,
  },
  // 安全下线时间列表
  queryOprMinList: {
    url: 'cloud-api-user/api/user/accout/setting/queryOprMinList',
    method: 'get',
  },
  // 设置安全下线时间，单位分钟
  updateAccountOprMin: {
    url: 'cloud-api-user/api/user/accout/setting/updateAccountOprMin',
    method: 'post',
  },
  //   底部-2 故障&预警
  getBreakerFaultWarningStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerFaultWarning',
    method: 'get',
  },
  // 9张图-1 故障Top5
  getFaultTop5Station: {
    url: 'cloud-api-home/api/home/station/web/getFaultTop5',
    method: 'get',
  },
  // 9张图-2 预警Top5
  getWarningTop5Station: {
    url: 'cloud-api-home/api/home/station/web/getWarningTop5',
    method: 'get'
  },
  // 9张图-3 工单Top5
  getRepairTop5Station: {
    url: 'cloud-api-home/api/home/station/web/getRepairTop5',
    method: 'get',
  },
  // 9张图-4 设备趋势
  getDeviceTrendStation: {
    url: 'cloud-api-home/api/home/station/web/getDeviceTrend',
    method: 'get',
  },
  // 9张图-5 设备统计
  getBreakerGroupStatStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerGroupStat',
    method: 'get',
  },
  // 9张图-5 设备统计
  getBreakerGroupStatStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerGroupStat',
    method: 'get',
  },
  // 9张图-6 设备状态
  getBreakerStateStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerState',
    method: 'get',
  },
  // 9张图-7 能耗预测
  getEnergyWeekTrendStation: {
    url: 'cloud-api-home/api/home/station/web/getEnergyWeekTrend',
    method: 'get',
  },
  // 9张图-8 能耗同环比
  getEnergyMonthYyMmStation: {
    url: 'cloud-api-home/api/home/station/web/getEnergyMonthYyMm',
    method: 'get',
  },
  // 9张图-9 能耗曲线
  getEnergyTwoDayTrendStation: {
    url: 'cloud-api-home/api/home/station/web/getEnergyTwoDayTrend',
    method: 'get',
  },
  // 底部-1 离线
  getBreakerOnlineOfflineStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerOnlineOffline',
    method: 'get',
  },
  // 底部-2 故障&预警
  getBreakerFaultWarningStation: {
    url: 'cloud-api-home/api/home/station/web/getBreakerFaultWarning',
    method: 'get',
  },
  //  底部- 3 运维
  getRepairNotHandleStation: {
    url: 'cloud-api-home/api/home/station/web/getRepairNotHandle',
    method: 'get',
  },
  //  设备基本信息
  getBasicInfo: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getBasicInfo',
    method: 'post',
  },
  //  设备运维参数
  getMaintain: {
    url: 'cloud-api-breaker/api/breaker/dashboard/getMaintain',
    method: 'post',
  },
  //  设备测量数据
  getMeasureData: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getMeasureData',
    method: 'post',
  },
  //  设备运行状态
  getRunningState: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getRunningState',
    method: 'post',
  },
  //  设备当前状态（在线/离线、分闸/合闸等等）
  getCurState: {
    url: 'cloud-api-breaker/api/breaker/dashboard/getCurState',
    method: 'post',
  },
  //  验证远程控制密码
  checkBreakerCmdPassword: {
    url: 'cloud-api-breaker/api/breaker/cmd/pwd',
    method: 'post',
    loding: false,
  },
  //  NDQ系列(NDQ3 NDQ5) - 遥控命令下发
  breakerCmdControlQ: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdControlQ',
    method: 'post',
    loding: false,
  },

  //  NDQ系列(NDQ3 NDQ5) - 遥控指令下发
  breakerCmdControlW: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdControlW',
    method: 'post',
    loding: false,
  },
  //  NDM系列(NDM5E NDM3E) NDB系列(NDB5E NDB5T) - 分合闸命令下发
  breakerCmdOpenClose: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdOpenClose',
    method: 'post',
    loding: false,
  },
  //  NDM系列(NDM5E NDM3E) NDB系列(NDB5E NDB5T) - 远程试跳命令下发
  breakerCmdTrial: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdTrial',
    method: 'post',
    loding: false,
  },
  //  NDM3E配电型 - 脱扣试验命令下发
  breakerCmdTrialM3ep: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdTrialM3ep',
    method: 'post',
    loding: false,
  },
  //  设备当前未处理故障列表

  getNotHandleFault: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getNotHandleFault',
    method: 'post',
    loding: false,
  },

  //  设备当前未处理预警列表
  getNotHandleWarning: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getNotHandleWarning',
    method: 'post',
    loding: false,
  },
  //  设备当前未处理预警列表
  getNotHandleWarning: {
    url: 'cloud-api-breaker/api/breaker/dashboard/v2/getNotHandleWarning',
    method: 'post',
    loding: false,
  },
  //  获取事件信息列表
  eventQueryPageList: {
    url: 'cloud-api-warning/api/event/queryPageListPath',
    method: 'post',
    loding: false,
  },
  //  获取某月能效同比曲线
  getPowerMonthYy: {
    url: 'cloud-api-energy/api/report/other/getPowerMonthYy',
    method: 'post',

  },
  //  获取某年能效环比曲线
  getPowerYearMm: {
    url: 'cloud-api-energy/api/report/other/getPowerYearMm',
    method: 'post',

  },
  //  获取某月能效环比曲线
  getPowerMonthMm: {
    url: 'cloud-api-energy/api/report/other/getPowerMonthMm',
    method: 'post',

  },















  // 获取预警信息列表，分页
  faultQueryPageList: {
    url: 'cloud-api-warning/api/fault/queryPageListPath',
    method: 'post'
  },
  // 根据站点编码获取设备列表
  getBreakerListByStationCode: {
    url: 'cloud-api-breaker/api/breaker/query/getBreakerListByStationCode',
    method: 'get'
  },
  //   getBreakerListByStationCode: {
  //    url: 'cloud-api-breaker/api/breaker/query/getBreakerListWithStrByStationCode',
  //    method: 'get'
  //  },
  // 获取预警信息列表（包括所属区域全路径），分页
  warningQueryPageListPath: {
    url: 'cloud-api-warning/api/warning/queryPageListPath',
    method: 'post'
  },
  // 故障类型
  queryFaultTypeList: {
    url: 'cloud-api-warning/api/fault/queryFaultTypeList',
    method: 'post'
  },
  // 预警类型
  queryWarningTypeList: {
    url: 'cloud-api-warning/api/warning/queryWarningTypeList',
    method: 'post'
  },
  // 根据站点编码获取区域拓扑图
  getDomainTopoByStationCode: {
    url: 'cloud-api-domain/api/domainTopo/getDomainTopoByStationCode',
    method: 'post'
  },
  // 根据区域编码获取区域拓扑图
  getDomainTopoByDomainCode: {
    url: 'cloud-api-domain/api/domainTopo/getDomainTopoByDomainCode',
    method: 'post'
  },

  // 获取区域拓扑图
  getDomainTopoByStationCodeCreate: {
    url: 'cloud-api-domain/api/domainTopoCreate/getDomainTopoByStationCode',
    method: 'post'
  },



  // 配电回路拓扑图(不包括回路上绑定的设备)
  getLoopTopoWithNotBreakerList: {
    url: 'cloud-api-domain/api/domain/query/getLoopTopoWithNotBreakerList',
    method: 'post'
  },
  // 配电回路拓扑图(包括回路上绑定的设备)
  getLoopTopoWithBreakerList: {
    url: 'cloud-api-domain/api/domain/query/getLoopTopoWithBreakerList',
    method: 'post'
  },


  // 获取某天能耗曲线及预测曲线
  getDayTrendWithForecast: {
    url: 'cloud-api-energy/api/energy/domain/getDayTrendWithForecast',
    method: 'post'
  },

  // 获取某天能耗曲线-能耗分时分析
  getDayTrend: {
    url: 'cloud-api-energy/api/energy/domain/getDayTrend',
    method: 'post'
  },

  // 获取某年能耗同比曲线
  getYearYy: {
    url: 'cloud-api-energy/api/energy/domain/getYearYy',
    method: 'post'
  },
  // 获取某月能耗同比曲线
  getMonthYy: {
    url: 'cloud-api-energy/api/energy/domain/getMonthYy',
    method: 'post'
  },
  // 获取某年能耗环比曲线
  getYearMm: {
    url: 'cloud-api-energy/api/energy/domain/getYearMm',
    method: 'post'
  },
  // 获取某月能耗环比曲线
  getMonthMm: {
    url: 'cloud-api-energy/api/energy/domain/getMonthMm',
    method: 'post'
  },
  // 获取某区域某年跑冒滴漏
  getYearLeaking: {
    url: 'cloud-api-energy/api/energy/domain/getYearLeaking',
    method: 'post'
  },
  // 获取某区域某月跑冒滴漏
  getMonthLeaking: {
    url: 'cloud-api-energy/api/energy/domain/getMonthLeaking',
    method: 'post'
  },
  // 获取某区域某天跑冒滴漏
  getDayLeaking: {
    url: 'cloud-api-energy/api/energy/domain/getDayLeaking',
    method: 'post'
  },
  // 获取区域电流曲线(A相B相C相)
  getDayCurrent: {
    url: 'cloud-api-energy/api/report/other/getDayCurrent',
    method: 'get'
  },
  // 获取区域电压曲线(A相B相C相)
  getDayVoltage: {
    url: 'cloud-api-energy/api/report/other/getDayVoltage',
    method: 'get'
  },
  // 获取设备某年能耗曲线
  getYearTrend: {
    url: 'cloud-api-energy/api/energy/breaker/getYearTrend',
    method: 'post'
  },
  // 获取设备某月能耗曲线
  getMonthTrend: {
    url: 'cloud-api-energy/api/energy/breaker/getMonthTrend',
    method: 'post'
  },

  // 获取设备某天能耗曲线
  getDayTrendBreaker: {
    url: 'cloud-api-energy/api/energy/breaker/getDayTrend',
    method: 'post'
  },
  // 获取某年能耗曲线
  getYearTrendDomain: {
    url: 'cloud-api-energy/api/energy/domain/getYearTrend',
    method: 'post'
  },
  // 获取某月能耗曲线
  getMonthTrendDomain: {
    url: 'cloud-api-energy/api/energy/domain/getMonthTrend',
    method: 'post'
  },
  // /获取某天能耗曲线
  getDayTrendDomain: {
    url: 'cloud-api-energy/api/energy/domain/getDayTrend',
    method: 'post'
  },

  // /获取区域功率曲线(有功无功视在)
  getDayPower: {
    url: 'cloud-api-energy/api/report/other/getDayPower',
    method: 'get'
  },
  // /获取某年能效同比曲线
  getPowerYearYy: {
    url: 'cloud-api-energy/api/report/other/getPowerYearYy',
    method: 'post'
  },
  // /设备大类列表，不分页
  breakerLargeTypeQueryList: {
    url: 'cloud-api-breaker/api/breakerLargeType/queryList',
    method: 'get'
  },
  // /获取设备列表，分页
  breakerQueryList: {
    url: 'cloud-api-breaker/api/breaker/manage/queryPageList',
    method: 'post'
  },

  // /获取设备删除
  delBreaker: {
    url: 'cloud-api-breaker/api/breaker/manage/del',
    method: 'post'
  },
  // /获取设备新增
  addBreaker: {
    url: 'cloud-api-breaker/api/breaker/manage/add',
    method: 'post'
  },
  // /获取设备更新
  updateBreaker: {
    url: 'cloud-api-breaker/api/breaker/manage/update',
    method: 'post'
  },
  // /设备绑定网关
  breakerBindGateway: {
    url: 'cloud-api-breaker/api/breaker/manage/bindGateway',
    method: 'post'
  },
  // /获取网关列表
  gatewayQueryList: {
    url: 'cloud-api-breaker/api/gateway/queryList',
    method: 'get'
  },
  // /获取负载类型列表
  getLoadNameList: {
    url: 'cloud-api-domain/api/domainTopoCreate/getLoadNameList',
    method: 'get'
  },
  // /获取回路列表，父连线列表
  getDomainLoopList: {
    url: 'cloud-api-domain/api/domainTopoCreate/getDomainLoopList',
    method: 'get'
  },
  // /配电拓扑图(包括回路和回路上绑定的设备列表)
  getTopoWithLoopAndBreakerList: {
    url: 'cloud-api-domain/api/domain/query/getTopoWithLoopAndBreakerList',
    method: 'post'
  },
  // /绑定设备到区域
  bindDomain: {
    url: 'cloud-api-breaker/api/breaker/manage/bindDomain',
    method: 'post'
  },
  // /解绑定设备到区域
  unbindDomain: {
    url: 'cloud-api-breaker/api/breaker/manage/unbindDomain',
    method: 'post'
  },
  //  // /设置区域能耗设备
  //  setEnergy: {
  //    url: 'cloud-api-breaker/api/domainTopoCreate/setEnergy',
  //    method: 'post'
  //  },


  // 获取工单列表，分页
  repairQueryPageList: {
    url: 'cloud-api-warning/api/repair/queryPageList',
    method: 'post'
  },
  // 工单类型
  queryRepairTypeList: {
    url: 'cloud-api-warning/api/repair/queryRepairTypeList',
    method: 'post'
  },
  // 工单详情
  detail: {
    url: 'cloud-api-warning/api/repair/detail',
    method: 'get'
  },
  // 开始处理
  repairHandle: {
    url: 'cloud-api-warning/api/repair/handle',
    method: 'post'
  },
  // 提交验收
  toAudit: {
    url: 'cloud-api-warning/api/repair/toAudit',
    method: 'post'
  },
  // 验收通过
  auditPass: {
    url: 'cloud-api-warning/api/repair/auditPass',
    method: 'post'
  },
  // 验收驳回
  auditReject: {
    url: 'cloud-api-warning/api/repair/auditReject',
    method: 'post'
  },
  // 上传图片
  imageupload: {
    url: 'cloud-api-sys/api/image/upload',
    method: 'post'
  },
  // 更新控制密码
  updatePwd: {
    url: 'cloud-api-station/api/station/manage/updatePwd',
    method: 'post'
  },
  // 更新控制密码
  updatePwd: {
    url: 'cloud-api-station/api/station/manage/updatePwd',
    method: 'post'
  },

  queryEnergyBreakerPage: {
    url: 'cloud-api-breaker/api/breaker/query/queryEnergyBreakerPage',
    method: 'post'
  },

























  //   获取设备分页列表（区域绑定设备时使用）
  queryBindingBreakerPage: {
    url: 'cloud-api-breaker/api/breaker/query/queryBindingBreakerPage',
    method: 'post',
  },

  //   获取回路分页列表(绑定能耗回路时使用)
  getDomainLoopListBreaker: {
    url: 'cloud-api-domain/api/domainTopoCreate/queryEnergyLoopPage',
    method: 'post',
  },

  // 绑定能耗回路--设置区域能耗设备
  domainBreakerBind: {
    url: 'cloud-api-domain/api/domainTopoCreate/setEnergy',
    method: 'post',
  },
  // 解绑能耗回路-取消设置区域能耗设备
  domainBreakerUnbind: {
    url: 'cloud-api-domain/api/domainTopoCreate/setNotEnergy',
    method: 'post',
  },
  //  // 解绑定设备到区域
  //  unbindDomain: {
  //    url: 'breaker/unbindDomain',
  //    method: 'post',
  //  },
  // 解绑传感器设备到区域
  unbindSensorDomain: {
    url: 'breaker/sensor/unbindSensorDomain',
    method: 'post',
  },
  // 设为主进线
  setMain: {
    url: 'cloud-api-domain/api/domainTopoCreate/setMain',
    method: 'post',
  },
  //  新增
  topoAdd: {
    url: 'cloud-api-domain/api/domainTopoCreate/add',
    method: 'post',
  },
  //  删除
  topoDel: {
    url: 'cloud-api-domain/api/domainTopoCreate/del',
    method: 'post',
  },
  //  编辑
  topoUpdate: {
    url: 'cloud-api-domain/api/domainTopoCreate/update',
    method: 'post',
  },
  //  获取当前用户站点列表，分页
  stationQueryPageList: {
    url: 'cloud-api-station/api/station/manage/queryPageList',
    method: 'post',
  },

  // 新增项目
  stationAdd: {
    url: 'cloud-api-station/api/station/manage/add',
    method: 'post'
  },
  // 项目信息更新
  stationUpdate: {
    url: 'cloud-api-station/api/station/manage/update',
    method: 'post'
  },
  //   项目状态更新
  stationChangeStatus: {
    url: 'cloud-api-station/api/station/manage/changeStatus',
    method: 'post',
  },
  //    打点
  setLocation: {
    url: 'cloud-api-station/api/station/manage/setLocation',
    method: 'post',
  },
  //   获取人员分页列表
  queryAccountList: {
    url: 'cloud-api-sys/api/account/queryPageList',
    method: 'post',
  },
  // 新增用户
  sysAccountAdd: {
    url: 'cloud-api-sys/api/account/add',
    method: 'post'
  },
  // 用户信息更新
  sysAccountUpdate: {
    url: 'cloud-api-sys/api/account/update',
    method: 'post'
  },
  // 用户删除
  sysAccountDel: {
    url: 'cloud-api-sys/api/account/del',
    method: 'post'
  },
  // 获取全部角色列表
  sysRoleAllList: {
    url: 'cloud-api-sys/api/role/queryList',
    method: 'post'
  },
  // 根据故障id获取故障录波数据
  queryFaultRecordByFaultId: {
    url: 'cloud-api-warning/api/fault/queryFaultRecordByFaultId',
    method: 'get'
  },
  // 获取角色分页列表
  sysRolePageList: {
    url: 'cloud-api-sys/api/role/queryPageList',
    method: 'post'
  },
  //  新增角色
  sysRoleAdd: {
    url: 'cloud-api-sys/api/role/add',
    method: 'post'
  },
  // 修改角色
  sysRoleUpdate: {
    url: 'cloud-api-sys/api/role/update',
    method: 'post'
  },
  //  获取角色菜单列表
  sysPermissionRole: {
    url: 'cloud-api-sys/api/permission/queryListForRole',
    method: 'post',
  },
  //  绑定菜单
  bindMenu: {
    url: 'cloud-api-sys/api/role/bindMenu',
    method: 'post',
  },
  // 角色状态更新
  sysRoleChangeStatus: {
    url: 'cloud-api-sys/api/role/changeStatus',
    method: 'post',
  },
  // 获取网关分页列表
  gatewayList: {
    url: 'cloud-api-breaker/api/gateway/queryPageList',
    method: 'post'
  },
  // 新增网关
  gatewayAdd: {
    url: 'cloud-api-breaker/api/gateway/add',
    method: 'post'
  },
  // 网关信息更新
  gatewayUpdate: {
    url: 'cloud-api-breaker/api/gateway/update',
    method: 'post'
  },
  // 网关状态更新
  gatewayChangeStatus: {
    url: 'cloud-api-breaker/api/gateway/changeStatus',
    method: 'post'
  },


  //  获取菜单列表
  sysPermissionList: {
    url: 'cloud-api-sys/api/permission/queryPageList',
    method: 'post',
  },
  //  新增菜单
  sysPermissionAdd: {
    url: 'cloud-api-sys/api/permission/add',
    method: 'post',
  },
  //  菜单信息更新
  sysPermissionUpdate: {
    url: 'cloud-api-sys/api/permission/update',
    method: 'post',
  },
  //  菜单删除
  sysPermissionDel: {
    url: 'cloud-api-sys/api/permission/del',
    method: 'post',
  },
  //  根据类型获取菜单列表
  queryListForType: {
    url: 'cloud-api-sys/api/permission/queryListForType',
    method: 'post',
  },

  // 故障详情
  detailfault: {
    url: 'cloud-api-warning/api/fault/detail',
    method: 'get'
  },// 故障详情
  detailwarning: {
    url: 'cloud-api-warning/api/warning/detail',
    method: 'get'
  },
  // 汇总
  getHome: {
    url: 'cloud-api-home/api/home/group/web/getHome',
    method: 'post'
  },
  // 汇总
  getHomeStation: {
    url: 'cloud-api-home/api/home/station/web/getHome',
    method: 'post'
  },
  // 获取谐波检测数据
  queryHarmonic: {
    url: 'cloud-api-warning/api/quality/queryHarmonic',
    method: 'post'
  },
  // 取消设为主进线
  setNotMain: {
    url: 'cloud-api-domain/api/domainTopoCreate/setNotMain',
    method: 'post'
  },
  // 获取区域的天峰平谷
  getFpgDay: {
    url: 'cloud-api-energy/api/energy/domain/getFpgDay',
    method: 'post'
  },
  // 获取区域的月峰平谷
  getFpgMonth: {
    url: 'cloud-api-energy/api/energy/domain/getFpgMonth',
    method: 'post'
  },
  // 获取区域的年峰平谷
  getFpgYear: {
    url: 'cloud-api-energy/api/energy/domain/getFpgYear',
    method: 'post'
  },
  //    获取断路器大类列表
  breakerLargeTypeList: {
    url: 'cloud-api-breaker/api/breakerLargeType/queryPageList',
    method: 'post',
  },
  //  新增断路器大类
  breakerLargeTypeAdd: {
    url: 'cloud-api-breaker/api/breakerLargeType/add',
    method: 'post',
  },
  //  断路器大类信息更新
  breakerLargeTypeUpdate: {
    url: 'cloud-api-breaker/api/breakerLargeType/update',
    method: 'post',
  },
  // 断路器大类状态更新
  breakerLargeTypeCchangeStatus: {
    url: 'cloud-api-breaker/api/breakerLargeType/changeStatus',
    method: 'post',
  },
  fileUpload: {
    url: 'cloud-api-sys/api/image/upload',
    method: 'post',
    form: true,
  },


  //  获取字典列表
  sysDictList: {
    url: 'cloud-api-sys/api/dict/queryPageList',
    method: 'post',
  },
  //  新增字典
  sysDictAdd: {
    url: 'cloud-api-sys/api/dict/add',
    method: 'post',
  },
  //  字典信息更新
  sysDictUpdate: {
    url: 'cloud-api-sys/api/dict/update',
    method: 'post',
  },
  //  获取字典子项列表
  subList: {
    url: 'cloud-api-sys/api/dict/sub/queryPageList',
    method: 'post',
  },
  //  字典状态更新
  sysDictStatus: {
    url: 'cloud-api-sys/api/dict/changeStatus',
    method: 'post',
  },
  //  新增字典子项
  subAdd: {
    url: 'cloud-api-sys/api/dict/sub/add',
    method: 'post',
  },
  //  字典子项信息更新
  subUpdate: {
    url: 'cloud-api-sys/api/dict/sub/update',
    method: 'post',
  },
  //  字典子项状态更新
  subChangeStatus: {
    url: 'cloud-api-sys/api/dict/sub/changeStatus',
    method: 'post',
  },
  //  输出0/1 DBGBE
  breakerCmdDbGbe: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdDbGbe',
    method: 'post',
  },
  // 通过图片名称查看图片
  imageview: {
    url: 'cloud-api-sys/api/image/view',
    method: 'get',
  },
  // 站点详情
  getStationByStationCode: {
    url: 'cloud-api-station/api/station/query/getStationByStationCode',
    method: 'get',
  },
  // 打开/关闭 DIDO
  breakerCmdIo: {
    url: 'cloud-api-breaker/api/breaker/cmd/breakerCmdIo',
    method: 'post',
  },
};

export default api;