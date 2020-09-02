<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="music"
      :items-per-page="16"
      :options.sync="options"
      :loading="loading"
      class="elevation-1"
  />
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      music: [],
      options: {},
      loading: false,
      headers: [
          { text: 'Group', value: 'group' },
          { text: 'Album', value: 'albom_name' },
          { text: 'Song', value: 'song_name' }
        ],

    }),

    watch: {
      options: {
        handler () {
          this.loadMusic();
        },
        deep: true,
      },
    },

    created() {
      this.loadMusic();
    },

    methods: {
      async loadMusic() {
        let url = 'http://localhost:3001';
        if (this.options.sortBy && this.options.sortBy.length) {
          url += `?sort_by=${this.options.sortBy[0]}`
        }
        this.music = await fetch(url).then(response => response.json())
      }
    }
  }
</script>

<style scoped>

</style>