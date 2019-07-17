export default async function (ctx) {
  // ここで直接vuexのdispatchをするとv-dom関連のエラーがでるので、root vue instanceの
  // mixinに登録して、通常のタイミングでdispatchされるようにする。
  ctx.app.mixins = [{
    mounted () {
      // ctx.app.store.dispatch('users/restore')
    },
  }]
}

