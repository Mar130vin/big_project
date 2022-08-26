<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <GetAvater></GetAvater>
    <!-- 测试vue-img-cutter插件这个插件这个项目没有用 -->
    <ImageCutter></ImageCutter>
  </el-card>
</template>

<script>
import GetAvater from './getAvater.vue'
import ImageCutter from './vue-img-cutter .vue'
export default {
  name: 'UserAvatar',
  components: {
    GetAvater,
    ImageCutter
  }
}

</script>

<style lang="less" scoped>

</style>
