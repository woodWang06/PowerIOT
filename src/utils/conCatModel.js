let options = {
  trialParam: [
    {
      value: '0100',
      key: '过载保护'
    },
    {
      value: '0101',
      key: '过压保护'
    },
    {
      value: '1001',
      key: '接地'
    },

  ],
  isParam: [
    {
      value: '1',
      key: '不脱扣'
    },
    {
      value: '0',
      key: '脱扣'
    },

  ],
  isLeaf: [
    {
      value: 1,
      key: '是'
    },
    {
      value: 0,
      key: '否'
    },
  ],
  menuClass: [
    {
      value: 0,
      key: '数据展示平台'
    },
    {
      value: 1,
      key: '控制台'
    },

    {
      value: 2,
      key: '其它'
    },

  ],
  menuType: [
    {
      value: 0,
      key: '一级菜单'
    },
    {
      value: 1,
      key: '子菜单'
    },

    {
      value: 2,
      key: '按钮权限'
    },
  ],
  permsType: [
    {
      value: 1,
      key: '显示'
    },

    {
      value: 2,
      key: '禁用'
    },
  ],
  timeList: [
    {
      label: '周一',
      value: 1
    },
    {
      label: '周二',
      value: 2
    },
    {
      label: '周三',
      value: 3
    },
    {
      label: '周四',
      value: 4
    },
    {
      label: '周五',
      value: 5
    },
    {
      label: '周六',
      value: 6
    },
    {
      label: '周天',
      value: 7
    },

  ],
  criticality: [{
    label: '高',
    value: 1
  },
  {
    label: '中',
    value: 2
  },
  {
    label: '低',
    value: 3
  },
  ]
};
let dictionaries = {
  isOff: {
    'true': '是',
    'false': '否'
  },
  deleteFlag: {
    1: '停用',
    0: '启用'
  },

  isLeaf: {
    1: '是',
    0: '否'
  },
  menuClass: {
    0: '数据展示平台',
    1: '控制台',
    2: '其它',
  },
  menuType: {
    0: '一级菜单',
    1: '子菜单',
    2: '按钮权限',
  },
  permsType: {
    1: '显示',
    2: '禁用',
  },
  timeList: {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周天',
  },
  timeList: {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周天',
  },
  criticality: {
    1: '高',
    2: '中',
    3: '低',
  },
  repairLevel: {
    1: '高',
    2: '中',
    3: '低',
  },
  repairState: {
    0: '待处理',
    3: '处理中',
    9: '已处理',
    6: '待审核',
  }
};
export default { options, dictionaries }