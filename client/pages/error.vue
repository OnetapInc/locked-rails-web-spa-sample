<template>
  <div class="container" style="padding: 2rem 0">
    <h1 v-if="status === '404'">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
  </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'default',
    data () {
      console.log(this.$route.query)
      return {
        status: this.$route.query.status,
      }
    },
  }
</script>
