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
          認証に失敗しました。<br/>
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
      const id = this.$route.query.token
      return {
        ng: id === 'ng',
        verified: false,
        error: false,
      }
    },
    mounted () {
      (async () => {
        try {
          const verifyToken = this.$route.query.token
          const accessToken = await this.load({verifyToken})
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
        load: 'auth/load',
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
