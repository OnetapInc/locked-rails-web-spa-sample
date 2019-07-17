// CAUTION: element-uiのコンポーネントをここでimportしないこと。
//
// element-ui はサイズが大きいので初期ロードのJSに含めないようにする。
// dyanamic componentの仕組みを利用し、コンポーネント使用する画面でのみ動的にロードする。
//
// export default {
//   components: {
//     'el-select': import('element-ui/lib/select')
//   }
// }
//

import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/ja'

// configure language
locale.use(lang)

export default {}


