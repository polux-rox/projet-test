import uuidv1 from 'uuid/v1';

const store = {
    textspaced  : true,
    state       : {
        tasks   : [
            {
                id          : uuidv1(),
                text        : 'Lorem Ipsum',
                date        : new Date(),
                isChecked   : false,
            },
        ],
    },
    mutations : {
        addTask(state, item) {
            this.state.index = state.tasks.indexOf(item);

            if (this.state.index > -1) {
                Object.assign(state.tasks[this.state.index], item);
            } else {
                state.tasks.push(item);
            }
        },
    },
    actions : {
        /**
         * Add new task
         * 
         * @param {object}      context             Module Store context
         * @param {object}      item                Item to create
         * @param {string}      item.text           Task text (description, ...)
         * @param {Date}        item.date           Due date of current task
         */
        create(context, item) {
            context.commit('addTask', {
                ...item,
                id          : uuidv1(),
                isChecked   : false,
            });
        },
    },
    getters : {
        getId    : (state, item) => state.tasks.filter(tasks => tasks.id === item.id),
        getIndex : (state, item) => state.tasks.indexOf(item),
        getTasks : state => state.tasks,
        getTask  : (state, item) => state.tasks.filter(tasks => tasks.id === item.id),
        gettext  : (state, date) => state.tasks.filter(tasks => tasks.date === date),
        getDate  : (state, text) => state.tasks.filter(tasks => tasks.text === text),
    },
};
global.store = store;
export default store;
