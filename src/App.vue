<template>
  <div id="app">
    123

  </div>
</template>

<script>
import { getListAPI } from '@/api'
export default {
  created () {
    this.getListFn()
  },
  methods: {
    async getListFn () {
      const res = await getListAPI()
      console.log(res)
    }
  }
}
</script>

<style lang="less">
</style>
