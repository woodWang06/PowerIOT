<template>
  <div class="modulebox2 ">
    <TopHeader class="top" :getAccountNameCn='getAccountNameCn' falg='no'></TopHeader>
    <div class="modulebox">
      <div class="left scrollCenter">
        <div draggable="true" @touchstart="dragstart($event,item,index)" @touchmove="dragstart($event,item,index)" @touchend="dragend($event,index)" @dragstart="dragstart($event,item,index)" @dragend="dragend($event,index)" @click="dragstart2($event,item,index)" v-for="(item, index) in arr1" :key="index" v-if="item.display">
          <img class="list" :src="item.imgsrc">
        </div>
      </div>
      <div class="right">
        <div class="flex">
          <div class="drop-field" @drop="drop1" @click="drops1" @click.prevent @dragover.prevent>
            <div class="item" v-if="droppedItem1!==''">
              <img class="list" :src="require('./../../assets/setoption/'+droppedItem1.picUrl)">
              <i class="el-icon-error" @click="del1()"></i>
            </div>
          </div>
          <div class="drop-field" @drop="drop2" @dragover.prevent @click="drops2" @click.prevent>
            <div class="item" v-if="droppedItem2!==''">
              <img class="list" :src="require('./../../assets/setoption/'+droppedItem2.picUrl)">
              <i class="el-icon-error" @click="del2()"></i>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="drop-field" @drop="drop3" @dragover.prevent @click="drops3" @click.prevent>
            <div class="item" v-if="droppedItem3!==''">
              <img class="list" :src="require('./../../assets/setoption/'+droppedItem3.picUrl)">
              <i class="el-icon-error" @click="del3()"></i>
            </div>
          </div>
          <div class="drop-field" @drop="drop4" @dragover.prevent @click="drops4" @click.prevent>
            <div class="item" v-if="droppedItem4 !==''">
              <img class="list" :src="require('./../../assets/setoption/'+droppedItem4.picUrl)">
              <i class="el-icon-error" @click="del4()"></i>
            </div>
          </div>
        </div>
        <div>
          <!-- <el-button class="buntton" @click="okcrim">确定</el-button> -->
          <!-- <div class="dialogSheng"> -->
          <el-button class="langbutton buntton" @click="okcrim">确 认</el-button>
          <el-button class="langbutton buntton" @click="cancel">返 回</el-button>

          <!-- </div> -->
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible2" class="dialogSheng" :show-close='false' width="400px">
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
    </el-dialog>
  </div>
