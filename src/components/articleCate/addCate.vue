<template>
<div >
  <!-- Form -->
  <!-- <el-button type="primary" @click="addVisible = true" class="addCate">添加类别</el-button> -->

  <el-dialog title="添加文章分类" :visible.sync="addVisible" width="35%">
    <!-- 添加的表单 -->
    <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="addForm.name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="alias">
        <el-input v-model="addForm.alias" minlength="1" maxlength="15" @keydown.native.enter="addFn"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancelFn">取 消</el-button>
      <el-button size="mini" type="primary" @click="addFn">添 加</el-button>
    </span>
</el-dialog>
</div>

</template>

<script>
import { addCatesAPI } from '../../api/index'
export default {
  props: {
    addCateProps: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addVisible: false,
      addForm: { // 添加表单的数据对象
        name: '',
        alias: ''
      },
      addRules: { // 添加表单的验证规则对象
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
    async addFn () {
      this.addVisible = false
      const { data: res } = await addCatesAPI(this.addForm)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 重新请求列表数据
      this.$emit('getArticleCates')
    },
    // 对话框内-取消按钮-点击事件
    cancelFn () {
      this.addVisible = false
    }
  },
  watch: {
    addCateProps () {
      this.addVisible = !this.addVisible
    }
  }
}
</script>

<style scoped>

</style>
