import Vue from 'vue';
import Vuex from 'vuex';

// load modules
import task from './modules/task';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules : {
        task,
    },
});

// this part is only used in development to hot-reload modificartions in store without refresh browser
if (module.hot) {
    // accept actions and mutations as hot modules
    module.hot.accept([
        './modules/task',
    ], () => {
        // swap in the new actions and mutations
        store.hotUpdate({
            modules : {
                responsive : require('./modules/task').default,
            },
        });
    });
}

export default store;
