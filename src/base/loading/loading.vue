<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="loading" />
    <div class="desc">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width 100%
    text-align center
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-gray-5
</style>
