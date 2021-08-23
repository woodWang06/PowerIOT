let router = [
  {
    path: '/home',
    redirect: '/homePage',
    component: () => import('components/common/Home.vue'),
    children: [

      {
        path: '/tree',
        name: 'tree',
        component: () => import('view/tree/tree.vue'),
        meta: {
          title: '设备资产',
        }
      }
      ,
      {
        path: '/treeMag',
        name: 'treeMag',
        component: () => import('view/treeMag/tree.vue'),
        meta: {
          title: '配电结构',
        }
      },
      {
        path: '/productDetails',
        name: 'productDetails',
        component: () => import('view/tree/productDetails.vue'),
        meta: {
          title: '配电详情',
        }
      },

      {
        path: '/equipment',
        name: 'equipment',
        component: () => import('view/equipment/equipment.vue'),
        meta: {
          title: '设备管理',
        }
      },
      {
        path: '/gatewaySet',
        name: 'gatewaySet',
        component: () => import('view/gatewaySet/gatewaySet.vue'),
        meta: {
          title: '网关配置',
        }
      },
      {
        path: '/repairMag',
        name: 'repairMag',
        component: () => import('view/repairMag/repairMag.vue'),
        meta: {
          title: '运维管理',
          keepAlive: true
        }
      },
      {
        path: '/userMag',
        name: 'userMag',
        component: () => import('view/authorityMag/userMag.vue'),
        meta: {
          title: '用户管理',
        }
      },
      {
        path: '/roleMag',
        name: 'roleMag',
        component: () => import('view/authorityMag/roleMag.vue'),
        meta: {
          title: '角色管理',
        }
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: () => import('view/analysis/analysis.vue'),
        meta: {
          title: '能耗分析',
        }
      },
      {
        path: '/stationSet',
        name: 'stationSet',
        component: () => import('view/stationSet/stationSet.vue'),
        meta: {
          title: '项目配置',
        }
      },
      {
        path: '/stationMap',
        name: 'stationMap',
        component: () => import('view/stationSet/stationMap.vue'),
        meta: {
          title: '项目打点',
        }
      },
      {
        path: '/equipmentType',
        name: 'equipmentType',
        component: () => import('view/equipmentType/equipmentType.vue'),
        meta: {
          title: '设备大类',
        }
      },
      {
        path: '/analysisState',
        name: 'analysisState',
        component: () => import('view/analysis/analysisState.vue'),
        meta: {
          title: '能耗统计',
        }
      },
      {
        path: '/welcom',
        name: 'welcom',
        component: () => import('view/welcom/index.vue'),
        meta: {
          title: '欢迎首页',
        }
      },
      {
        path: '/eventMag',
        name: 'eventMag',
        component: () => import('view/alarm/eventMag.vue'),
        meta: {
          title: '事件记录',
        }
      },
      {
        path: '/faultMag',
        name: 'faultMag',
        component: () => import('view/alarm/faultMag.vue'),
        meta: {
          title: '故障预警',
        }
      },
      {
        path: '/dictionary',
        name: 'dictionary',
        component: () => import('view/dictionary/dictionary.vue'),
        meta: {
          title: '字典管理',
        }
      },
      {
        path: '/permission',
        name: 'permission',
        component: () => import('view/permission/permission.vue'),
        meta: {
          title: '菜单管理',
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('view/userInfo/userInfo.vue'),
        meta: {
          title: '个人信息',
        }
      },
      {
        path: '/statustion',
        name: 'statustion',
        component: () => import('view/statustion/statustion.vue'),
        meta: {
          title: '站点信息',
        }
      },
      {
        path: '/control',
        name: 'control',
        component: () => import('view/tree/control.vue'),
        meta: {
          title: '批量控制',
        }
      },

      {
        path: '/analysisData',
        name: 'analysisData',
        component: () => import('view/analysis/analysisData.vue'),
        meta: {
          title: '能效分析',
        }
      },
      {
        path: '/harmonic',
        name: 'harmonic',
        component: () => import('view/analysis/harmonic.vue'),
        meta: {
          title: '谐波监测',
        }
      },
      {
        path: '/electric',
        name: 'electric',
        component: () => import('view/analysis/electric.vue'),
        meta: {
          title: '用电分析',
        }
      },
      {
        path: '/faultDetail',
        name: 'faultDetail',
        component: () => import('view/faultDetail/faultDetail.vue'),
        meta: {
          title: '运维详情',
        }
      },
      {
        path: '/faultDetails',
        name: 'faultDetails',
        component: () => import('view/faultDetail/faultDetails.vue'),
        meta: {
          title: '故障预警详情',
        }
      },
      {
        path: '/homeCenter',
        name: 'homeCenter',
        component: () => import('view/homeCenter/index.vue'),
        meta: {
          title: '项目首页',
        }
      },
      {
        path: '/faultRecording',
        name: 'faultRecording',
        component: () => import('view/faultRecording/faultRecording.vue'),
        meta: {
          title: '故障录波',
        }
      },
      {
        path: '/homeCenterSet',
        name: 'homeCenterSet',
        component: () => import('view/homeCenterSet/homeCenterSet.vue'),
        meta: {
          title: '自定义首页',
        }
      },
      {
        path: '/singleOther',
        name: 'singleOther',
        component: () => import('view/singleLine/singleOther.vue'),
        meta: {
          title: '红外测温',
        }
      },
    ]
  },
  {
    path: '/centerSet',
    name: 'centerSet',
    component: () => import('view/centerSet/centerSet.vue'),
    meta: {
      title: '首页配置',
    }
  },
  {
    path: '/',
    name: 'login',
    component: () => import('view/login/index.vue')
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('view/center/index.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('view/password/password.vue')
  },
  {
    path: '/singleLine',
    name: 'singleLine',
    component: () => import('view/singleLine/singleLine.vue')
  },
  {
    path: '/productDetailsModal',
    name: 'productDetailsModal',
    component: () => import('view/tree/productDetails.vue'),
    meta: {
      title: '配电详情',
    }
  },
]

export default router;