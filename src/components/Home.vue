<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-btn
        v-if="isAuthenticated"
        @click="addTournament"
        color="red"
        dark
        fixed
        bottom
        right
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-flex
        v-for="(tournament, index) in tournaments"
        :key="tournament.id"
        xs12
        md6
        x13
        pa-2
      >
        <v-card @click="goDetail(tournament, index)">
          <v-img
            height="170"
            :src="tournament.imgUrl"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title primary-title style="padding-top: 13px">
            <div>
              <h3 class="headline">{{ tournament.title }}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      isAuthenticated: state => state.users.isAuthenticated,
      tournaments: state => state.tournaments.items
    })
  },
  methods: {
    ...mapActions({
      getListTournaments: 'tournaments/getAll'
    }),
    goDetail(match, index) {
      this.$router.push({
        name: 'detail',
        params: {
          id: match.id,
          match: this.matches[index]
        }
      });
    },
    addTournament() {
      this.$router.push({
        name: 'add-tournament'
      });
    }
  },
  mounted() {
    this.getListTournaments();
  }
};
</script>
