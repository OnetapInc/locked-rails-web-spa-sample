<template>
  <div class="container">
    <div class="row">
      <div class="column signup-confirm-status" style="max-width: 640px; margin: 1rem auto;">
        <div v-if="ng">
          登録を確認ができる期限を過ぎています。<br/>
          もう一度
          <nuxt-link to="/signup">登録</nuxt-link>
          を行ってください。
        </div>
        <div v-else-if="error">
          登録の確認に失敗しました。<br/>
          <nuxt-link to="/login">ログイン画面</nuxt-link>
          よりログインしてください。
        </div>
        <div v-else-if="verified">
          ログインできました。<br/>
          <nuxt-link to="/">トップ画面へ</nuxt-link>
        </div>
        <div v-else>
          ログイン中...
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'

  export default {
    data () {
      const id = this.$route.params.id
      return {
        ng: id === 'ng',
        verified: false,
        error: false,
      }
    },
    mounted () {
      (async () => {
        try {
          const confirmToken = this.$route.params.id
          const accessToken = await this.confirmSignUp(confirmToken)
          await this.verify(accessToken)
          this.verified = true
          this.$router.replace('/')
        } catch (e) {
          this.error = true
        }
      })()
    },
    methods: {
      ...mapActions({
        confirmSignUp: 'auth/confirmSignUp',
        verify: 'auth/verify',
      })
    },
  }
</script>

<style>
  h1 {
    font-size: 32px;
    text-align: center;
  }

  .signup-confirm-status {
    font-size: 20px;
    border: 1px solid grey;
    padding: 2rem;
    border-radius: 8px;
  }
</style>

