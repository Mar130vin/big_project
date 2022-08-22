<template>
  <div>
    <ImgCutter v-on:cutDown="cutDown">
      <template #open>
        <button>选择图片</button>
      </template>
    </ImgCutter>
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
export default {
  components: {
    ImgCutter
  }
}
</script>

<style>

</style>
