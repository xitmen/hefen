<template>
  <transition name="tips-fade">
    <div class="tips" v-show="isShow">
      {{text}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tips',
  props: {
    text: {
      type: String,
      default: '温馨提示...'
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    this.timer = null
  },
  methods: {
    show () {
      this.isShow = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.interval)
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .tips
    width 80%
    padding 8px 0
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    background-color rgba(0,0,0,.5)
    color $color-background
    border-radius 5px
    text-align center

  @keyframes tips-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes tips-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
