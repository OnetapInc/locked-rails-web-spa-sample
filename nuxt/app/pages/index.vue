<template>
<div>
  <v-layout>
    <v-flex>
    <Zdog/>
      <template v-if="page_render_flag">
      <v-btn @click="set_color_action_wrap({name: bar_name, color: bar_color})">color add</v-btn>
      <v-text-field :dark="true" prepend-icon="color_lens" label="color" v-model="bar_color"/>
      <v-text-field :dark="true" prepend-icon="edit" label="text" v-model="bar_name"/>
      <Draggable v-model="colors" class="color_list_wrap" @end="onEnd" :move="checkMove" :sort="true">
          <div class="list_style" v-for="color in colors" :key="color.id" :style="{color: '#537480', background: '#FAFCFB'}">
            <v-icon  @click="delete_color_action_wrap({id: color.id})">delete</v-icon>
            <div class="accent_div" :style="{background: color.color}"></div>
              {{`id: ${color.id},`}}{{`p id: ${color.position_id},`}}{{`name: ${color.name},`}}{{`環境変数: ${TEST}`}}
          </div>
      </Draggable>
      {{colors}}
      </template>
      <template v-if="!page_render_flag">
        <div>
           <v-text-field
           v-model="email"
          prepend-icon="email"
          :dark="true"
          label="E-mail"
          :rules="[rules.required, rules.email]"
        />
        <v-text-field
        v-model="password"
          prepend-icon="lock"
          :dark="true"
          :rules="[rules.required, rules.min]"
            label="password"
          />
          <v-btn @click="sign_up_button_func({email: email,password: password})">signup</v-btn>
          <v-btn @click="sign_in_button_func({email: email,password: password})">signin</v-btn>
        </div>
      </template>
    </v-flex>
  </v-layout>
  <v-snackbar
    v-model="snackbar"
    :timeout="6000"
    :top="true"
    :vertical="true">{{snackbar_message}}</v-snackbar>
  </div>
</template>

<script>
import api from '../plugins/axios';
import {mapActions,mapState} from 'vuex'
import Zdog from './zdog/index'
import Draggable from 'vuedraggable'
export default {
  components: {
    Zdog,
    Draggable
  },
  data () {
    return {
      snackbar: false,
      snackbar_message: 'default message',
      page_render_flag: false,
      TEST: process.env.TEST, // 環境変数テスト中
      rules: {
        required: value => !!value || 'Required.',
        min: v => !v || v.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    async updateExamples() {
      console.log('log',await api.get('/posts'))
    },
    ...mapActions({
      update_colors_action: 'api/update_colors_action',
      set_color_action: 'api/set_color_action',
      delete_color_action: 'api/delete_color_action',
      sign_up: 'api/sign_up',
      sign_in: 'api/sign_in',
      change_color_position_id: 'api/change_color_position_id'
    }),
    async delete_color_action_wrap(id){
      const result = await this.delete_color_action(id)
      await this.update_colors_action()
      const message = result ? 'delete row' : 'not exists'
      this.set_snackbar_message(message)
      this.snackbar_view()
    },
    async set_color_action_wrap(argment){
      await this.set_color_action(argment)
      await this.update_colors_action()
    },
    snackbar_view() {
      this.snackbar = true
    },
    set_snackbar_message(message) {
      this.snackbar_message = message
    },
    async sign_up_button_func({email,password}) {
      const result = await this.sign_up({email:email,password:password})
      return result ? console.log('signup!!'):console.log('signup miss ...')
    },
    async sign_in_button_func({email,password}) {
      const result = await this.sign_in({email:email,password:password})
      return result ? this.page_render_flag = true:console.log('signin miss ...')
    },
    async onEnd(evt){
      console.log(evt.oldIndex,evt.newIndex,'hello')
      const {oldIndex,newIndex} = evt
      const result = await this.change_color_position_id({oldIndex, newIndex })
      await this.update_colors_action()
      return result ? console.log('change color'):console.log('change color miss ...')
    },
  },
  computed: {
    ...mapState({
      colors: state => {
        return state.api.colors.data.slice().sort((a,b)=>{
          console.log('a,b',a,b)
          return a.position_id - b.position_id
        })
      }
    }),
  },
  async mounted () {
    await this.update_colors_action()
    await this.updateExamples()
  },
  async beforeDestroy() {
    alert('destroey')
  },
}
</script>

<style scoped>
.list_style{
  display: flex;
  border-radius: 12px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 20%;
  margin: 10px;
}
.color_list_wrap{
  display: flex;
  flex-wrap: wrap;
  background: black;
}
.accent_div{
  width: 5px;
  margin: 0px 5px 0px 5px;
}
</style>
