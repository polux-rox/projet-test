<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title>Test Paul</v-toolbar-title>
            <v-spacer></v-spacer>
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
        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-text-field  v-model="editedItem.name" label="name"></v-text-field>
                        </v-layout>
                    </v-container>
                    <v-container>
                        <v-layout wrap>
                            <v-menu
                                ref="menu1"
                                :close-on-content-click="false"
                                v-model="menu1"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px">
                                <v-text-field
                                  slot="activator"
                                  v-model="dateFormatted"
                                  label="Date"
                                  hint="DD/MM/YYYY format"
                                  persistent-hint
                                  prepend-icon="event"
                                  @blur="date = parseDate(dateFormatted)"
                                ></v-text-field>
                                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="blue" 
                        flat 
                        @click.native="close">Cancel</v-btn>
                    <v-btn
                        color="blue"
                        flat 
                        @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="desserts"
            hide-actions
            class="elevation-1">
            <template
                slot="items" 
                slot-scope="props">
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
            <template slot="no-data">
                <v-alert 
                    :value="true" 
                    color="warning" 
                    icon="warning">
                    Il n'y a rien dans cette table !!
                    <td>
                        <v-btn 
                            color="red" 
                            dark 
                            @click="initialize">Reset</v-btn></td>
                </v-alert>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
export default {
    data  : () => ({
        dialog        : false,
        date          : null,
        dateFormatted : null,
        menu1         : false,
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
        desserts    : [],
        editedIndex : -1,
        editedItem  : {
            name    : '',
            date    : '',
        },
        defaultItem : {
            name    : '',
            date    : '',
        },
    }),

    computed  : {
        formTitle() {
            return this.editedIndex === -1 ? 'New Task' : 'Edit Task';
        },
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
    },

    watch   : {
        dialog(val) {
            val || this.close();
        },
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },

    created() {
        this.initialize();
    },

    methods   : {
        formatDate(date) {
            if (!date) {
                return null;
            }
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) {
                return null;
            }
            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        initialize() {
            this.desserts = [];
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item);
            confirm('êtes-vous sûr de voloir supprimer cette item ?') && this.desserts.splice(index, 1);
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
