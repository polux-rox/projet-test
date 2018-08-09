import Vuex from 'vuex';


const Mutations = {
    ADD_TASK(state, name , date) {
        state.task.name = name;
        state.task.date = date;
    },
};

const Guetters = {
    getTask(state)  {
        return state.task;
    },

    getName(state, date) {
        state.task.date = date;
        return state.task.date.filter(task => task.name);
    },

    getDate(state, name) {
        state.task.name = name;
        return state.task.name.filter(task => task.date);
    },
};

const store =  new Vuex.Store({
    state       : {
        task   : [{
            name    : '',
            date    : '',
        }],
    },
    mutations   : Mutations,
    guetters    : Guetters,
    actions     : {},
    strict      : true,
});


global.store = store;

export default store;
