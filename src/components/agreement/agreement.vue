<template>
  <div class="agreement">
    <tab title="协议" :share="share"></tab>
    <div class="content">
      描述问题就
    </div>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
export default {
  name: 'agreement',
  created () {
    this.share = false
  },
  components: {
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .content
    position relative
    top 45px
    padding 10px
    p
      text-align 2rem
</style>
