<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form
    :model="userForm"
    ref="userForm"
    label-width="100px"
    class="demo-dynamic"
    :rules="userFormRules"
    >
      <el-form-item label="登陆名称">
        <el-input v-model="userForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item
        prop="nickname"
        label="用户昵称"
      >
        <el-input v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="用户邮箱"
      >
        <el-input v-model="userForm.email" @keydown.native.enter="submitForm('userForm')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交修改</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updataUserinfoAPI } from '../../api/index'
export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {
        id: undefined,
        username: this.$store.state.userinfo.username,
        nickname: this.$store.state.userinfo.nickname,
        email: this.$store.state.userinfo.email
      },
      userFormRules: {
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.userForm.id = this.$store.state.userinfo.id
      console.log(this.userForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await updataUserinfoAPI(this.userForm)
          if (res.status !== 0) return this.$message.error('更新用户信息失败！')
          this.$message.success('更新成功！')
          this.$store.dispatch('initUserInfo')
          console.log(this.$store.state.userinfo)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
  // created () {
  //   console.log(this.$store.state)
  // }

}
</script>

<style lang="less" scoped>

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
