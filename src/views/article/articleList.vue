<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q" ref="ruleForm">
          <el-form-item label="文章分类">
            <el-select v-model="q.cateId" placeholder="请选择分类" size="small">
               <el-option :label="obj.name" :value="obj.Id" v-for="obj in articleCatesList" :key="obj.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onFilterFn">筛选</el-button>
            <el-button type="info" size="small" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="addArticle">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%;" border stripe >
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.pub_date | data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="q.pagenum"
          :page-sizes="[2, 5, 8, 10]"
          :page-size="q.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :background="true">
        </el-pagination>
      </div>
    </el-card>
  <!-- 这个组件要放在card外面div里面才能触发显示隐藏因为本身就是一个独立组建 -->
  <DelArticle :delCateProps="delVisible" @initArtList="initArtListFn" :delParameters="delParameters"></DelArticle>
  </div>
</template>

<script>
import DelArticle from '../../components/articleList/delArticle.vue'
import Moment from 'moment'
import { getArticleListAPI, articleCatesAPI } from '../../api/index'
export default {
  components: {
    DelArticle
  },
  name: 'ArtList',
  data () {
    return {
      // 删除组件
      delVisible: false,
      delParameters: 1,
      // 查询参数对象
      articleCatesList: [],
      artList: [], // 文章列表
      q: {
        pagenum: 1,
        pagesize: 2,
        cateId: '',
        state: ''
      },
      total: 1
    }
  },
  methods: {
    handleSizeChange (newSize) {
      // console.log(`每页 ${newSize} 条`)
      this.q.pagesize = newSize
      // 默认展示第一页数据
      this.q.pagenum = 1
      // 重新发起请求
      this.initArtListFn()
    },
    handleCurrentChange (newPage) {
      // console.log(`当前页: ${newPage}`)
      // 为页码值赋值
      this.q.pagenum = newPage
      // 重新发起请求
      this.initArtListFn()
    },
    async initArtListFn () {
      // console.log(this.q)
      const { data: res } = await getArticleListAPI(this.q)
      if (res.status !== 0) return this.$message.error(res.message)
      // console.log(res)
      this.artList = res.data
      this.total = res.total
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
    onFilterFn () {
      // console.log(this.q.cateId, this.q.state)
      this.initArtListFn()
    },
    resetForm () {
      this.q.cateId = ''
      this.q.state = ''
      this.initArtListFn()
    },
    addArticle () {
      this.$router.push('/articlePublish')
    },
    async handleEdit (index, row) {
      // console.log(index, row)
      // console.log(row.Id)
      this.$router.push({
        name: 'articleEdit',
        query: row.Id
      })
    },
    handleDelete (index, row) {
      const totalPage = Math.ceil((this.total - 1) / this.q.pagesize)
      const currentPage = this.q.pagenum > totalPage ? totalPage : this.q.pagenum
      this.q.pagenum = currentPage < 1 ? 1 : currentPage
      this.delVisible = !this.delVisible
      this.delParameters = row.Id
    }
  },
  filters: {
    // 过滤器设定时间
    data (val) {
      return Moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.initArtListFn()
    this.getArticleCatesFn()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
</style>
