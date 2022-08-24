<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%;" border stripe>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="q.pagenum"
          :page-sizes="[2, 5, 8, 10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="15">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleListAPI } from '../../api/index'
export default {
  name: 'ArtList',
  data () {
    return {
      // 查询参数对象
      artList: [],
      q: {
        pagenum: 1,
        pagesize: 2,
        cateId: 1,
        state: '已发布'
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    async initArtListFn () {
      const { data: res } = await getArticleListAPI(this.q)
      if (res.status !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      console.log(res)
      this.artList = res.data
      this.total = res.total
    }
  },
  created () {
    this.initArtListFn()
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
