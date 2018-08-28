const store = {
    namespaced  : true,
    state       : {
        task    : [
            {
                name : 'GS',
                date : '26/12/1997',
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
            const index = this.task.indexOf(item);
            state.task.splice(index, 1);
        },
    },
    actions : {
        save(context, name, date) {
            context.commit('add_task', name, date);
        },

        create(context) {

        },
        delete(context, item) {
            context.commit('del_task', item);
        },
        setcurrent(context) {

        },
    },
    getters : {
        getTask(state)  {
            console.log(state.task.length);
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
