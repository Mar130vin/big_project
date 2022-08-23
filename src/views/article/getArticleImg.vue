<template>
  <div>
    <el-form >
        <img class="the_img" v-if="!this.imgPre" src="../../assets/images/avatar.jpg" alt="" />
        <img class="the_img" v-else :src="this.imgPre" alt="">
      <el-form-item>
        <div class="top">
          <p>图片小于30k</p>
          <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserImgsrc',
  data () {
    return {
      imgsrc: '',
      imgPre: ''
    }
  },
  methods: {
    // 选择图片->点击事件->让选择框出现
    chooseImg () {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },
    // 在选择框中选择图片后触发的改变事件
    onFileChange (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.imgsrc = null
        this.$emit('deliverImg', this.imgsrc)
      } else {
        this.imgPre = URL.createObjectURL(files[0])
        const reader = new FileReader()
        reader.readAsArrayBuffer(files)
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.imgsrc = data
          console.log('图片地址：' + data)
          this.$emit('deliverImg', data)
        }
      }
    }
  } // watch: {
  //   imgsrc (newVal, oldVal) {

  //   }
  // }

}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
}
</style>
