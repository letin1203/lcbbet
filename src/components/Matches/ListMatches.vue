<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex v-if="matches.length === 0">
        <h1 class="text-xs-center">Méo có match nào để bet.</h1>
      </v-flex>
      <v-flex v-for="match in matches" :key="match.id" xs12 md6 x13 pa-2>
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ match.teamRed.name }} vs {{ match.teamBlue.name }}</v-toolbar-title>
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
                <v-list-tile @click="bet(match)">
                  <v-list-tile-title>Bet</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="headline mb-0">{{ match.teamRed.name }} - {{ match.teamRed.rate }} VS {{ match.teamBlue.name }} - {{ match.teamBlue.rate }}</h3>
              <h5>{{ match.bestOf }}</h5>
              <h5>{{ match.gId }}</h5>
              <div>{{ match.date }}</div>
              <div>Result: {{ match.result }}</div>
              <div>{{ getCreatedString(match) }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import utils from '@/utils';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      matches: state => state.matches.items
    }),
    ...mapGetters({
      isAuthenticated: 'users/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      getListMatches: 'matches/getListByTournament',
      setMatches: 'matches/setExtractItems',
      setTournament: 'matches/setOne'
    }),
    getCreatedString(item) {
      return utils.getCreatedString(item.createdBy, item.createdAt);
    },
  },
  mounted() {
    if (this.$route.params.id) {
      let payload = {
        gId: this.$route.params.id
      }
      this.getListMatches(payload);
    } else {
      this.$router.push({
        name: '/'
      })
    }
  }
};
</script>
