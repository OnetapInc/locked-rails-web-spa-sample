<template>
  <div class="app-header">
    <section class="container">
      <div v-if="!preopen" style="display: inline-block; vertical-align: top;">
        ぴぴぴ佐藤だよ
      </div>
      <div style="display: inline-block; float:right;">
        <div v-if="$store.state.auth.access_token === null" style="display: inline-block;">
          <nuxt-link to="/login" class="app-header-link auth-text">ログイン</nuxt-link>
          |
          <nuxt-link to="/signup" class="app-header-link auth-text">登録</nuxt-link>
        </div>
        <div v-else style="display: inline-block;">
          <button @click="doLogout">ろぐあうちょ</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import config from '~/config/config'

  export default {
    data () {
      return {
        preopen: config.preopen,
        keyword: '',
      }
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout',
      }),
      async doLogout () {
        if (confirm('本当にログアウトしてよろしいですか？')) {
          await this.logout()
          this.$toast.success('ログアウトしました')
        }
      },
      search () {
        this.$router.push('/search?q=' + this.keyword)
      },
    },
  }
</script>

<style lang="scss">
  @import '../assets/colors';

  .app-header {
    background-image: linear-gradient(45deg, pink, red);
    color: white;
    height: 44px;
    line-height: 44px;
  }

  .app-header > a:visited, .app-header > a:link {
    color: white;
  }

  .app-header-link {
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 1rem;
    &:link, &:visited {
      color: white;
    }
    &.nuxt-link-active {
    }
  }

  .search-group {
    display: inline-block;
    width: 240px;
    height: 28px;
    margin: 0 2rem;
    padding: 0;
    vertical-align: middle;
    border: 1px solid white;
    border-radius: 4px;
    background: rgba(white, 0.2);
    .search-input {
      border: none;
      display: inline-block;
      width: 210px;
      color: white;
      margin: 0;
      padding: 0 0 0 1rem;
      height: 28px;
      vertical-align: top;
    }
    .search-input::placeholder {
      font-size: 14px;
      color: rgba(white, 0.5);
    }
    .search-button {
      width: 28px;
      height: 28px;
      background: transparent;
      vertical-align: top;
      border: none;
      margin: 0;
      padding: 0;
    }
  }

  .logo, .logo:visited, .logo:link {
    color: white;
    font-size: 24px;
    font-family: "Hiragino Kaku Gothic Pro", Helvetica;
  }


  a:link, a:visited {
    &.app-header-link.auth-text {
      font-size: 12px;
      margin: 0;
    }
  }
</style>
