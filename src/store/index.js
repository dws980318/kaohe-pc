import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import common from './modules/common'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        home,
        common
    }
});


export default store;