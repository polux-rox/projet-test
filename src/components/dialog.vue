<template>
    <v-app dark>
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
    </v-app>
</template>

<script>

export default {
    data    : () => ({
        dialog      : false,
        editedItem  : {
            name    : '',
            date    : '',
        },
        defaultItem : {
            name    : '',
            date    : '',
        },
        editedIndex : -1,
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

};
</script>
