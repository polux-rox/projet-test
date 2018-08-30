import Vue from 'vue';
import App from './pages/App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from '../src/store/Store';

Vue.use(Vuetify);

new Vue({
    el      : '#app',
    render  : h => h(App),
    store,
});
