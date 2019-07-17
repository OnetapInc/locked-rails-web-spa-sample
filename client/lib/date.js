import { zlpad } from './string'

export function toDate (value) {
  if (!value) {
    return ''
  }
  const now = new Date()
  const date = new Date(value)
  let result = (date.getMonth() + 1) + '月' + date.getDate() + '日'
  if (now.getFullYear() !== date.getFullYear()) {
    result = date.getFullYear() + '年' + result
  }
  return result
}

export function toDateTime (value) {
  if (!value) {
    return ''
  }
  const date = toDate(value)
  const d = new Date(value)
  return date + ' ' + zlpad(d.getHours(), 2) + ':' + zlpad(d.getMinutes(), 2)
}

export function toYearMonthWithDot (value) {
  if (!value) {
    return ''
  }
  const d = new Date(value)
  return d.getFullYear() + '.' + zlpad(d.getMonth() + 1, 2)
}

export function toISODateTime (value) {
  return new Date(value).toISOString()
}


