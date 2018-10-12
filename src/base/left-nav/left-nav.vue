<template>
  <scroll class="nav-list-scroll">
    <div class="nav-list">
      <ul>
        <li v-for="(item, index) in data" :class="{'active': index === currentCard}" :key="index" @click="selectCard(index, item.id)">{{item.name}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  name: 'let-nav',
  props: {
    data: {
      type: Array,
      default: null
    },
    currentCard: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectCard (index, id) {
      this.$emit('selectItem', index, id)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .nav-list-scroll
    flex 0 0 (180/2)px
    background-color #F9F9F9
    overflow hidden
    height 100%
    .nav-list
      ul
        li
          line-height 50px
          text-align center
          color $color-gray-7
          &.active
            background-color $color-background
            color $color-red
</style>
