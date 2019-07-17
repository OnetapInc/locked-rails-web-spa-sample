<template>
  <div>
    <app-header/>
    <nuxt/>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import '../assets/_colors.scss';

  body {
    background: #fff;
  }
  .app-footer {
    padding: 3rem;
    color: white;
    text-align: center;
  }
  .app-footer-item {
    margin: 8px;
    &:link, &:visited {
      color: white;
    }
    &:hover {
      border-bottom: 1px solid white;
    }
  }
</style>
