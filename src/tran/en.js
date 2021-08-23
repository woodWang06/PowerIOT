// let En = {
//   login: 'login',
//   usePlaceholder: 'Please enter your user name',
//   passwordPlaceholder: 'Please enter your login password'
// }
// // Vue.prototype.$lange = cn
// export default { En }
module.exports = {
  login: {
    login: 'login',
    usePlaceholder: 'Please enter your user name',
    passwordPlaceholder: 'Please enter your login password'
  },
  center: {
    topTitle: 'Intelligent Power Distribution Data Monitoring'
  },
  button: {
    search: 'Search',
    add: 'Add',
    edit: 'Edit',
    suspend: 'Suspend',
    operate: 'Operate',
    setBreakpoints: 'Set Breakpoints',
    enable: 'Enable',
    delete: 'Delete',
    resetPassword: 'Reset password',
    cancel: 'cancel',
    confirm: 'confirm',
    authority: 'Authority',
    save: 'Save',
    back: 'Back'
  },
  table: {
    operate: 'Operate',
    remarks: 'Remarks'
  },
  timeModal: {
    dateTimeChoose: 'Choose time and date'
  },
  stationSet: {
    table0: 'Project Name',
    table1: 'Number of project persons',
    table2: 'Project area(m²)',
    table3: 'Project addres',
    table4: 'Project coordinates',
    table5: 'Is it the key building',
    table6: 'Operate',
  },
  userMag: {
    personnelManagement: 'Personnel management',
    logintime: 'Login time',
    userAccount: 'User account',
    role: 'Role',
    table0: 'User account',
    table1: 'User name',
    table2: 'The project',
    table3: 'User role',
    table4: 'Contact number',
    table5: 'Last login Time',
  },
  roleMag: {
    roleID: 'Role ID',
    roleName: 'Role name',
    stopStatus: 'Stop status'
  },
  permission: {
    menuTitle: 'Menu title',
    menuId: 'Menu ID',
    menuSorting: 'Menu sorting',
    parentMenu: 'Parent menu',
    menuCode: 'Menu code',
    menuType: 'Menu type',
    categoryMenu: 'Menu category',
    strategyAuthority: "Authority strategy",
    path: "Path",
    iconMenu: "Menu icon",
    leafNode: "Is it the leaf node",
    description: 'Description'
    // Menu sorting: '项目首页',
  },
  equipmentType: {
    categoryEquipment: 'Equipment category',
    categoryName: 'Equipment category name',
    statusEnable: 'Enable status'
  },
  dictionaryName: {
    dictionaryName: 'Name of dictionary',
    dictionaryCode: 'Dictionary code',
    statusEnable: 'Enable status',
    subitem: 'Subitem',
    editSubitem: 'Edit the subitem',
    dictionaryValue: 'Dictionary value',
    dictionaryKey: 'Dictionary key',
    dictionarySequence: 'Dictionary sequence',
    state: 'State',
  },
  homePage: {
    title1: "Power supply by main power source",
    title2: "Power supply by the bus-tie power source",
    title3: "Energy consumption curve",
    title4: "Real-time current/voltage",
    title5: "Proportion of online/offline devices",
    title6: "Proportion of closed/opened devices",
    title7: "Proportion of normal/alarm/fault devices",
    nameCircuit: 'Circuit name',
    addressGateway: 'Gateway address',
    nameEquipment: 'Equipment name',
    addressEquipment: 'Equipment address',
    statusOpenClose: 'Open/close status',
    today: 'Today',
    yesterday: 'Yesterday',
    month: 'This month',
    current: 'Current',
    voltage: 'Voltage',
    aPhase: 'A Phase',
    bPhase: 'B Phase',
    cPhase: 'C Phase',
    deviceOffline: 'Offline device',
    deviceOnline: 'Online device',
    deviceOpening: 'Opening device',
    deviceClosing: 'Closing device',
    normal: 'Normal',
    alarm: 'Alarm',
    fault: 'Fault',
    time: 'time'
  },
  tree: {
    controlBatch: 'Equipment batch control',
    selectioList: 'Equipment selection list',
    openingControl: 'Control of opening and closing',
    openingRemote: 'Remote one-key opening',
    closingRemote: 'Remote one-key closing',
    ControlTimed: 'Timed control',
    timeControlBatch: 'Batch add timed control'
  },
  analysis: {
    tab1: "Comparison of energy consumption for three years",
    tab2: "Year-on-year comparison of energy consumption",
    tab3: "Month-on-month comparison of energy consumption",
    tab4: "Analysis of energy consumption trend",
    tab5: "Time-based analysis of energy consumption",
    tab6: "Analysis of leakages",
    chartData: 'Data chart',
    download: 'Download',
    tableData: 'Data table',
  },
  faultMag: {
    timeUpdate: "Update time",
    equipment: "Equipment",
    unread: "Unread",
    read: "Read",
    batchMark: "Batch mark as read",
    table1: "Emergency level",
    table2: 'Fault type',
    table3: 'Fault time',
    table4: "Device name",
    table5: "Gateway/Equipment address",
    table6: 'The local region',
  },
  alarmInfo: {
    typeAlarm: 'Alarm type',
    timeAlarm: 'Alarm time'
  },
  eventMag: {
    typeEvent: 'Event Type',
    timeEvent: 'Event time'
  },
  repairMag: {
    handledBe: 'To be handled',
    handled: 'Handled',
    typeWork: 'Work word type',
    orderLevel: 'Work order level',
    deviceRepair: 'Repair device',
    position: 'Position',
    userExecute: 'Execute user',
    maintenanceStatus: 'Maintenance status',
    submitUser: 'Submit user',
    workTask: 'Work task',
    requiredTime: 'Required time',
  },
  equipment: {
    equipmentCategory: 'Equipment category',
    gatewayAddress: 'Gateway address',
    gatewayAddressTS: 'Choose the gateway address',
    equipmentCategoryTS: 'Choose the equipment category',
    equipmentName: 'Equipment name',
    project: 'Project',
    region: 'Region',
    equipmentAddress: 'Equipment address',
    protectionParameter: 'Protection parameter',
    bindingGateway: 'Binding gateway'
  },
  gatewaySet: {
    gatewayName: 'Gateway name',
    projectName: 'Project Name',
    gatewayAddress: 'Gateway address',
    startstopStatus: 'Start/stop status',
    frequencyCommunication: 'Communication frequency',
    frequencyEdit: 'Edit the communication frequency',
    upload: 'Upload',
    release: 'Release',
    releaseRecord: 'Release record',
    uploadRecord: ' Upload record',
    frequencyCommunicationM: 'Communication frequency (m)',
    record: "Record"
  }

}