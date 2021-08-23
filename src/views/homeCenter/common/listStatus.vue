<template>
  <div class="seamless-warps scrollWarrp">
    <div class='one colorBg1'>
      <span class="color1 pan"></span>
      <span>故障</span>
      <span class="color">{{datas.fault}}</span>
    </div>
    <div class='one colorBg2'>
      <span class="color2 pan"></span>
      <span>预警</span>
      <span class="color">{{datas.warning}}</span>
    </div>
    <div class='one colorBg3'>
      <span class="color3 pan"></span>
      <span>离线</span>
      <span class="color">{{datas.offline}}</span>
    </div>
    <div class='one colorBg3'>
      <span class="color3 pan"></span>
      <span>在线</span>
      <span class="color">{{datas.online}}</span>
    </div>
    <div class='one colorBg4'>
      <span class="color4 pan"></span>
      <span>分闸</span>
      <span class="color">{{datas.open}}</span>
    </div>
    <div class='one colorBg4'>
      <span class="color4 pan"></span>
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
  height: 90%;
  margin-bottom: 10px;
  .one {
    display: inline-block;
    width: 42%;
    margin-right: 3%;
    vertical-align: middle;
    color: #748194;
    font-size: 1.4rem;
    line-height: 4rem;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: left;
    img {
      vertical-align: middle;
      margin-right: 20px;
    }
    .color {
      color: #000000;
      font-size: 1.6rem;
      margin-left: 20px;
      font-weight: bold;
    }
  }
}
.color1 {
  background: #ff7575;
}
.color2 {
  background: #ffba6a;
}
.color3 {
  background: #3d7eff;
}
.color4 {
  background: #d7dde8;
}
.colorBg1 {
  background: rgba(255, 117, 117, 0.1);
}
.colorBg2 {
  background: rgba(255, 189, 113, 0.1);
}
.colorBg3 {
  background: rgba(61, 126, 255, 0.1);
}
.colorBg4 {
  background: rgba(143, 153, 173, 0.1);
}
.pan {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  margin-right: 10px;
  vertical-align: middle;
  margin-left: 20px;
}
</style>