import Vue from 'vue';
// import Vuex from 'vuex';
import App from './components/App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'es6-promise/auto';
// Vue.use(Vuex);
Vue.use(Vuetify);

new Vue({ 
    el      : '#app',
    render  : h => h(App),
});
