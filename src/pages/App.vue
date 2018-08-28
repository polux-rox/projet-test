<template>
    <v-app dark>
        <v-toolbar
            color="orange"
            dark
            extended
            flat/>
        <task/>
    </v-app>
</template>

<script>
import task from '../components/Task.vue';
export default {
    name        : 'App',
    components  : {
        task,
    },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
