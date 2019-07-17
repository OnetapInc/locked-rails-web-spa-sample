import Vue from 'vue'
import VeeValidate from 'vee-validate/dist/vee-validate.min.js'
import localeJa from 'vee-validate/dist/locale/ja'

VeeValidate.Validator.localize('ja', localeJa)

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 5,
  locale: 'ja',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true,
  validity: true,
  aria: true,
}

Vue.use(VeeValidate, config)

export default async function (ctx) {
}
