// エラーコード体系
// 1: 情報レベル
// 2-3: グループコード
// 4-6: シーケンス
//
// グループコード:
// 00: 認証・ユーザー情報の操作
// 01: プロジェクト情報の操作
// 02: 決済操作
const messages = {
  'E01001': '登録できないメールアドレスです',
  'E01002': '招待できないメールアドレスです',
  'E01003': 'ログイン試行回数が制限を超えました。しばらくお待ちください',
  'E01004': 'ログインに失敗しました',
}

export function getMessage (code, defaultMessage = null) {
  if (typeof messages[code] !== 'undefined') {
    const msg = messages[code]
    return `${msg}(${code})`
  } else {
    return `エラーが発生しました(code: ${code})`
  }
}

export function getMessageFromException (e, defaultMessage = null) {
  let status = null
  if (e.response) {
    if (e.response.data && e.response.data.code) {
      return getMessage(e.response.data.code)
    }
    status = e.response.status
  }
  if (defaultMessage) {
    return defaultMessage
  } else if (status) {
    return `エラーが発生しました(status: ${status})`
  } else {
    return 'エラーが発生しました'
  }
}
