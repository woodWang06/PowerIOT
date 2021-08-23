<template>
  <div>
    <el-dialog title="验收信息" class="dialogClass" :visible.sync="dialog" :close-on-click-modal="false" :before-close="handleClose" width="800px">
      <div v-if="dialog">
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon4.png'><span>真实原因</span>
          </div>
          <div class="b_datas">
            <div class="words">
              <el-input type="textarea" placeholder="请填写" :autosize="{minRows: 3,maxRows: 7}" v-model="obj.realReason" maxlength="200" show-word-limit>
              </el-input>
            </div>
          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon5.png'><span>处理方案</span>
          </div>
          <div class="b_datas">
            <div class="words">
              <el-input type="textarea" placeholder="请填写" :autosize="{minRows: 3,maxRows: 7}" v-model="obj.realSolution" maxlength="200" show-word-limit>
              </el-input>
            </div>
          </div>
        </div>
        <div class="detailBox">
          <div class="title"><img src='../../assets/newW/detailicon6.png'><span>附件</span>
          </div>
          <div class="b_datas">
            <div class=" imageBox unpdow">
              <div class="title"> <img src="../../assets/newW/fd_fjicon.png"><span>{{imageName?imageName:'请上传附件，支持png/jpg/jpeg等格式'}}</span></div>
              <div class="wooor" @click="upImg">上传资料</div>
              <div class="fileInput" v-show="false">
                <input type="file" id="Updateimage" lay-verify="required" @change="toBase64()" accept="image/jpeg, image/png, image/jpg" />
              </div>
            </div>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer-center">
        <el-button type="primary" @click="sumbit">
          提交验收
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog, Tag } from 'element-ui';
import http from 'http';
import api from 'api';
export default {
  components: {
    elDialog: Dialog,
    elTag: Tag
  },
  data() {
    return {
      // dialog: true,
      imageUrl: '',
      obj: {},
      imageName: ''
    }
  },
  props: {
    repairId: {
      type: String,
      default: ''
    },
    dialog: {
      type: Boolean,
      default: ''
    }
  },
  methods: {
    toBase64() {

      var that = this
      var file = document.querySelector('input[type=file]').files[0];
      debugger
      if(file.type != 'image/jpeg' && file.type == 'image/png' && file.type == 'image/jpg') {
        this.$message({
          type: "warning",
          message: '请上传正确的图片格式'
        });
        return
      }

      console.log("base64", file)
      var reader = new FileReader();
      reader.onloadend = function() {
        // $("#base64Img").attr("style", "display:inline-block");
        // $("#base64Img").attr("src", reader.result);
        //把转换后的数据给id为base64Img的src属性
        console.log(file);
        that.imageName = file.name
        // that.imageUrl = reader.result
        let result = reader.result
        let img = new Image()
        img.src = result
        console.log('********未压缩前的图片大小********')
        console.log(result.length / 1024)
        img.onload = function() {
          that.imageUrl = that.compress(img, 0.1)
        }
        // that.updataImg()
        //这里调用了向后台发请求的代码
      }
      if(file) {
        reader.readAsDataURL(file);

      }
      // debugger
    },
    // 压缩图片
    compress(img, size) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', size)
      console.log('*******压缩后的图片大小*******')
      // console.log(ndata)
      console.log(ndata.length / 1024)
      return ndata
    },
    sumbit() {
      console.log('this.imageUrl', this.imageUrl)
      let arr = [];
      let obj = {}
      if(this.imageUrl) {
        arr.push(this.imageUrl);
        obj = {
          ...this.obj,
          repairFiles: arr,
          repairId: this.repairId
        }
      } else {
        obj = {
          ...this.obj,
          repairId: this.repairId
        }
      }

      console.log(JSON.stringify(obj))
      http(api.toAudit, obj).then(res => {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.handleClose()
      });
    },

    handleClose(done) {
      this.$parent.fatherMethod();
    },
    upImg() {
      let allClick = document.getElementById("Updateimage");
      allClick.click()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./less/less";
.fileInput {
  opacity: 0;
}
</style>