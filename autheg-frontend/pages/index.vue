<template v-if="$auth.$state.loggedIn">
  <v-layout>
    <v-flex>
      <v-list>
        <v-list-tile v-for="example in examples" :key="example.id" :class="example.colour">
          <v-list-tile-content>{{example.name}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  data () {
    return {
      examples: []
    }
  },
  methods: {
    async update_examples() {
      this.examples = await this.$axios.$get('/examples')
    },
    auth_judgement () {
      this.$auth.$state.loggedIn ? this.update_examples() : this.$router.push({path: 'login'})
    }
  },
  mounted () {
    this.auth_judgement()
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

