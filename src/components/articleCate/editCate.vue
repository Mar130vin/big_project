<template>
<div >
  <!-- Form -->
  <!-- <el-button type="primary" @click="editVisible = true" class="addCate">添加类别</el-button> -->

  <el-dialog title="编辑文章分类" :visible.sync="editVisible" width="35%">
    <!-- 添加的表单 -->
    <el-form :model="editParametersClone" :rules="editRules" ref="addRef" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.lazy="editParametersClone.name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="alias">
        <el-input v-model.lazy="editParametersClone.alias" minlength="1" maxlength="15" @keydown.enter.native="editFn"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancelFn">取 消</el-button>
      <el-button size="mini" type="primary" @click="editFn">确认修改</el-button>
    </span>
</el-dialog>
</div>

</template>

<script>
import { updatecateAPI } from '../../api/index'
export default {
  props: {
    editCateProps: {
      type: Boolean,
      default: false
    },
    editParameters: {
      type: Object,
      default: () => ({})
    }

  },
  data () {
    return {
      editVisible: false,
      editParametersClone: { // 添加表单的数据对象
        name: '',
        alias: ''
      },
      editRules: { // 添加表单的验证规则对象
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // ...其他
    // 对话框内-添加按钮-点击事件
    async editFn () {
      this.editVisible = false
      console.log(this.editParametersClone)
      const { data: res } = await updatecateAPI(this.editParametersClone)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 重新请求列表数据
      this.$emit('getArticleCates')
    },
    // 对话框内-取消按钮-点击事件
    cancelFn () {
      this.editVisible = false
      this.$emit('getArticleCates')
    }
  },
  watch: {
    editCateProps () {
      this.editVisible = !this.editVisible
    },
    editParameters: {
      deep: true,
      handler () {
        this.editParametersClone = this.editParameters
      }
    }
  }
}
</script>

<style scoped>

</style>
