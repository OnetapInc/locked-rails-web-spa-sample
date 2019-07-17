<template>
  <div>
  </div>
</template>

<script>

  import config from '~/config/config'
  import { mapState } from 'vuex'
  import nuxtend from 'nuxtend'

  export default nuxtend({
    async asyncData (context) {
      if (config.preopen) {
        return context.redirect('/preopen')
      }
      return {
        posts: [],
        features: [],
        recommends: [],
      }
    },
    data () {
      return {
        bbb: 'bbb',
      }
    },
    computed: {
      ...mapState({
        joinedProjects: state => state.projects.joinedProjects,
        projectHistories: state => state.projects.histories,
        postHistories: state => state.posts.histories,
        backedProjects: state => state.projects.backedProjects,
      }),
      project () {
        if (this.joinedProjects.length === 0) {
          return null
        }
        return this.joinedProjects[0]
      },
    },
    methods: {
      featureStyle (project, idx) {
        return {
          backgroundColor: 'lightgrey',
          backgroundImage: 'url(' + project.header_image.full.url + ')',
        }
      },
      onClickFeature (project) {
        this.$router.push('/satous/' + project.id)
      },
    },
  })
</script>

<style lang="scss">
  .top-features-container {
    cursor: pointer;
    position: relative;
    height: 180px;
  }

  .top-features {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  .top-feature {
    display: inline-block;
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center;
  }

  .top-page-section-header {
    font-size: 18px;
    padding-bottom: 4px;
    margin-top: 48px;
    border-bottom: 2px solid lightgrey;
  }

  .more-link, .more-link:link {
    margin-left: 8px;
    font-size: 14px;
  }

  @media (min-width: 40rem) {
    .top-features-container {
      height: 300px;
    }
    .top-feature {
      height: 300px;
    }
  }
</style>
