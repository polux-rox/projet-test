<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Test Paul</v-toolbar-title>
      <v-spacer></v-spacer>
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

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Ajout</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12 sm6>
              <v-text-field label="Nom de la tâche" required></v-text-field>
              <v-menu
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
            <v-text-field
              slot="activator"
              v-model="computedDateFormatted"
              label="Date"
              hint="DD/MM/YYYY format"
              persistent-hint
              prepend-icon="event"
              readonly
              required
            ></v-text-field>
            <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
    :headers="headers"
    :items="desserts"
    hide-actions
    headers-length="3"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.items.name }}</td>
      <td class="text-xs-right">{{ props.items.date }}</td>
      <td class="text-xs-right">{{ props.items.action }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Il n'y a rien dans cette table !!
      </v-alert>
    </template>
  </v-data-table>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
         headers: [
          {
            text: 'Tâche',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Date', value: 'date' },
          { text: 'Action', value: 'action' },
        ],
        desserts: [
          {
            value: false,
            name: 'GX',
            date: 36,
            action: 6,
          },
        ],
        dialog : false,
        picker : null,
        date: null,
        dateFormatted: null,
        menu2: false,
      };
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    
  
  }
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>
