const store = {
    namespaced  : true,
    state       : {
        index   : -1,
        tasks   : [
            {
                name : 'Paul',
                date : '1997-12-26',
            },
        ],
    },
    mutations : {
        addTask(state, item) {
            this.state.index = state.tasks.indexOf(item);
            alert(this.state.index);
            if (this.state.index > -1) {
                Object.assign(state.tasks[this.state.index], item);
            } else {
                state.tasks.push(item);
            }
        },
    },
    actions : {
        save(context, item) {
            context.commit('addTask', item);
        },
    },
    getters : {
        getIndex : (state, item) => state.tasks.indexOf(item),
        getTasks : state => state.tasks,
        getTask  : (state, item) => state.tasks.filter(task => (task.name === item.name && task.date === item.date)),
        getName  : (state, date) => state.tasks.filter(task => task.date === date),
        getDate  : (state, name) => state.tasks.filter(task => task.name === name),
    },
};
global.store = store;
export default store;
