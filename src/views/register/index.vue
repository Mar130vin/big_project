<template>
   <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
         <el-form-item prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off" placeholder="请再次确认密码" @keydown.native.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-link type="info" @click="toLogin">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '../../api/index'
export default {
  name: 'my-register',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: { // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        checkPass: '' // 确认密码
      },
      rules: { // 校验表单对象
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,10}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ],
        username: [
          { vrequired: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // console.log(this.$refs, this.$refs[formName], this)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(registerAPI(this.ruleForm))
          const { data: res } = await registerAPI(this.ruleForm)
          if (res.status !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push({ path: '/login' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toLogin () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
