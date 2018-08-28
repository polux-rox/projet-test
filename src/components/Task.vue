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
                            color="red"
                            dark
                            small
                            absolute
                            bottom
                            right
                            fab
                            @click="dialog=true">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-dialog
                        v-model="dialog"
                        width="500">
                        <pa-dialog/>
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
                                    @click="editItem(props.item)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    class="mx-0"
                                    @click="del = true">
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
                        <pa-delete/>
                    </v-dialog>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import PaDialog from '../components/common/Dialog.vue';
import PaDelete from '../components/common/Delete.vue';
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
            current       : null,
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
            editedItem  : {
                name    : '',
                date    : '',
            },
            defaultItem : {
                name    : '',
                date    : '',
            },
        };
    },

    watch   : {
        dialog(val) {
            val || this.closeDialog();
        },
        del(val) {
            val || this.closeDelete();
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
        editItem(item) {
            this.editedIndex = this.tasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.tasks.indexOf(item);
            this.del = true;
            // confirm('êtes-vous sûr de voloir supprimer cette item ?') && this.tasks.splice(index, 1);
        },
        closeDialog() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },
        closeDelete() {

        },
        saveDialog() {
            if (this.editedItem.date.length === 10) {
                if (this.editedIndex > -1) {
                    Object.assign(this.tasks[this.editedIndex], this.editedItem);
                } else {
                    this.tasks.push(this.editedItem);
                }
                this.closeDialog();
            } else {
                this.editedItem.date = '';
                alert('Vous avez pas mis le bon format pour la date');
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
