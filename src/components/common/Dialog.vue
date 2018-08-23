<template>
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
                        <v-layout>
                            <v-text-field
                                v-model="editedItem.name"
                                :rules="Rname"
                                label="Name"
                                clearable
                                required/>
                            <v-spacer/>
                            <v-text-field
                                v-model="editedItem.date"
                                :rules="Rdate"
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
</template>

<script>
// import { mapGetters, mapState } from 'vuex';
export default {
    name : 'Dialog',
    data() {
        return {
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
            Rname       : [
                v => !!v || 'Name is required',
                v => (v === 0 && v.length <= 10) || 'Name must be between 0 and 10 characters',
            ],
            Rdate       : [
                v => !!v || 'E-mail is required',
            ],
        };
    },
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
    methods   : {
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
                    Object.assign(this.tasks[this.editedIndex], this.editedItem);
                } else {
                    this.tasks.push(this.editedItem);
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
