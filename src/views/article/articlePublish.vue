<template>
  <div>
    <!-- 新增文章 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px"  :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章类别" prop="cate_Id" >
          <el-select v-model="form.cate_Id" placeholder="请选择文章类别">
            <el-option :label="obj.name" :value="obj.Id" v-for="obj in articleCatesList" :key="obj.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- <quill-editor
            v-model="content"
            ref="myQuillEditor"
            class="editor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
            ></quill-editor> -->
            <!-- 失焦判断法 -->
          <!-- <el-input type="textarea" v-model="form.textarea"></el-input> -->
          <ArticleTextarea v-model="form.content" @delivercontentTxt="getcontentTxtFn"></ArticleTextarea>
          <!-- <ArticleTextareaWang v-model="form.content" @delivercontentTxt="getcontentTxtFn"></ArticleTextareaWang> -->
        </el-form-item>
        <el-form-item label="文章封面" v-model="form.cover_img" prop="cover_img">
          <GetArticleImg v-model="form.cover_img" @deliverImg="getImgFn"></GetArticleImg>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">发布文章</el-button>
          <el-button @click="saveForm('form')">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import GetArticleImg from './getArticleImg.vue'
import ArticleTextarea from './ArticleTextarea.vue'
import { articleCatesAPI, addArticleAPI } from '../../api/index'

export default {
  components: {
    GetArticleImg,
    ArticleTextarea
  },
  data () {
    return {
      articleCatesList: [],
      form: {
        title: '',
        content: '',
        cate_Id: '',
        cover_img: '',
        state: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        cate_Id: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        cover_img: [
          { required: true, message: '请输入图片内容', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.form.state = '已发布'
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.publishRequestApi(this.form.state)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveForm (formName) {
      this.form.state = '草稿'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.publishRequestApi(this.form.state)
        } else {
          console.log('error save!!')
          return false
        }
      })
    },
    async publishRequestApi (state) {
      const fd = new FormData()
      fd.append('title', this.form.title)
      fd.append('content', this.form.content)
      fd.append('cate_Id', this.form.cate_Id)
      fd.append('cover_img', this.form.cover_img)
      fd.append('state', state)
      const { data: res } = await addArticleAPI(fd)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
    },
    getcontentTxtFn (contentTxtFromArticleTextarea) {
      this.form.content = contentTxtFromArticleTextarea
      // console.log(this.form.content)
      // 富文本内容最后做判断即可 失焦不用判断
      // 非要判断就把富文本组件直接放在这个组件里面 trigger：change
      // 然后执行
      // this.$refs.form.validateField('content')
    },
    async getArticleCatesFn () {
      // console.log('getArticleCatesFn')
      const { data: res } = await articleCatesAPI()
      if (res.status !== 0) return this.$message.error(res.message)
      // console.log(res)
      this.articleCatesList = res.data
      // this.$message.success(res.message)
      // 重新请求列表数据
      // this.tableData = res.data
    },
    getImgFn (imgFromGetArticleImg) {
      this.form.cover_img = imgFromGetArticleImg
      console.log(this.form.cover_img)
    }
  },
  created () {
    this.getArticleCatesFn()
  }

}

</script>

<style>

</style>
