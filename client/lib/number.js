export function moneyFormat (value) {
  return '￥' + numberFormat(value)
}

export function numberFormat (value) {
  value = value.toString()
  if (!value) {
    return ''
  }
  let r = []
  while (value.length > 3) {
    r.unshift(value.slice(-3))
    value = value.slice(0, -3)
  }
  if (value.length > 0) {
    r.unshift(value)
  }
  return r.join(',')
}
