import Element from 'element-ui';
// import Common from '../components/common.vue'
import JsonExcel from 'vue-json-excel'

export default {
    install(Vue) {
        // Vue.component(Common.name, Common);
        Vue.component('downloadExcel', JsonExcel)
        Vue.use(Element, { size: 'small', zIndex: 3000 });
    }
}