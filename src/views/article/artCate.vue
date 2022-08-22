<template>
  <div >
    <el-card class="box-card" >
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateFn" >
          添加类别
          <!-- style="display:none; "-->
        </el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="alias"
          label="分类名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类别名"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope" >
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <AddCate :addCateProps="addVisible" @getArticleCates="getArticleCatesFn"></AddCate>
    <DelCate :delCateProps="delVisible" @getArticleCates="getArticleCatesFn" :delParameters="delParameters"></DelCate>
    <EditCate :editCateProps="editVisible" @getArticleCates="getArticleCatesFn" :editParameters="editParameters"></EditCate>
  </div>
</template>

<script>
import { articleCatesAPI } from '../../api/index'
import AddCate from './addCate.vue'
import EditCate from './editCate.vue'
import DelCate from './delCate.vue'
export default {
  components: {
    AddCate,
    EditCate,
    DelCate
  },
  name: 'ArtCate',
  data () {
    return {
      tableData: [],
      // 控制子组建显示隐藏
      addVisible: false,
      editVisible: false,
      delVisible: false,
      // 传给子组建参数
      editParameters: {},
      delParameters: 1
    }
  },
  methods: {
    // 获取数据
    async getArticleCatesFn () {
      // console.log('getArticleCatesFn')
      const { data: res } = await articleCatesAPI()
      if (res.status !== 0) return this.$message.error(res.message)
      // this.$message.success(res.message)
      // 重新请求列表数据
      this.tableData = res.data
    },
    // 编辑
    handleEdit (index, row) {
      this.editVisible = !this.editVisible
      this.editParameters = row
    },
    // 删除
    handleDelete (index, row) {
      this.delVisible = !this.delVisible
      this.delParameters = row.Id
      // console.log(this.delParameters)
    },
    // 添加分类
    addCateFn () {
      this.addVisible = !this.addVisible
    }
  },
  mounted () {
    this.getArticleCatesFn()
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
