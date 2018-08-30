<template>
    <div>
        <v-layout
            row
            pb-2>
            <v-flex
                xs8
                offset-xs2>
                <v-card class="card--flex-toolbar">
                    <v-toolbar
                        card
                        prominent>
                        <v-toolbar-title>Test Paul</v-toolbar-title>
                        <v-spacer/>
                        <v-btn
                            color="grey"
                            dark
                            small
                            absolute
                            bottom
                            right
                            fab
                            @click="dialog=true">
                            <v-icon color="orange">add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-dialog
                        v-model="dialog"
                        width="500">
                        <pa-dialog
                            @close="closeDialogAction()"
                            @save="saveAction()"/>
                    </v-dialog>
                    <v-data-table
                        :headers="headers"
                        :items="tasks"
                        hide-actions>
                        <template
                            slot-scope="props"
                            slot="items">
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.date }}</td>
                            <td class="text-xs-right px-2">
                                <v-btn
                                    icon
                                    class="mx-0"
                                    @click="editItemAction(props.item)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    class="mx-0"
                                    @click="deleteItemAction(props.item)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-alert
                                :value="true"
                                color="warning"
                                icon="warning"
                                outline>
                                Veuillez enregistrer des tâches !!
                            </v-alert>
                        </template>
                    </v-data-table>
                    <v-dialog
                        v-model="del"
                        width="500">
                        <pa-delete
                            @delete="deleteAction()"
                            @close="closeDelAction()"/>
                    </v-dialog>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import PaDialog from '../components/common/Dialog.vue';
import PaDelete from '../components/common/Delete.vue';
import uuid from 'uuid';
export default {
    name        : 'Task',
    components  : {
        PaDialog,
        PaDelete,
    },
    data() {
        return {
            del           : false,
            dialog        : false,
            currentItem   : null,
            headers       : [
                {
                    text      : 'Tâche',
                    align     : 'left',
                    sortable  : false,
                    value     : 'name',
                },
                { text  : 'date', value : 'date' },
                { value  : 'name', sortable  : false, align : 'right' },
            ],
            tasks       : [],
            editedItem  : {},
        };
    },

    watch   : {
        dialog(val) {
            val || this.closeDelAction();
        },
        del(val) {
            val || this.closeDelAction();
        },
    },
    mounted() {
        // localStorage.clear();
        this.loadCollection();
    },
    
    methods   : {
        loadCollection() {
            const tasks = this.$store.getters['task/getTasks'];
            if (tasks.length > 0) {
                this.tasks = tasks;
            } else {
                this.tasks = [];
            }
        },
        setCurrent(item) {
            this.currentItem = item;
        },
        editItemAction(item) {
            this.setCurrent(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItemAction(item) {
            this.setCurrent(item);
            this.del = true;
        },
        deleteAction() {
            const index = this.tasks.indexOf(this.currentItem);
            this.tasks.splice(index, 1);
        },
        closeDelAction() {
            this.del = false;
        },
        closeDialogAction() {
            this.dialog = false;
        },
        saveAction() {
            const id = this.$store.getters['task/getId', this.currentItem];
            // a modifier car pas bon
            const index = 0;
            if (id) {
                Object.assign(this.tasks[index], this.currentItem);
            } else {
                this.tasks.push(this.currentItem);
            }
        },
    },
};
</script>
<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
