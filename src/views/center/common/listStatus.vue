<template>
  <div class="seamless-warps scrollCenter">
    <div class='one'>
      <img src="../../../assets/new/statusicon1.png">
      <span>故障</span>
      <span class="color">{{datas.fault}}</span>
    </div>
    <div class='one'>
      <img src="../../../assets/new/statusicon2.png">
      <span>预警</span>
      <span class="color">{{datas.warning}}</span>
    </div>
    <div class='one'>
      <img src="../../../assets/new/statusicon3.png">
      <span>离线</span>
      <span class="color">{{datas.offline}}</span>
    </div>
    <div class='one'>
      <img src="../../../assets/new/statusicon4.png">
      <span>在线</span>
      <span class="color">{{datas.online}}</span>
    </div>
    <div class='one'>
      <img src="../../../assets/new/statusicon5.png">
      <span>分闸</span>
      <span class="color">{{datas.open}}</span>
    </div>
    <div class='one'>
      <img src="../../../assets/new/statusicon6.png">
      <span>合闸</span>
      <span class="color">{{datas.close}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeId: '',
      sday: '',
      wearther: {},
    }
  },
  props: {
    datas: {
      type: Object,
    },

  },
}
</script>

<style lang="less" scoped>
.seamless-warps {
  width: 98%;
  overflow: auto;
  padding-bottom: 10px;
  // height: 90%;
  margin-bottom: 10px;
  .one {
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    color: #fff;
    font-size: 1.6rem;
    line-height: 6rem;
    height: 6rem;
    text-align: left;
    overflow: hidden;
    img {
      vertical-align: middle;
      margin: 0 10px 0 10px;
    }
    .color {
      color: #de731c;
      margin-left: 15px;
    }
  }
}
</style>