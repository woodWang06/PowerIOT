<template>
  <div class="single">
    <img class="imgClass" src="../../assets/newW/noquanp.png" @click="goallshow">
    <div class="ifrem">
      <iframe class="ifremBOX" width="100%" height='100%' src="https://magic.sh-liangxin.com:38080/share?url=displays/74199f94-6a03-44ae-ad1f-c9e77be95cf8.json"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  created() {

  },
  mounted() {
    this.fullScreenLoad()
  },
  beforeDestroy() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if(document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },
  destroyed() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if(document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },
  methods: {

    fullScreenLoad() {
      if(document.body.requestFullscreen) {
        document.body.requestFullscreen();
      } else if(document.body.mozRequestFullScreen) {
        document.body.mozRequestFullScreen();
      } else if(document.body.webkitRequestFullScreen) {
        document.body.webkitRequestFullScreen();
      } else if(document.body.msRequestFullscreen) {
        document.body.msRequestFullscreen();
      }

    },
    goallshow() {
      this.$router.push(
        {
          path: "/tree",
          query: {
            flag: 0,
          }        }
      );
    }
  }
}
</script>

<style lang="less" scoped>
.single {
  background: #3d3d3d;
  height: 100%;
  text-align: right;
}
.ifrem {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.ifrem {
  border: 0 !important;
  .ifremBOX {
    border: 0 !important;
  }
}
.imgClass {
  position: fixed;
  width: 25px;
  top: 20px;
  right: 20px;
}
</style>