// let Cn = {
//   login: '登录',
//   usePlaceholder: '请输入用户名',
//   passwordPlaceholder: '请输入登录密码'
// }
// export default { Cn }
module.exports = {
  login: {
    moblogin: '手机登录',
    userlogin: '密码登录',
    login: '登录',
    usePlaceholder: '请输入用户名',
    mobPlaceholder: '请输入手机号',
    passwordPlaceholder: '请输入密码',
    codePlaceholder: '请输入验证码',
  },
  center: {
    topTitle: '智能配电数据监控'
  },
  button: {
    search: '查询',
    add: '新增',
    edit: '编辑',
    suspend: '停用',
    operate: '操作',
    setBreakpoints: '打点',
    enable: '启用',
    delete: '删除',
    resetPassword: '重置密码',
    cancel: '取消',
    confirm: '确定',
    authority: '权限',
    save: '保存',
    back: '返回',
    readMarked: '标记已读',
  },
  table: {
    operate: '操作',
    remarks: '备注'
  },
  timeModal: {
    dateTimeChoose: '选择日期时间'
  },
  stationSet: {
    table0: '项目名称',
    table1: '项目人数',
    table2: '项目面积(m²)',
    table3: '项目地址',
    table4: '项目坐标',
    table5: '是否重点建筑',
    table6: '操作',

  },
  userMag: {
    personnelManagement: '人员管理',
    logintime: '登录时间',
    userAccount: '用户账号',
    role: '角色',
    table0: '用户账号',
    table1: '用户姓名',
    table2: '所属项目',
    table3: '用户角色',
    table4: '联系电话',
    table5: '最后登录',
  },
  roleMag: {
    roleID: '角色ID',
    roleName: '角色名',
    stopStatus: '停用状态'
  },
  permission: {
    menuTitle: '菜单标题',
    menuId: '菜单ID',
    menuSorting: '菜单排序',
    parentMenu: '父级菜单',
    menuCode: '菜单编码',
    menuType: '菜单类型',
    categoryMenu: '菜单类别',
    strategyAuthority: "权限策略",
    path: "路径",
    iconMenu: "菜单图标",
    leafNode: "是否叶子节点",
    description: '描述'
    // Menu sorting: '项目首页',
  },
  equipmentType: {
    categoryEquipment: '设备大类',
    categoryName: '设备大类名称',
    statusEnable: '启用状态'
  },
  dictionaryName: {
    dictionaryName: '字典名称',
    dictionaryCode: '字典编码',
    statusEnable: '启用状态',
    subitem: '子项',
    editSubitem: '编辑子项',
    dictionaryValue: '字典值',
    dictionaryKey: '字典键',
    dictionarySequence: '字典顺序',
    state: '状态',
  },
  homePage: {
    title1: "主电源供电",
    title2: "母联电源供电",
    title3: "能耗曲线",
    title4: "实时电流/电压",
    title5: "在线/离线设备占比",
    title6: "合闸/分闸设备数量占比",
    title7: "正常/报警/故障设备占比",
    nameCircuit: '回路名称',
    addressGateway: '网关地址',
    nameDevice: '设备名称',
    addressDevice: '设备地址',
    statusOpenClose: '分闸/合闸状态',
    today: '今日',
    yesterday: '昨日',
    month: '本月',
    current: '电流',
    voltage: '电压',
    aPhase: 'A相',
    bPhase: 'B相',
    cPhase: 'C相',
    deviceOffline: '离线设备',
    deviceOnline: '在线设备',
    deviceOpening: '分闸设备',
    deviceClosing: '合闸设备',
    normal: '正常',
    alarm: '报警',
    fault: '故障',
    time: '时间'
  },
  tree: {
    controlBatch: '设备批量控制',
    selectioList: '设备选择列表',
    openingControl: '分合闸控制',
    openingRemote: '远程一键分闸',
    closingRemote: '远程一键合闸',
    ControlTimed: '定时控制',
    timeControlBatch: '批量新增定时控制'
  },
  analysis: {
    tab1: "能耗三年对比分析",
    tab2: "能耗同比分析",
    tab3: "能耗环比分析",
    tab4: "能耗趋势分析",
    tab5: "能耗分时分析",
    tab6: "跑冒滴漏分析",
    chartData: '数据图表',
    download: '下载',
    tableData: "数据表格",
  },
  faultMag: {
    timeUpdate: "更新时间",
    equipment: "设备",
    unread: "未读",
    read: "已读",
    batchMark: "批量标记已读",
    table1: "紧急程度",
    table2: '故障类型',
    table3: '故障时间',
    table4: "设备名称",
    table5: "网关/设备地址",
    table6: '所属区域',
  },
  alarmInfo: {
    typeAlarm: '报警类型',
    timeAlarm: '报警时间'
  },
  eventMag: {
    typeEvent: '事件类型',
    timeEvent: '事件时间'
  },
  repairMag: {
    handledBe: '待处理',
    handled: '已处理',
    typeWork: '工单类型',
    orderLevel: '工单等级',
    deviceRepair: '维修设备',
    position: '所属位置',
    userExecute: '执行用户',
    maintenanceStatus: '维修状态',
    submitUser: '提交用户',
    workTask: '工作任务',
    requiredTime: '要求时间'
  },

  equipment: {
    equipmentCategory: '设备大类',
    gatewayAddress: '网关地址',
    gatewayAddressTS: '请选择网关地址',
    equipmentCategoryTS: '请选择设备大类',
    equipmentName: '设备名称',
    project: '项目',
    region: '区域',
    equipmentAddress: '设备地址',
    protectionParameter: '保护参数',
    bindingGateway: '绑定网关'
  },
  gatewaySet: {
    gatewayName: '网关名称',
    projectName: '项目名称',
    gatewayAddress: '网关地址',
    startstopStatus: '启停状态',
    frequencyCommunication: '通讯频率',
    frequencyEdit: '编辑通讯频率',
    upload: '上送',
    release: '下发',
    releaseRecord: '下发记录',
    uploadRecord: '上送记录',
    frequencyCommunicationM: '通讯频率(分钟)',
    record: "记录",
    // Key words: '关键字'
  }
}