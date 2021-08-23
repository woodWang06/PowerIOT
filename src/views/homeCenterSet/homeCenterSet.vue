<template>
  <div class="modulebox2 ">
    <div class="modulebox">
      <div class="left scrollWarrphome">
        <div draggable="true" @touchstart="dragstart($event,item,index)" @touchmove="dragstart($event,item,index)" @touchend="dragend($event,index)" @dragstart="dragstart($event,item,index)" @dragend="dragend($event,index)" v-for="(item, index) in arr1" :key="index" v-if="item.display">
          <img :src="require('./../../assets/setoption/'+item.picUrl)">
        </div>
      </div>
      <div class="right scrollWarrphome">
        <div class="flex">
          <div class="drop-field" @drop="drop1" @dragover.prevent>
            <div class="item" v-if="droppedItem1!==''">
              <img :src="require('./../../assets/setoption/'+droppedItem1.picUrl)">
              <i class="el-icon-error" @click="del1()"></i>
            </div>
          </div>
          <div class="drop-field" @drop="drop2" @dragover.prevent>
            <div class="item" v-if="droppedItem2!==''">
              <img :src="require('./../../assets/setoption/'+droppedItem2.picUrl)">
              <i class="el-icon-error" @click="del2()"></i>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="drop-field" @drop="drop3" @dragover.prevent>
            <div class="item" v-if="droppedItem3!==''">
              <img :src="require('./../../assets/setoption/'+droppedItem3.picUrl)">
              <i class="el-icon-error" @click="del3()"></i>
            </div>
          </div>
          <div class="drop-field" @drop="drop4" @dragover.prevent>
            <div class="item" v-if="droppedItem4 !==''">
              <img :src="require('./../../assets/setoption/'+droppedItem4.picUrl)">
              <i class="el-icon-error" @click="del4()"></i>
            </div>
          </div>
        </div>
        <div>
          <el-button class="buntton" @click="okcrim">确定</el-button>
        </div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="dialogFormVisible2" class="dialogSheng" :show-close='false' width="400px">
      <div slot="title" class="dialog-head">
        <img src="../../assets/new/modaltop2.png"> 提示
      </div>
      <div class="radioBox">
        确定是否更换主界面布局？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="langbutton" @click="dialogFormVisible2 = false">否</el-button>
        <el-button class="langbutton" type="primary" @click="goEdit">是</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { Dialog } from 'element-ui';
