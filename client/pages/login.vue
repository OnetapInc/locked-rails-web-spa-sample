<template>
  <div class="container">
    <div class="row">
      <div class="column" style="margin: 0 auto; padding-top: 20px;">
        <h1>ログイン</h1>
        <div class="login-panel">
          <form class="clearfix" style="margin-bottom: 0;" @submit.prevent="onSubmit()">
            <input-with-error type="email"
                              v-validate="'required|email'"
                              name="メールアドレス"
                              v-model="email" placeholder="メールアドレス"/>
            <input-with-error type="password"
                              name="パスワード"
                              v-validate="'required|min:6'"
                              v-model="password"
                              placeholder="パスワード" style="margin:0;"/>
            <transition name="fade">
              <p v-if="login_error" style="color: red;">
                {{ login_error }}
              </p>
            </transition>
            <br>
            <div style="text-align: right;">
              <button>ログイン</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  import config from '../config/config'
  import {getMessageFromException} from '../config/messages'

  export default {
    data () {
      return {
        api_host: config.api_host,
        email: '',
        password: '',
        login_error: '',
      }
    },
    methods: {
      ...mapActions({login: 'auth/login'}),
      async onSubmit () {
        await this.$validator.validateAll()
        if (this.$validator.errors.any()) {
          return false
        }
        this.doLogin()
        return false
      },
      async doLogin () {
        try {
          await this.login({email: this.email, password: this.password})
          this.$router.push('/')
        } catch (e) {
          let msg = 'エラーが発生しました'
          if (e.response && e.response.status < 500) {
            msg = getMessageFromException(e, 'ログインに失敗しました')
          }
          this.login_error = msg
        }
      },
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
