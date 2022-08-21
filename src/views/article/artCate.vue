<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateFn" >
            添加类别
              <AddCate ref="addCate" :addCateProps="addVisible"></AddCate>
            <!-- style="display:none; "-->
        </el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
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
    </el-card>
  </div>
</template>

<script>
import { articleCatesAPI } from '../../api/index'
import AddCate from './addCate.vue'
export default {
  components: {
    AddCate
  },
  name: 'ArtCate',
  data () {
    return {
      tableData: [],
      addVisible: false
    }
  },
  methods: {
    // 获取数据
    async getArticleCatesAPI () {
      const { data: res } = await articleCatesAPI()
      this.tableData = res.data
    },
    // 编辑
    handleEdit (index, row) {
      console.log(index, row)
    },
    // 删除
    handleDelete (index, row) {
      console.log(index, row)
    },
    addCateFn () {
      this.addVisible = !this.addVisible
      console.log(this.addVisible)
      // this.$refs.addCate.addVisible = true
      // console.log(this.$refs.addCate.addVisible)
    }
  },
  mounted () {
    this.getArticleCatesAPI()
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
