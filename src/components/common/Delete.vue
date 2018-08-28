<template>
    <div>
        <v-card>
            <v-card-text>Êtes-vous sûr de voloir supprimer cette item ?</v-card-text>
            <v-card-actions>
                <template>
                    <v-spacer/>
                    <v-btn
                        color="orange"
                        flat
                        @click.native="close">Cancel
                    </v-btn>
                    <v-btn
                        color="orange"
                        flat
                        @click.native="del">Delete
                    </v-btn>
                </template>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name        : 'Delete',
    data() {
        return {
        
        };
    },
};
</script>
