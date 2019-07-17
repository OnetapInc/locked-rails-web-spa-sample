function addMessageFunc (ctx, level) {
  return (body) => {
    ctx.store.dispatch('app_messages/addMessage', {level, body})
  }
}

export default async function (ctx, inject) {
  inject('toast', {
    success: addMessageFunc(ctx, 'success'),
    info: addMessageFunc(ctx, 'info'),
    warning: addMessageFunc(ctx, 'warning'),
    error: addMessageFunc(ctx, 'error'),
  })
}

