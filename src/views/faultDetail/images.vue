<template>
  <div class="boxsa" @click="handleClose">
    <i class="el-icon-circle-close" @click="handleClose"></i>
    <img :src="objImage.fileContent">
  </div>
</template>

<script>
export default {
  props: {
    objImage: {
      type: Object,
    },
  },
  methods: {
    handleClose() {
      this.$parent.fatherMethod2();
    }
  }
}
</script>

<style lang="less" scoped>
.boxsa {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100000;
  img {
    width: 20%;
  }
  .el-icon-circle-close {
    position: absolute;
    top: 50px;
    right: 100px;
    font-size: 4rem;
  }
}
</style>