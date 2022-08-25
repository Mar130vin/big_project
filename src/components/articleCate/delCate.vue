<template>
<div >
  <!-- Form -->
  <!-- <el-button type="primary" @click="delVisible = true" class="addCate">添加类别</el-button> -->

  <el-dialog title="确认删除？" :visible.sync="delVisible" width="35%">
    <!-- 添加的表单 -->
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancelFn">取 消</el-button>
      <el-button size="mini" type="primary" @click="delFn">删除</el-button>
    </span>
</el-dialog>
</div>

</template>

<script>
import { deletecatesAPI } from '../../api/index'
export default {
  props: {
    delCateProps: {
      type: Boolean,
      default: false
    },
    delParameters: {
      type: Number,
      default: 1
    }

  },
  data () {
    return {
      delVisible: false,
      delParametersClone: 1
    }
  },
  methods: {
    // ...其他
    // 对话框内-添加按钮-点击事件
    async delFn () {
      this.delVisible = false
      const { data: res } = await deletecatesAPI(this.delParametersClone)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 重新请求列表数据
      this.$emit('getArticleCates')
    },
    // 对话框内-取消按钮-点击事件
    cancelFn () {
      this.delVisible = false
      this.$emit('getArticleCates')
    }
  },
  watch: {
    delCateProps () {
      this.delVisible = !this.delVisible
    },
    delParameters: {
      deep: true,
      handler () {
        this.delParametersClone = this.delParameters
      }
    }
  }
}
</script>

<style scoped>

</style>
