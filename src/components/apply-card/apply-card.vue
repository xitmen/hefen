<template>
  <transition name="slide">
    <div class="applyCard">
      <tab title="信用卡申请" :share="share"></tab>
      <div class="apply-card-content">
        <div class="apply-card-info">
          <h1>请您完善个人信息</h1>
          <ul>
            <li>
              <span class="name"><i class="icon-name"></i></span>
              <input type="text" v-model="ajax.name" placeholder="请填写申卡人姓名"/>
            </li>
            <li>
              <span class="name"><i class="icon-card-id"></i></span>
              <input type="text" maxLength="18" v-model="ajax.id_card_no" placeholder="请填写申卡人身份证号码"/>
            </li>
            <li>
              <span class="name"><i class="icon-mobile"></i></span>
              <input type="tel" maxLength="11" v-model="ajax.phone" placeholder="请填写申卡人手机号码"/>
            </li>
          </ul>
          <p class="tips">
            <span class="check" @click="selectedCheck">
              <i class="icon-check" :class="{'checked': isChecked}"></i>
            </span>
            <span>
              阅读知晓并同意<em @click="showAgreement">《银联发卡平台用户服务协议》</em>
            </span>
          </p>
          <p class="next-step">
            <a href="javascript:;" class="btn" @click="nextStep">下一步</a>
          </p>
          <div class="message">
            <p><img src="./icon05.png" width="15px" />本服务由银联提供</p>
            <p>信用卡申请不需要任何费用，谨防电话诈骗</p>
          </div>
        </div>
      </div>
      <confirm text="请选同意协议" ref="confirm" @confirm="selectedCheck"></confirm>
      <tips :text="text" ref="tips"></tips>
    </div>
  </transition>
</template>

<script>
import Tab from 'components/tab/tab'
import Confirm from 'base/confirm/confirm'
import {mapGetters} from 'vuex'
import Tips from 'base/tips/tips'
import {sendCardAndUserInfo} from 'base/api/api'
import {SUCCESS} from 'base/api/config'
import IdValidator from 'id-validator'

const idValidator = new IdValidator()

export default {
  name: 'apply-card',
  data () {
    return {
      share: false,
      isChecked: true,
      text: '',
      applyUrl: '',
      isIframe: false,
      ajax: {
        uid: '',
        name: '',
        id_card_no: '',
        phone: '',
        bank_card_id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'cardInfo',
      'uid'
    ])
  },
  created () {
    try {
      this.ajax.uid = window.box.getUidFromApp()
      this.isBack = true
    } catch (e) {
      if (this.uid) {
        this.ajax.uid = this.uid
      } else {
        this.ajax.uid = '2'
      }
    }
    if (!this.cardInfo.bank_id) {
      this.$router.push({
        path: '/card-list'
      })
    } else {
      this.ajax.bank_card_id = this.cardInfo.bank_id
    }
  },
  methods: {
    selectedCheck () {
      this.isChecked = !this.isChecked
    },
    showAgreement () {
      this.$router.push({
        path: '/agreement'
      })
    },
    nextStep () {
      let data = this.ajax
      if (data.name === '') {
        this.text = '请输入正确的用户名'
        this.$refs.tips.show()
      } else if (!idValidator.isValid(data.id_card_no)) {
        this.text = '请输入正确的身份证号码'
        this.$refs.tips.show()
      } else if (data.phone === '' || data.phone.length < 11) {
        this.text = '请输入正确的手机号'
        this.$refs.tips.show()
      } else if (!this.isChecked) {
        this.$refs.confirm.show()
      } else {
        sendCardAndUserInfo(data).then((data) => {
          if (data.code === String(SUCCESS)) {
            location.href = this.cardInfo.apply_url
          }
        })
      }
    }
  },
  components: {
    Tab,
    Confirm,
    Tips
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .applyCard
    position absolute
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color #fff
    .applyUrl
      position fixed
      z-index 2
      top 0
      background-color #fff
      left 0
      right 0
      bottom 0
      iframe
        width 100%
        height 100%
        position absolute
        top 0
        left 0
    .apply-card-content
      bg-image('banner.png')
      background-repeat no-repeat
      background-size contain
      background-position center 0
      padding 115px 15px 35px 15px
      .apply-card-info
        box-sizing border-box
        background-color #fff
        border-radius (28/2)px
        height (888/2)px
        box-shadow: 0 1px 10px 0 rgba(162,162,162,0.50);
        h1
          font-size $font-size-large
          color $color-text
          font-weight normal
          text-align center
          line-height 35px
          padding 15px 0
          margin-bottom 20px
        ul
          margin 0 21px
          li
            border-bottom 1px solid $color-gray-3
            display flex
            justify-content space-between
            align-items center
            span
              display inline-block
              flex 0 0 (36/2)px
              height (36/2)px
              font-size 0
              i
                display inline-block
                width 100%
                height 100%
                background-size contain
                background-repeat no-repeat
                &.icon-name
                  bg-image("ico_0.png")
                &.icon-card-id
                  bg-image("ico01.png")
                &.icon-mobile
                  bg-image("ico02.png")
            input
              flex 1
              width 100%
              height 55px
              text-align right
              font-size 16px
              &::input-placeholder
                color #666
        .tips
          padding-left (38/2)px
          font-size (26/2)px
          color $color-gray-5
          margin-top 15px
          em
            font-style normal
            color #FF6154
          .check
            display inline-block
            width (26/2)px
            height (26/2)px
            vertical-align top
            i
              display inline-block
              width 100%
              height 100%
              background-repeat no-repeat
              background-size contain
              background-image url("./ico03.png")
              &.checked
                background-image url("./ico04.png")
        .next-step
          margin-top (80/2)px
          text-align center
          a
            btn()
            width 250px
            height 44px
            line-height 44px
            color $color-background
            background-image: linear-gradient(-27deg, #FFA976 5%, #FF6154 100%)
        .message
          text-align center
          margin-top 20px
          font-size smaller
          color $color-gray-5
          line-height 25px
          img
            vertical-align baseline
            margin-right 5px
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