</template>
<script>
import TopHeader from '../center/common/top';
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
        {
          customizeId: 1,
          picSort: 1,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module1.png'),
          picUrl: 'module1.png',
          display: true,
        },
        {
          customizeId: 2,
          picSort: 2,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module2.png'),
          picUrl: 'module2.png',
          display: true,
        },
        {
          customizeId: 3,
          picSort: 3,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module3.png'),
          picUrl: 'module3.png',
          display: true,
        },
        {
          customizeId: 4,
          picSort: 4,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module4.png'),
          picUrl: 'module4.png',
          display: true,
        },
        {
          customizeId: 5,
          picSort: 5,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module5.png'),
          picUrl: 'module5.png',
        },
        {
          customizeId: 6,
          picSort: 6,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module6.png'),
          picUrl: 'module6.png',
          display: true,
        },
        {
          customizeId: 7,
          picSort: 7,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module7.png'),
          picUrl: 'module7.png',
          display: true,
        },
        {
          customizeId: 8,
          picSort: 8,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module8.png'),
          picUrl: 'module8.png',
          display: true,
        },
        {
          customizeId: 9,
          picSort: 9,
          picType: 1,
          imgsrc: require('./../../assets/setoption/module9.png'),
          picUrl: 'module9.png',
          display: true,
        },
      ],
      arr2: [{ id: 11, name: "常用菜单" }],
      droppedItem1: '',
      droppedItem2: '',
      droppedItem3: '',
      droppedItem4: '',
      index: '',
      record: ''
    };
  },
  components: {
    TopHeader,
    elDialog: Dialog

  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
    ...mapGetters('login', ['getCustomizeTopList']),

  },
  created() {

    if(this.getCustomizeTopList.length > 0) {
      this.droppedItem1 = JSON.parse(JSON.stringify(this.getCustomizeTopList[0]));
      this.droppedItem2 = JSON.parse(JSON.stringify(this.getCustomizeTopList[1]));
      this.droppedItem3 = JSON.parse(JSON.stringify(this.getCustomizeTopList[2]));
      this.droppedItem4 = JSON.parse(JSON.stringify(this.getCustomizeTopList[3]));
    }
    this.fun();

  },
  methods: {
    ...mapMutations('login', ['setCustomizeTopList']),
    //拖拽完成事件
    add1(e) {
      console.log(e);
    },
    add2(e) {
      console.log(e);
    },
    drop1(event) {
      this.droppedItem1 = JSON.parse(this.record)
    },
    drop2(event, index) {
      this.droppedItem2 = JSON.parse(this.record)
    },
    drop3(event, index) {
      this.droppedItem3 = JSON.parse(this.record)
    },
    drop4(event, index) {
      this.droppedItem4 = JSON.parse(this.record)
    },
    drops1(event) {
      this.droppedItem1 = JSON.parse(this.record);
      this.fun()
    },
    drops2(event, index) {
      this.droppedItem2 = JSON.parse(this.record);
      this.fun()
    },
    drops3(event, index) {
      this.droppedItem3 = JSON.parse(this.record);
      this.fun()
    },
    drops4(event, index) {
      this.droppedItem4 = JSON.parse(this.record);
      this.fun()
    },
    dragstart(event, item, index) {
      // event.dataTransfer.setData('item', JSON.stringify(item));
      event.dataTransfer.setData('item', JSON.stringify(item));
      this.record = JSON.stringify(item)
      this.index = index;
    },
    dragstart2(event, item, index) {
      // event.dataTransfer.setData('item', JSON.stringify(item));
      // event.dataTransfer.setData('item', JSON.stringify(item));
      this.record = JSON.stringify(item)
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
        this.record = ''
      });

    },
    //列表查询
    queryCustomizeList() {
      // http(api.queryCustomizeList, { type: 1 }).then(res => {
      //   res.forEach(val => {
      //     val.display = true;

      //   })
      //   this.arr1 = JSON.parse(JSON.stringify(res))

      //   this.fun()
      // })
    },
    //确定按钮
    okcrim() {
      if(this.droppedItem1 != '' && this.droppedItem2 != ''
        && this.droppedItem3 != '' && this.droppedItem4 != ''
      ) {
        this.dialogFormVisible2 = true
      } else {
        this.$message.error('请拖拽选择4个展示模块');
      }
    },
    goEdit() {
      let arr = [];
      this.droppedItem1.placeNumber = 1;
      this.droppedItem1.customizeType = 1
      this.droppedItem2.placeNumber = 2;
      this.droppedItem2.customizeType = 1
      this.droppedItem3.placeNumber = 3;
      this.droppedItem3.customizeType = 1
      this.droppedItem4.placeNumber = 4;
      this.droppedItem4.customizeType = 1
      arr.push(this.droppedItem1);
      arr.push(this.droppedItem2);
      arr.push(this.droppedItem3);
      arr.push(this.droppedItem4);
      http(api.saveAccountCustomize, arr).then(res => {
        this.dialogFormVisible2 = false;
        this.$alert("保存成功", "提示", {
          confirmButtonText: '确定',
          callback: action => {
            this.setCustomizeTopList(arr);
            this.$router.push({ name: 'center' });
          }
        });

      })

    },
    cancel() {
      this.$router.push({ name: 'center' });
    }
  }
};
</script>
<style  lang="less" scoped>
.modulebox2 {
  background-image: url(../../assets/new/centerBg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  width: 100%;
  height: 100%;
}
.modulebox {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: row;
  .left {
    width: 30%;
    height: 100%;
    overflow: auto;
    img {
      width: 70%;
    }
  }
  .right {
    padding: 0 80px 0 50px;
    margin-top: 20px;
    background: url("../../assets/new/moduleBgmap.png") no-repeat;
    background-size: 40% 60%;
    background-position: center center;
    .flex {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }
    width: 70%;
    .drop-field {
      width: 27%;
      min-height: 200px;
      margin-left: 4%;
      display: inline-block;
      background: url("../../assets/new/moduleBg.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
      .item {
        width: 100%;
        height: 100%;
        position: relative;
        background: #00074c;
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
  background: url("../../assets/new/modulebutton.png") no-repeat !important;
  background-size: 100% 100% !important;
  border: 0 !important;
  color: #fff;
  width: 200px;
}
.radioBox {
  color: #fff;
  margin-bottom: 20px;
}
.list:active {
  box-shadow: 0px 0px 5px #447cdd;
}
</style>