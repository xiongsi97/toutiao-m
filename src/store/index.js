import Vue from 'vue'
import Vuex from 'vuex'




// 引入 封装的本地存储方法
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
    // 使用变量方便查错
const TOKEN_KEY = 'TOUTIAO_USER'


export default new Vuex.Store({
    state: {

        // 一个对象 储存当前登录用户信息 token
        // user: null
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getItem(TOKEN_KEY)
    },
    getters: {},
    mutations: {

        setUser(state, data) {

            // data 是登录后传过来的数据
            state.user = data

            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})