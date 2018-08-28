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
        addTask(state ,Name , NDate) {
            const NewTask = {
                name  : Name,
                date  : NDate,
            };
            state.tasks.push(NewTask);
        },

        delTask(state, item) {
            const index = this.task.indexOf(item);
            state.tasks.splice(index, 1);
        },
    },
    actions : {
        save(context, name, date) {
            context.commit('addTask', name, date);
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
            return state.task.filter(task => task.date === date);
        },

        getDate(state, name) {
            return state.task.filter(task => task.name === name);
        },
    },
};
global.store = store;
export default store;
