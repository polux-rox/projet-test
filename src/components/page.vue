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
                    Veuillez enregistrer des tâches !!
                </v-alert>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
export default {

    data        : () => ({
        
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
    },
};
</script>
