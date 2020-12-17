import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

let mediaSource = decodeURIComponent((new RegExp('[?|&]mediaSource='+'([^&;]+?)(&|#|;|$)')
    .exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
// 应用初始状态
const state = {
    mediaSource:mediaSource,
    token:'',
    count: 10,
    userInfo:{},
    urlData:{}
}
// 定义所需的 mutations
const mutations = {
    SETTOKEN(state,payload){
        state.token=payload.token;
    },
    SETURLDATA(state,payload){
        state.urlData=payload.urlData;
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    SAVEUSERINFO(state,payload){
        state.userInfo=payload;
    },
    LOGOUT(state){
        state.userInfo={};
        state.token="";
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
