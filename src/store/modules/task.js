const store = {
    namespaced  : true,
    state       : {
        tasks    : [
            {
                name : 'GS',
                date : '26/12/1997',
            },
        ],
    },
    mutations : {
        addTask(state, item) {
            state.tasks.push(item);
        },
        delTask(state, item) {
            const index = this.task.indexOf(item);
            state.tasks.splice(index, 1);
        },
    },
    actions : {
        save(context, item) {
            context.commit('addTask', item);
        },
        create(context) {

        },
        delete(context, item) {
            context.commit('delTask', item);
        },
        setcurrent(context) {

        },
    },
    getters : {
        getTasks : state => state.tasks,
        getName(state, date) {
            return state.tasks.filter(task => task.date === date);
        },
        getDate(state, name) {
            return state.tasks.filter(task => task.name === name);
        },
    },
};
global.store = store;
export default store;