//导入draggable组件
import api from 'api';
import http from 'http';
import { mapMutations, mapGetters } from 'vuex';
export default {
  //注册draggable组件

  data() {
    return {
      htt: window.IPConfig,
      // getAccountNameCn: {},
      dialogFormVisible2: false,
      //定义要被拖拽对象的数组
      arr1: [
      ],
      arr2: [{ id: 11, name: "常用菜单" }],
      droppedItem1: '',
      droppedItem2: '',
      droppedItem3: '',
      droppedItem4: '',
      index: '',
    };
  },
  components: {
    elDialog: Dialog

  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
    ...mapGetters('login', ['getCustomizeStationList']),

  },
  created() {

    if(this.getCustomizeStationList.length > 0) {
      this.droppedItem1 = JSON.parse(JSON.stringify(this.getCustomizeStationList[0]));
      this.droppedItem2 = JSON.parse(JSON.stringify(this.getCustomizeStationList[1]));
      this.droppedItem3 = JSON.parse(JSON.stringify(this.getCustomizeStationList[2]));
      this.droppedItem4 = JSON.parse(JSON.stringify(this.getCustomizeStationList[3]));
    }
    this.queryCustomizeList();

  },
  methods: {
    ...mapMutations('login', ['setCustomizeStationList']),
    //拖拽完成事件
    add1(e) {
      console.log(e);
    },
    add2(e) {
      console.log(e);
    },
    drop1(event) {
      this.droppedItem1 = JSON.parse(event.dataTransfer.getData('item'))
    },
    drop2(event, index) {
      this.droppedItem2 = JSON.parse(event.dataTransfer.getData('item'))
    },
    drop3(event, index) {
      this.droppedItem3 = JSON.parse(event.dataTransfer.getData('item'))
    },
    drop4(event, index) {
      this.droppedItem4 = JSON.parse(event.dataTransfer.getData('item'))
    },
    dragstart(event, item, index) {
      event.dataTransfer.setData('item', JSON.stringify(item));
      this.index = index;
    },
    del1() {
      this.droppedItem1 = '';
      this.fun()
    },
    del2() {
      this.droppedItem2 = '';
      this.fun()
    },
    del3() {
      this.droppedItem3 = '';
      this.fun()
    },
    del4() {
      this.droppedItem4 = '';
      this.fun()
    },
    dragend(event, index) {
      event.dataTransfer.clearData();
      console.log(this.droppedItem1)
      this.fun()
    },
    fun() {
      console.log(this.droppedItem1)
      this.arr1.forEach((element, index) => {
        if(element.customizeId == this.droppedItem1.customizeId
          || element.customizeId == this.droppedItem2.customizeId
          || element.customizeId == this.droppedItem3.customizeId
          || element.customizeId == this.droppedItem4.customizeId
        ) {
          element.display = false
        } else {
          element.display = true
        }

      });
      this.record = ''
    },
    //列表查询
    queryCustomizeList() {
      http(api.queryCustomizeList, { type: 2 }).then(res => {
        res.forEach(val => {
          val.display = true;
          val.customizeId_Surplus = val.picSort
        })
        this.arr1 = JSON.parse(JSON.stringify(res))

        this.fun()
      })
    },
    //确定按钮
    okcrim() {
      if(this.droppedItem1 != '' && this.droppedItem2 != ''
        && this.droppedItem3 != '' && this.droppedItem4 != ''
      ) {
        this.$confirm('确定是否更换站点主界面布局？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goEdit()
        }).catch(() => {

        });
      } else {
        this.$message.error('请拖拽选择4个展示模块');
      }
    },
    goEdit() {
      let arr = [];
      this.droppedItem1.placeNumber = 1;
      this.droppedItem1.customizeType = 2
      this.droppedItem2.placeNumber = 2;
      this.droppedItem2.customizeType = 2
      this.droppedItem3.placeNumber = 3;
      this.droppedItem3.customizeType = 2
      this.droppedItem4.placeNumber = 4;
      this.droppedItem4.customizeType = 2
      arr.push(this.droppedItem1);
      arr.push(this.droppedItem2);
      arr.push(this.droppedItem3);
      arr.push(this.droppedItem4);
      http(api.saveAccountCustomize, arr).then(res => {
        this.dialogFormVisible2 = false;
        this.$alert("保存成功", "提示", {
          confirmButtonText: '确定',
          callback: action => {
            this.setCustomizeStationList(arr);
            this.$router.push({ name: 'homeCenter' });
          }
        });

      })

    }
  }
};
</script>
<style  lang="less" scoped>
.modulebox2 {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  width: 100%;
  height: 100%;
  margin: 20px 0;
}
.modulebox {
  display: flex;
  width: 100%;
  height: 100%;
  // align-items: center;
  flex-direction: row;
  .left {
    width: 30%;
    height: 100%;
    overflow: auto;
    div {
      margin-bottom: 20px;
    }
    img {
      width: 80%;
    }
  }
  .right {
    padding: 0 80px 0 50px;
    margin-top: 20px;
    background-size: 40% 60%;
    background-position: center center;
    min-height: 100%;
    overflow: auto;
    .flex {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 30px;
      margin-top: 20px;
      height: 50%;
    }
    width: 70%;
    .drop-field {
      align-items: flex-start;
      width: 43%;
      height: 100%;
      // min-height: 400px;
      margin-left: 4%;
      display: inline-block;
      background: #fff;
      background-image: url("../../assets/new/plusIcon.png");
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 20px;
      box-shadow: 1px 1px 3px #ddd;
      position: relative;
      display: inline-block;
      // overflow: hidden;
      .item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fff;
        border-radius: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.el-icon-error {
  font-size: 2.5rem;
  position: absolute;
  top: -1.2rem;
  right: -1.2rem;
  color: #447cdd;
}
.buntton {
  background: rgb(47, 120, 251);
  background-size: 100% 100% !important;
  border: 0 !important;
  color: #fff;
  width: 200px;
  margin-bottom: 20px;
}
.radioBox {
  color: #fff;
  margin-bottom: 20px;
}
</style>