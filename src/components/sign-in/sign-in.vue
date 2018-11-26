<template>
  <div class="sign-in">
    <h2>注册</h2>
    <scroll class="sign-in-cont">
      <div>
        <ul>
          <li>
            <label>姓名</label>
            <p>
              <input type="text" v-model="name" placeholder="请输入姓名" />
            </p>
          </li>
          <li>
            <label>手机号</label>
            <p>
              <input type="tel" v-model="phoneNumber" maxlength="11" placeholder="请输入手机号" />
            </p>
          </li>
          <li>
            <label>密码</label>
            <p>
              <input type="password" v-model="password" maxlength="20" placeholder="请输入密码" />
            </p>
          </li>
          <li>
            <label>确认密码</label>
            <p>
              <input type="password" v-model="confirmPassword" maxlength="20" placeholder="请确认密码" />
            </p>
          </li>
          <li>
            <label>验证码</label>
            <p>
              <input type="text" v-model="phoneCode" maxlength="6" placeholder="请输入验证码" />
              <a href="javascript:;" @click="getPhoneCode">{{btnText}}</a>
            </p>
          </li>
          <li>
            <label>上级盒伙人推荐码</label>
            <p>
              <input type="text" v-model="upCode" maxlength="6" :disabled="isDisabled" placeholder="请输入上级盒伙人推荐码" />
            </p>
          </li>
          <li>
            <a href="javascript:;" class="btn" @click="submitSignIn">注册</a>
          </li>
        </ul>
      </div>
    </scroll>
    <tips :text="text" ref="tips"></tips>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Tips from 'base/tips/tips'
import Scroll from 'base/scroll/scroll'
import {sendVerificationCode, register} from 'base/api/api'
import {SUCCESS} from 'base/api/config'

export default {
  name: 'sign-in',
  data () {
    return {
      isGetCode: true,
      count: 0,
      btnText: '获取验证码',
      text: '',
      name: '',
      phoneNumber: '',
      phoneCode: '',
      upCode: '',
      password: '',
      confirmPassword: '',
      isDisabled: false,
      isSubmit: true
    }
  },
  created () {
    this.timer = null
    this.maxTime = 120
    if (this.$route.query.upCode) {
      this.upCode = this.$route.query.upCode
      this.isDisabled = true
    }
  },
  methods: {
    submitSignIn() {
      let _this = this
      if (!_this.isSubmit) {
        return
      }
      if (!/^[\u4e00-\u9fa5]+$/.test(this.name) || this.name.length > 4) {
        this.text = '请输入真实姓名!'
        this.$refs.tips.show()
        return
      }
      if (!this.phoneNumber && this.phoneNumber.length !== 11) {
        this.text = '请输入正确的手机号!'
        this.$refs.tips.show()
        return
      }
      if (!this.password || !this.confirmPassword) {
        this.text = '请输入登录密码!'
        this.$refs.tips.show()
        return
      }
      if (this.password !== this.confirmPassword) {
        this.text = '密码必须一致!'
        this.$refs.tips.show()
        return
      }
      if (!this.upCode) {
        this.text = '请输入推荐码!'
        this.$refs.tips.show()
        return
      }
      _this.isSubmit = false
      register({
        name: this.name,
        phone: this.phoneNumber,
        vcode: this.phoneCode,
        up_code: this.upCode,
        password: this.password,
        confirmPassword: this.confirmPassword
      }).then(data => {
        _this.isSubmit = true
        if (data.code === String(SUCCESS)) {
          this.text = '注册成功!'
          this.$refs.tips.show()
          this.$router.push({
            path: '/download'
          })
        } else {
          this.text = data.message
          this.$refs.tips.show()
        }
      }, () => {
        _this.isSubmit = true
        this.text = '注册失败，请重试!'
        this.$refs.tips.show()
      })
    },
    getPhoneCode () {
      let _this = this
      if (!_this.isGetCode) {
        return
      }
      if (this.phoneNumber && this.phoneNumber.length === 11) {
        _this.isGetCode = false
        sendVerificationCode({phone: this.phoneNumber}).then(data => {
          if (data.code === SUCCESS) {
            _this.isGetCode = false
            _this.timer = setInterval(() => {
              _this.count++
              if (_this.count > _this.maxTime) {
                _this.count = 0
                clearInterval(_this.timer)
                _this.isGetCode = true
                _this.btnText = '获取验证码'
              } else {
                _this.btnText = _this.maxTime - _this.count
              }
            }, 1000)
          } else {
            this.text = '验证码获取失败请稍后再试'
            this.$refs.tips.show()
          }
        }, () => {
          this.text = '验证码获取失败请稍后再试'
          this.$refs.tips.show()
        })
      } else {
        this.text = '请输入正确的手机号'
        this.$refs.tips.show()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.upCode = to.query.upCode
    }
  },
  components: {
    Tab,
    Tips,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .sign-in
    h2
      padding 15px 0
      text-align center
      font-size (36/2)px
      color #666
      line-height 25px
    .sign-in-cont
      position absolute
      overflow hidden
      top 60px
      left 0
      right 0
      bottom 0
      bg-image('signInBg.png')
      background-position center bottom
      background-size contain
      background-repeat no-repeat
      ul
        li
          margin 10px (75/2)px
          padding-bottom 10px
          border-bottom 1px solid #e4e4e4
          text-align center
          &:last-child{
            border-bottom 0
          }
          label
            display block
            text-align left
            height 20px
            font-size (28/2)px
            color #C3C3C3
            margin-bottom 10px
          p
            position relative
            display flex
            justify-content space-between
            align-items center
            input
              width 100%
              box-sizing border-box
              height (45/2)px
              color #333
              vertical-align middle
              background-color transparent
              &::placeholder
                color #999
            a
              flex 0 0 87x
              width 120px
              padding 10px 0
              font-size 14px
              vertical-align middle
              background-color rgba(255,97,84,.25)
              border-radius (56/2)px
              color rgb(255,97,84)
          .btn
            btn()
            width 250px
            height 44px
            line-height 44px
            text-align center
            color $color-background
            margin 15px auto
            background-image: linear-gradient(-27deg, #FFA976 5%, #FF6154 100%)
</style>
