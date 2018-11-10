<template>
  <div class="card-list">
    <tab :goAppHome="goAppHome" title="信用卡申请" type="1" :share="share"></tab>
    <div class="card-list-wrapper">
      <left-nav :data="cardList" :currentCard="currentCard" @selectItem="selectCard"></left-nav>
      <div class="card-list-content">
        <scroll :data="cardListData" class="card-list-scroll">
          <div>
            <ul>
              <li class="item" v-for="(item, index) in cardListData" :key="index" @click="applyCardHandler(item)">
                <div class="header-img">
                  <img :src="item.img" alt="car01">
                </div>
                <div class="text">
                  <h2 class="title">{{item.name}}</h2>
                  <h3 class="sub-title">{{item.intro}}</h3>
                  <div class="desc">
                    <span class="num">{{item.cnt}}</span>
                    <span>人已申请</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="default-wrapper" v-show="cardListData && cardListData.length === 0">
              <default></default>
            </div>
          </div>
        </scroll>
        <div class="loading-content" v-show="!cardListData">
          <loading></loading>
        </div>
        <tips :text="text" ref="tips"></tips>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Tips from 'base/tips/tips'
import Scroll from 'base/scroll/scroll'
import LeftNav from 'base/left-nav/left-nav'
import Loading from 'base/loading/loading'
import Default from 'base/default/default'
import {getCardList, getCardInfo} from 'base/api/api'
import {SUCCESS} from 'base/api/config'
import {mapMutations} from 'vuex'

export default {
  name: 'card-list',
  data () {
    return {
      cardList: [],
      currentCard: 0,
      cardId: null,
      applyUrl: '',
      cardListData: null
    }
  },
  created () {
    this.text = '该银行暂未开通。。。'
    this.getCardList()
    this.goAppHome = true
    if (this.$route.query.uid) {
      this.setUid(this.$route.query.uid)
    }
    if ('box' in window) {
      this.share = true
    } else {
      this.share = false
    }
  },
  methods: {
    setUserUid (uid) {
      this.setUid(uid)
    },
    selectCard (index, cardId) {
      this.currentCard = index
      this.cardId = cardId
      this.applyUrl = this.cardList[index].apply_url
    },
    getCardList () {
      getCardList({type: 1}).then((data) => {
        if (data.code === SUCCESS) {
          data.data.sort((a, b) => {
            return Number(a.sort) - Number(b.sort)
          })
          this.cardList = data.data.filter(item => {
            return item.apply_url || Number(item.credit_card_cnt)
          })
          this.cardId = this.cardList[0].id
          this.applyUrl = this.cardList[0].apply_url
        }
      })
    },
    applyCardHandler (item) {
      if (this.applyUrl) {
        this.$router.push({
          path: `/card-list/${item.bank_id}`
        })
        item.apply_url = this.applyUrl
        this.setCardInfo(item)
      } else {
        this.$refs.tips.show()
      }
    },
    ...mapMutations({
      setCardInfo: 'SET_CARD_INFO',
      setUid: 'SET_UID'
    })
  },
  watch: {
    cardId () {
      this.cardListData = null
      getCardInfo(this.cardId).then((data) => {
        if (data.code === SUCCESS) {
          this.cardListData = data.data
        }
      })
    },
    '$route' (to, from) {
      if (to.query.uid) {
        this.setUid(this.$route.query.uid)
      }
    }
  },
  components: {
    Tab,
    Tips,
    Scroll,
    LeftNav,
    Default,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .card-list-wrapper
    position fixed
    top 45px
    left 0
    right 0
    bottom 0
    display flex
    .card-list-content
      flex 1
      position relative
      .card-list-scroll
        height 100%
        overflow hidden
      .item
        display flex
        box-sizing border-box
        padding 12px
        .header-img
          flex 0 0 (249/2)px
          height (157/2)px
          margin-right (19/2)px
          img
            width 100%
            height 100%
        .text
          h2
            font-size (28/2)px
            line-height (34/2)px
            margin-bottom 5px
          h3
            font-size (24/2)px
            color $color-gray-5
            margin-bottom (24/2)px
          .desc
            font-size 12px
            color $color-gray-5
            .num
              color $color-red
      .default-wrapper
        text-align center
        position absolute
        top 50%
        left 0
        right 0
        bottom 0
        transform translateY(-50%)
      .loading-content
        text-align center
        position absolute
        top 50%
        left 0
        right 0
        transform translateY(-50%)
</style>
