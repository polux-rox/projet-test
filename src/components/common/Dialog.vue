<template>
    <v-card>
        <v-card-title>
            <span>{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
            <v-flex>
                <v-container>
                    <v-layout wrap>
                        <v-text-field
                            v-model="editedItem.name"
                            class="name"
                            label="Name"
                            clearable
                            required/>
                        <v-spacer/>
                        <v-text-field
                            v-model="editedItem.date"
                            class="date"
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
                flat>Cancel
            </v-btn>
            <v-btn
                color="blue"
                flat
                @click.native="save">Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex';
export default {
    name : 'Dialog',
    data() {
        return {
            editedItem  : {
                name    : '',
                date    : '',
            },
            defaultItem : {
                name    : '',
                date    : '',
            },
            editedIndex : null,
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
        save() {
            this.$store.dispatch('task/save', this.editedItem);

            console.log(this.$store.getters['task/getTasks']);
        },
    },
};
</script>
<style>
  .name {
    width: 405px;
  }
  .date {
    width: 400px;
  }
</style>
