// TypeScript用の型定義ファイル
//
// WebStormはjsdocタイプのコメントで型を変数に指定するとTypeScriptの型定義を参照して補完をしてくれる。


import * as Vue from 'vue/types/index';
import * as Vuex from 'vuex/types/index';
import {Route} from './router';

export * from "./helpers";
export {Component} from "vue/types/index";
export {Route} from 'vue-router/types/index'

export interface AppState {
  users: object;
  plans: object;
  projects: object;
  posts: object;
}

export type AppStore = Vuex.Store<AppState>

export interface NuxtContext {
  app: Vue.Component;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  route: Route;
  store: AppStore;
  env: object;
  params: object;
  query: object;
  req: any;
  res: any;
  redirect: any;
  error: Function;
  nuxtState: Object;
  beforeNuxtRender: Function;
}

export interface User {
  id: number;
  name?: string;
  email?: string;
  introduction?: string;
  invite_code?: string;
}

export interface Project {
  id: number;
  category_id: number;
  title?: string,
  introduction?: string;
  short_introduction?: string;
  header_image?: any;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  project_id: number;
  eyecatch_image?: object;
  title?: string;
  body?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: number;
  project_id: number;
  title: string;
  description: string;
  price: number;
  sort_order: number;
  create_at: string;
  updted_at: string;
}

