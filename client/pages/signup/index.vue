<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="column" style="margin: 0 auto; padding-top: 20px;">
          <h1>アカウント登録</h1>
          <div class="login-panel">
            <form class="clearfix" style="margin-bottom: 0;" @submit.prevent="doSignUp()">
              <fieldset>
                <input type="email" v-model="email" name="メールアドレス" v-validate="'required|email'" placeholder="メールアドレス"><br/>
                <span v-show="errors.has('メールアドレス')" class="help error-message">{{ errors.first('メールアドレス') }}</span>
              </fieldset>
              <fieldset>
                <input type="password" v-model="password" name="パスワード" v-validate="'required|min:6'" placeholder="パスワード"
                       style="margin:0;"><br/>
                <span v-show="errors.has('パスワード')" class="help error-message">{{ errors.first('パスワード') }}</span>
              </fieldset>
              <fieldset>
                <input v-model="passwordConfirm" type="password" name="確認用パスワード" v-validate="'required'" required placeholder="確認用パスワード"/>
                <span v-show="errors.has('確認用パスワード')" class="help error-message">{{ errors.first('確認用パスワード') }}</span>
              </fieldset>
              <div style="text-align: right;">
                <button>登録する</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  import config from '../../config/config'

  export default {
    data () {
      return {
        api_host: config.api_host,
        email: '',
        password: '',
        passwordConfirm: '',
      }
    },
    methods: {
      async doSignUp () {
        this.$validator.errors.clear()
        await this.$validator.validateAll()
        if (this.$validator.errors.any()) {
          return false
        }
        if (this.password !== this.passwordConfirm) {
          this.errors.add('確認用パスワード', 'パスワードが一致しません')
          return false
        }
        try {
          await this.signup({email: this.email, password: this.password})
          this.$router.push('/signup/requested')
        } catch (e) {
          console.log(e)
          if (e && e.response && e.response.status === 400) {
            if (e.response.code === 1) {
              this.$toast.error('指定のメールアドレスは既に使用されています。')
            } else {
              this.$toast.error('エラーが発生しました。')
            }
          } else {
            this.$toast.error('エラーが発生しました。')
          }
        }
      },
      ...mapActions({
        login: 'auth/login',
        signup: 'auth/signup',
      })
    },
  }
</script>

<style>
  h1 {
    font-size: 32px;
    text-align: center;
  }

  .login-panel {
    margin: 0 auto;
    padding: 16px;
    max-width: 360px;
    box-shadow: 1px 1px 1px 1px;
  }

  .forgot-password {
    color: grey;
    font-size: 11px;
    line-height: 11px;
  }

  .facebook-login-button {
    background-color: #3b5998;
    border: none;
    width: 100%;
    margin: 8px 0px;
  }

  .facebook-login-button .fa-icon {
    line-height: 38px;
    height: 38px;
    vertical-align: middle;
    float: left;
  }

  .twitter-login-button {
    background-color: #4099FF;
    border: none;
    width: 100%;
    margin: 0;
  }

  .twitter-login-button .fa-icon {
    line-height: 38px;
    height: 38px;
    vertical-align: middle;
    float: left;
  }
</style>
