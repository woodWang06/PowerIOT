<template>
  <div class="tags" v-if="showTags">
    <!-- <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)" v-if="index!=0"><i class="el-icon-close" :class="{'active2': isActive(item.path)}" color="#6B7A98"></i></span>
      </li>
    </ul> -->
    <el-tabs v-model="modd" type="card">
      <el-tab-pane v-for="(item, index) in tagsList" :key="index">
        <div slot="label" class="tags-li" :class="{'active': isActive(item.path)}">
          <router-link :to="item.path">
            {{item.title}}
          </router-link>
          <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="tags-close-box">
      <el-dropdown size="small" @command="handleTags">
        <el-button size="mini">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script>
import bus from './bus';
import { Tabs, TabPane, DropdownItem } from 'element-ui';
export default {
  components: {
    elTabs: Tabs,
    elTabPane: TabPane,
    // elDropdownItem: DropdownItem
    modd: ''
  },
  data() {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive(path) {
      // debugger
      let path2 = ''
      if(path.indexOf('?') == '-1') {
        path2 = path
      } else {
        path2 = path.split('?')[0]
      }
      if(path2 === this.$route.path) {
        return true
      } else {
        return false
      }

    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if(item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push('/welcom');
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [{ name: 'welcom', path: '/welcom', title: '欢迎页' }];
      this.$router.push({ name: 'welcom' });
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      })
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.name === route.name;
      })

      if(!isExist) {
        // if(this.tagsList.length >= 8) {
        //   this.tagsList.shift();
        // }
        if(route.name == 'productDetails' && this.tagsList.length == 0) {
          this.tagsList.push({
            title: "设备资产",
            path: '/tree',
            name: 'tree'
          })
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name
        })
      }
      bus.$emit('tags', this.tagsList);
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.modd = newValue.path
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
    this.modd = this.$route.path
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {

      for(let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if(item.path === this.$route.fullPath) {
          if(i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if(i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push('/welcom');
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    })
  }
}

</script>


<style>
.tags {
  position: relative;
  height: 55px;
  overflow: hidden;
  background: #f9fbfc;
  width: 100%;
  padding: 0 20px;
  /* box-shadow: 0 5px 10px #ddd; */
  border-radius: 0 0 10px 10px;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 10px 15px 2px 3px;
  border-radius: 6px;
  font-size: 1.2rem;
  overflow: hidden;
  cursor: pointer;
  height: 33px;
  line-height: 33px;
  /* border: 1px solid #e9eaec; */
  color: #8c97a2;
  background: #fff;
  padding: 0 10px 0 12px;
  vertical-align: middle;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  border: 1px solid #d6dbdf;
}
.tags-li i {
  color: #e4e7ed;
  /* margin-left: 10px; */
}
.tags-li:not(.active):hover {
  /* background: #f8f8f8; */
}

.tags-li.active {
  color: #537ffd;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  margin-right: 25px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #537ffd;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 4px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  /* box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1); */
  z-index: 10;
}
.active {
  /* background: #f0f0f0; */
}
.active2 {
  color: #6b7a98 !important;
}
.tags-li a {
  color: #8c97a2;
  font-weight: normal;
}
.active a {
  color: #537ffd;
  font-weight: normal;
}
.tags .tags-li-icon i:hover {
  background: #fff !important;
  color: #8c97a2 !important;
}
.tags .tags-li-icon i {
  display: inline-block !important;
  font-size: 1.5rem !important;
  width: 1.5rem !important;
}
.tags .el-tabs__nav {
  border: none !important;
  line-height: none !important;
  margin-bottom: none !important;
  margin-left: 5px !important;
}
.tags .el-tabs__item {
  border: none !important;
  padding: 0 !important;
}
</style>
