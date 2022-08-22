<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select v-model="form.cate" >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <!-- <el-input type="textarea" v-model="form.textarea"></el-input> -->
          <ArticleTextarea v-model="form.textarea"></ArticleTextarea>
        </el-form-item>
        <el-form-item label="文章封面">
          <GetArticleImg></GetArticleImg>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import GetArticleImg from './getArticleImg.vue'
import ArticleTextarea from './ArticleTextarea.vue'
export default {
  components: {
    GetArticleImg,
    ArticleTextarea
  },
  data () {
    return {
      form: {
        title: '',
        textarea: '',
        cate: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
}

</script>

<style>

</style>
