import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLogin:false,
        profile:{},
        accesstoken:'',
    },
    getters:{
        getIsLogin: state =>{
            return isLogin;
        }
    },
    mutations:{
        setLogin(state){
            state.isLogin = true;
        },
        setProfile(state,data){
            state.profile = data;
        },
        setAccesstoken(state,accesstoken){
            state.accesstoken = accesstoken;
        },
        exitUser(state){
            state.isLogin = false;
            state.profile = {};
            state.accesstoken = '';
        }
    },
    actions:{
    }

})

export default store