const store = {
    namespaced  : true,
    state       : {
        task    : [
            {
            },
        ],
    },
    mutations : {
        add_task(state ,Name , NDate) {
            const NewTask = {
                name  : Name,
                date  : NDate,
            };
            state.task.push(NewTask);
        },

        del_task(state, item) {
            const index = this.tasks.indexOf(item);
            state.task.splice(index, 1);
        },
    },
    actions : {

    },
    getters : {
        getTask(state)  {
            return state.task;
        },
    
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
