// import Vuex from 'vuex';

// const State = {
//     task   : [{
//         name    : '',
//         date    : '',
//     }],
//     dialog : false,
// };

// const Mutations = {
//     ADD_TASK(state, name , date) {
//         state.task.name = name;
//         state.task.date = date;
//     },
// };

// const Guetters = {
//     getTask(state)  {
//         return state.task;
//     },

//     getName(state, date) {
//         state.task.date = date;
//         return state.task.date.filter(task => task.name);
//     },

//     getDate(state, name) {
//         state.task.name = name;
//         return state.task.name.filter(task => task.date);
//     },
// };

// const Store =  new Vuex.Store({
//     namespaced  : true,
//     state       : State,
//     mutations   : Mutations,
//     guetters    : Guetters,
//     actions     : {},
//     strict      : true,
// });


// global.store = Store;

// export default Store;
