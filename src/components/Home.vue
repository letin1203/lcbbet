<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-btn v-if="isAuthenticated" @click="addTournament" color="red" dark fixed bottom right fab>
        <v-icon>add</v-icon>
      </v-btn>
      <v-flex v-for="tournament in tournaments" :key="tournament.id" xs12 md6 x13 pa-2>
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ tournament.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  v-on="on"
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-tile v-show="menu.show"
                  v-for="(menu, i) in menuItems"
                  :key="i"
                  @click="goMenu(menu.url, tournament)"
                >
                  <v-list-tile-title v-if="menu.show">{{ menu.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="headline mb-0">{{ tournament.name }}</h3>
              <h5>{{ tournament.gId }}</h5>
              <div>{{ tournament.date }}</div>
              <div>{{ getCreatedString(tournament) }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import utils from '@/utils';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      isAuthenticated: state => state.users.isAuthenticated,
      tournaments: state => state.tournaments.items
    }),
    menuItems() {
      return [
        { title: 'Add Matches', url: 'add-matches', show: this.isAuthenticated },
        { title: 'Go Bet', url: 'tournament-matches', show: this.isAuthenticated }
      ]
    }
  },
  methods: {
    ...mapActions({
      getListTournaments: 'tournaments/getAll',
      getListMatches: 'matches/getAll',
      setMatches: 'matches/setExtractItems',
      setTournament: 'tournaments/setOne'
    }),
    addTournament() {
      this.$router.push({
        name: 'add-tournaments'
      });
    },
    getCreatedString(item) {
      return utils.getCreatedString(item.createdBy, item.createdAt);
    },
    goMenu(url, tournament) {
      this.setMatches([]);
      this.setTournament(tournament);
      this.$router.push({
        name: url,
        params: {
          id: tournament.gId
        }
      });
    }
  },
  mounted() {
    this.getListTournaments();
    this.getListMatches();
  }
};
</script>
