import Vue from 'vue';
import Vuex from 'vuex';
// import App from './components/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './components/Store';

Vue.use(Vuetify);

Vue.use(Vuex);

new Vue({
    el      : '#app',
    store,
    render  : h => h(require('./components/App.vue')),
});
