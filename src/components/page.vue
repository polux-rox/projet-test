<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>Test Paul</v-toolbar-title>
            <v-spacer/>
            <v-btn
                color="blue"
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
            hide-actions
            class="elevation-1">
            <template
                slot-scope="props"
                slot="items">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.date }}</td>
                <td>
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)">
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
            <template slot="footer">
                <v-spacer/>
                <td class="text-xs-center">
                    <v-btn
                        color="warning"
                        dark
                        outline
                        @click="initialize">
                        Reset
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
    </div>
</template>

<script>
import PaDialog from './dialog.vue';

export default {
    name        : 'Page',
    components  : {
        PaDialog,
    },
    data() {
        return {
            dialog        : false,
            date          : null,
            dateFormatted : null,
            headers       : [
                {
                    text      : 'Tâche',
                    align     : 'left',
                    sortable  : false,
                    value     : 'name',
                },
                { text  : 'date', value : 'date' },
                { text  : 'Actions', value  : 'name', sortable  : false },
            ],
            count       : 0,
            tasks       : [],
            editedIndex : -1,
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
    created() {
        // localStorage.clear();
        this.initialize();
    },
    methods   : {
        initialize() {
            this.tasks = [
                {
                    name    : 'Mickel',
                    date    : '22/08/2018',
                },
                {
                    name    : 'Paul',
                    date    : '25/08/2018',
                },
            ];
        },
        editItem(item) {
            this.editedIndex = this.tasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.tasks.indexOf(item);
            confirm('êtes-vous sûr de voloir supprimer cette item ?') && this.tasks.splice(index, 1);
        },
    },
};
</script>
