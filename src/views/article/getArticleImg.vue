<template>
  <div>
    <el-form >
        <img class="the_img" v-if="!imgFormEdit"  src="../../assets/images/avatar.jpg" alt="" />
        <img class="the_img" v-else-if="!imgPre"  src="../../assets/images/avatar.jpg" alt="" />
        <img class="the_img" v-else :src="imgPre" alt="">
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
  props: {
    imgFormEdit: {
      type: String,
      default: '../../assets/images/avatar.jpg'
    }
  },
  data () {
    return {
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
        this.$emit('deliverImg', this.imgPre)
      } else {
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (e) => {
          this.imgPre = e.target.result // 图片预览
          // 转成bolb需要先转base64
          const arr = e.target.result.split(',')
          // 获取base64字符串数组
          const fileType = arr[0].match(/:(.*?);/)[1]
          // 获取图片格式
          const bstr = arr[1]
          let l = bstr.length
          const u8Arr = new Uint8Array(l)
          // Uint8Array 数组类型表示一个 8 位无符号整型数组
          while (l--) {
            u8Arr[l] = bstr.charCodeAt(l)
            // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
          }
          const imgPic = new Blob([u8Arr], {
            type: fileType
          })
          this.$emit('deliverImg', imgPic)
        }
      }
    }
    // initImgFormEdit () {
    //   if (this.imgFormEdit === '') return this.$message.error('图片获取失败')
    //   // console.log(this.imgFormEdit)
    //   this.impre = 'data:image/png;base64,' + this.imgFormEdit
    //   // this.imgFormEdit = img
    //   console.log(this.impre)
    // }
  },
  watch: {
    imgFormEdit () {
      console.log(1)
      this.imgPre = 'data:image/png;base64,' + this.imgFormEdit
    }
  },
  mounted () {
    console.log('####' + this.imgFormEdit)
    // debugger
    // this.imgPre = 'data:image/png;base64,' + this.imgFormEdit
    // debugger
    // this.impre = 'data:image/png;base64,' + this.imgFormEdit
    // console.log('@@@@' + this.impre)
  }

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
