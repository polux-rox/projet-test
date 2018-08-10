<template>
    <v-app dark>
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
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        <v-container>
                            <v-layout wrap>
                                <v-text-field
                                    v-model="editedItem.name" 
                                    label="name" 
                                    clearable 
                                    required/>
                                <v-spacer/>
                                <v-text-field
                                    v-model="editedItem.date" 
                                    label="Date" 
                                    clearable 
                                    hint="Format: DD/MM/AAAA" 
                                    required/>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
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
        <v-data-table
            :headers="headers"
            :items="desserts"
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
                    Il n'y a rien dans cette table !!
                </v-alert>
            </template>
        </v-data-table>
    </v-app>
    
</template>

<script>
// import Store from './Store.js';

export default {

    // store   :   Store,
 
    data  : () => ({
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
            if (this.editedIndex === -1) {
                return 'New Task';
            } else {
                return 'Edit Task';
            }
        },
    },
    watch   : {
        dialog(val) {
            val || this.close();
        },
    },
    created() {
        // localStorage.clear();
        this.initialize();
    },
    methods   : {
        initialize() {
            this.desserts = [];
            if (localStorage.length > 0) {
                this.count = (localStorage.length) - 1;
                let i = 0;
                while (i < localStorage.length) {
                    console.log(JSON.parse(localStorage.getItem(i)));
                    this.desserts.push(JSON.parse(localStorage.getItem(i)));
                    i++;
                }
            }
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.desserts.indexOf(item);
            console.log(localStorage);
            confirm('êtes-vous sûr de voloir supprimer cette item ?') && this.desserts.splice(index, 1);
            localStorage.removeItem(index);
            console.log(localStorage);
            this.count--;
        },
        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },
        save() {
            if (this.editedItem.date.length === 10) {
                if (this.editedIndex > -1) {
                    console.log(this.desserts[this.editedIndex]);
                    Object.assign(this.desserts[this.editedIndex], this.editedItem);
                    localStorage.setItem(this.count, JSON.stringify(this.editedItem));
                } else {
                    console.log(this.editedIndex);
                    this.desserts.push(this.editedItem);
                    localStorage.setItem(this.count, JSON.stringify(this.editedItem));
                    this.count++; 
                }
                this.close();
            } else {
                this.editedItem.date = '';
                alert('Vous avez pas mis le bon format pour la date');
            }
        },
    },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
