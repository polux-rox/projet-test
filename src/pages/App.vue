<template>
    <v-app dark>
        <v-toolbar
            color="primary"
            dark
            extended
            flat>
            <v-toolbar-side-icon/>
        </v-toolbar>
        <task/>
    </v-app>
</template>

<script>
import task from './components/Task.vue';
export default {
    name        : 'App',
    components  : {
        task,
    },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
