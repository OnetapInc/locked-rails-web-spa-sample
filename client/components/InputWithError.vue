<template>
  <div class="component-input-with-error" :data-vv-scope="scope">
    <label v-if="computedLabel" :class="inputLabel">{{ computedLabel }}</label>
    <input ref="input" :type="type" :pattern="pattern" :maxlength="maxlength"
           :disabled="disabled"
           :value="value" @input="updateValue($event.target.value)" @blur="onBlur"
           :name="name" :placeholder="placeholder"
           class="component-input-with-error-input" :class="inputClass" :style="inputStyle"
    /><br/>
    <transition name="fade">
      <span v-if="err.has(computedName)" class="help error-message">{{ err.first(computedName) }}</span>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
      },
      pattern: {
        type: String,
        default: null
      },
      maxlength: {
        type: Number,
      },
      scope: {
        type: String,
      },
      inputClass: {
        default: () => {
          return []
        },
      },
      inputStyle: {
        default: () => {
          return {}
        },
      },
      inputLabel: {
        default: () => {
          return []
        },
      },
      value: {},
    },
    data () {
      // transition内でこのコンポーネントが使われている場合などにtransitionコンポーネントの
      // errorsを参照してしまう問題を回避する
      let parent = this.$parent
      while (typeof parent.tag !== 'undefined') {
        parent = parent.$parent
      }
      return {
        err: parent.errors,
      }
    },
    computed: {
      computedLabel () {
        if (this.label === null) {
          return false
        }
        return this.label || this.name || false
      },
      computedName () {
        if (this.scope) {
          return this.scope + '.' + this.name
        }
        return this.name
      },
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value)
      },
      onBlur () {
        this.$emit('blur')
      },
      focus () {
        this.$refs.input.focus()
      },
    },
  }
</script>

<style>
  .component-input-with-error {
    margin: 0 0 8px;
  }

  .component-input-with-error-input {
    margin: 0;
  }
</style>
