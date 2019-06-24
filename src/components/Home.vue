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
            <v-menu bottom left v-if="isAuthenticated">
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
                <v-list-tile 
                  v-for="(menu, i) in menuItems"
                  :key="i"
                  @click="goMenu(menu.url, tournament)"
                >
                  <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
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
          <v-card-actions>
            <v-btn block color="green" @click="getPoints(tournament)">Get {{ tournament.points }} points</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import utils from '@/utils';
import { mapState, mapGetters, mapActions } from 'vuex';
import { APPCONFIG } from '@/config'

export default {
  computed: {
    ...mapState({
      tournaments: state => state.tournaments.items,
      user: state => state.users.user
    }),
    ...mapGetters({
      isAuthenticated: 'users/isAuthenticated'
    }),
    menuItems() {
      return [
        { title: 'Add Matches', url: 'add-matches' },
        { title: 'Go Bet', url: 'tournament-matches' }
      ]
    }
  },
  methods: {
    ...mapActions({
      getListTournaments: 'tournaments/getAll',
      getListMatches: 'matches/getAll',
      setMatches: 'matches/setExtractItems',
      setTournament: 'tournaments/setOne',
      addUserTournament: 'users/addUserTournament',
      loadSnackbar: 'loadSnackbar',
      setLoading: 'setLoading'
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
    },
    onSuccessFetched() {
      this.loadSnackbar({
        show: true,
        text: APPCONFIG.FETCHED_SUCCESS_MESSAGE,
        color: 'success'
      });
      setTimeout(() => {
        this.setLoading(false);
      }, 200);
    },
    getPoints(tournament) {
      let payload = {
          data: {
            tournament: {
                name: tournament.name,
                gId: tournament.gId,
                link: tournament.link
              },
            userEmail: this.user.user.email,
            createdBy: this.user.user.email
          },
          callback: this.onSuccessFetched
      };
      this.setLoading(true);
      this.addUserTournament(payload);
    }
  },
  mounted() {
    this.getListTournaments();
    this.getListMatches();
  }
};
</script>
