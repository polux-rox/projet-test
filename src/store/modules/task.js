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
            console.log('avant le if');
            const index = state.tasks.indexOf(item);
            console.log(index);
            if (index > -1) {
                console.log('dans le if');
                state.tasks.assign(state.tasks[index], item);
            } else {
                console.log('dans le else');
                state.tasks.push(item);
            }
        },
        delTask(state, item) {
            const index = this.task.indexOf(item);
            state.tasks.splice(index, 1);
        },
    },
    actions : {
        save(context, item, index) {
            context.commit('addTask', item, index);
        },
        delete(context, item) {
            context.commit('delTask', item);
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
