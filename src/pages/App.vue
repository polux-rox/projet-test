<template>
    <v-app dark>
        <v-toolbar
            color="blue"
            dark
            extended
            flat/>
        <task/>
    </v-app>
</template>

<script>
import task from '/mnt/c/Users/paul.poutet/dev/vuejs/monprojetVuejs/projet-test/src/components/Task.vue';
export default {
    name        : 'App',
    components  : {
        task,
    },
};
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
