<template>
  <div class="sidebar">

    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#2e4d90" text-color="#fff" active-text-color="#fff" :unique-opened="false" router>
      <div class="collapse-btn" @click="collapseChage">
        <i v-if="collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <template v-for="item in items">
        <!-- -->
        <template v-if="item.subs">
          <el-submenu :index="item.url" :key="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <!-- -->
              <el-submenu v-if="subItem.subs" :index="subItem.url" :key="subItem.url">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.url">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item class="secound_menu" v-else :index="subItem.url" :key="subItem.url">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
import { Menu, Submenu, MenuItem, MenuItemGroup, Tooltip } from 'element-ui';
import { mapMutations, mapGetters } from 'vuex';
export default {
  components: {
    elMenu: Menu,
    elSubmenu: Submenu,
    elMenuItem: MenuItem,
    elMenuItemGroup: MenuItemGroup,
    elTooltip: Tooltip
  },
  data() {
    return {
      collapse: false,
      items: [],
      colors: 'transparent',
      collapse: false,
    };
  },
  computed: {
    ...mapGetters('login', ['getEntrance']),
    ...mapGetters('login', ['getAccountNameCn']),
    ...mapGetters('login', ['getSinglenum']),
    onRoutes() {
      // if(this.$route.name == 'tree') {
      //   this.setSinglenum('0')
      // }
      return this.$route.path;
    }
  },
  mounted() {
    if(document.body.clientWidth < 500) {
      this.collapseChage();
    }
  },
  created() {
    if(this.getEntrance == 'status') {
      this.items = this.getAccountNameCn.dataPermissionList
    } else if(this.getEntrance == 'consloe') {
      this.items = this.getAccountNameCn.consolePermissionList
    }
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  methods: {
    ...mapMutations('login', ['setSinglenum']),
    // 侧边栏折叠
    // onRoutes() {
    //   // if(this.$route.name == 'tree') {
    //   //   this.setSinglenum('0')
    //   // }
    //   debugger
    //   return this.$route.path;
    // },
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 160px;
}
.sidebar > ul {
  min-height: 100%;
}
.secound_menu {
  padding-left: 55px !important;
}
.third_menu {
  padding-left: 75px !important;
}
.is-active {
}
.is-active > i {
  /* background-image: -webkit-linear-gradient(top, #658af5, #82c9fa) !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}
.collapse-btn {
  /* float: left; */
  padding: 0 11px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  font-size: 2rem;
}
.el-submenu__title i {
  color: #fff !important;
}
.el-menu-item i {
  color: #fff !important;
}
.el-menu-item {
  padding: 0 10px !important;
  margin-bottom: 10px;
}
.secound_menu {
  padding-left: 40px !important;
}
.el-submenu__title {
  padding: 0 10px !important;
}
.el-submenu {
  padding: 0 0px !important;
  margin-bottom: 10px;
}
.el-tooltip {
  padding: 0 0 !important;
}
.el-menu {
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
