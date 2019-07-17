export function conv (s) {
  return s.toString()
}

// 文字列の左に指定サイズになるまで指定文字を詰める
export function lpad (str, len, ch) {
  let s = conv(str)
  let l = len - s.length
  if (l <= 0) {
    return str
  }
  return new Array(l + 1).join(ch) + s
}

// 文字列の左に指定サイズになるまで'0'を詰める
export function zlpad (str, len) {
  return lpad(str, len, '0')
}

export function generateUuid () {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case 'x':
        chars[i] = Math.floor(Math.random() * 16).toString(16)
        break
      case 'y':
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
        break
    }
  }
  return chars.join('')
}
