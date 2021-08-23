<template>
  <div class="container contents">
    <div class="words">
      您好！{{userData}}<br>
      欢迎访问良信电器智能配电云平台!
    </div>
    <img class="imgs" src="../../assets/center/welcom.png">
  </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      userData: '',
    }
  },
  computed: {
    ...mapGetters('login', ['getAccountNameCn']),
  },
  created() {
    this.userData = this.getAccountNameCn.accountNameCn
  },
  mounted() {

  },
  methods: {

  },

}
</script>  
<style lang="less" scoped>
.content {
  position: relative;
}
.words {
  background-image: -webkit-linear-gradient(bottom, #21d2f9, #1d6edf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  margin-top: 100px;
  margin-left: 200px;
}
.imgs {
  width: 50%;
  position: absolute;
  bottom: 0px;
  left: 20%;
}
</style>