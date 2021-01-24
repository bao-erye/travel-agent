import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        is_login: localStorage.getItem("userInfo")?true:false,
        user: JSON.parse(localStorage.getItem("userInfo"))
    },
    mutations: {
        setLoginStatus(e){
            this.state.is_login = e
        },
        setUser(e){
            this.state.use = e
        }
    },
    getters: {
        getLoginStatus(){
            return this.state.is_login
        },
        getUser(){
            return this.state.user
        }
    }
});
 
export default store;