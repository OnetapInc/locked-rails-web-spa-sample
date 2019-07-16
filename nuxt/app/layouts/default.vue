<template>
  <div id="app">
    <v-app class="all_wrap">
      <v-toolbar app dark>
        <v-toolbar-title>Auth example</v-toolbar-title>
        <v-spacer />
        <v-btn icon nuxt href="/"><v-icon>home</v-icon></v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <nuxt/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<style scoped>
  .all_wrap{
    background: #000005
  }
</style>
