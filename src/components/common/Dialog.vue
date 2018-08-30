<template>
    <v-card>
        <v-card-title>
            <span>{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
            <v-flex>
                <v-container>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="editedItem.name"
                                class="name"
                                label="Name"
                                clearable
                                required/>
                        </v-flex>
                        <v-flex xs12>
                            <v-menu
                                ref="menu"
                                :close-on-content-click="false"
                                v-model="menu"
                                :nudge-right="40"
                                :return-value.sync="date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px">
                                <v-text-field
                                    slot="activator"
                                    v-model="editedItem.date"
                                    label="Picker in menu"
                                    prepend-icon="event"
                                    readonly/>
                                <v-date-picker
                                    v-model="editedItem.date"
                                    class="date"
                                    no-title
                                    scrollable>
                                    <v-spacer/>
                                    <v-btn
                                        flat
                                        @click="menu = false">Cancel</v-btn>
                                    <v-btn
                                        flat
                                        @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn
                color="orange"
                flat
                @click.native="close()">Cancel
            </v-btn>
            <v-btn
                color="orange"
                flat
                @click.native="save()">Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name : 'Dialog',
    data() {
        return {
            date        : null,
            menu        : false,
            editedItem  : {},
            formTitle   : 'New Task',
        };
    },
    
    watch   : {
        dialog(val) {
            val || this.close();
        },
    },
     
    methods   : {
        close() {
            this.$emit('close');
        },
        save() {
            if ((this.editedItem.name !== '') || (this.editedItem.date !== '')) {
                // this.$store.dispatch('task/save', this.editedItem);
                this.$emit('save');
                this.editedItem = {};
                this.$emit('close');
            }
        },
    },
};
</script>
