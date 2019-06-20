<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex v-for="match in matches" :key="match.id" xs12 md6 x13 pa-2>
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ match.teamRed.name }} vs {{ match.teamBlue.name }}</v-toolbar-title>
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
            </v-menu>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="headline mb-0">{{ match.teamRed.name }} - {{ match.teamRed.rate }} VS {{ match.teamBlue.name }} - {{ match.teamBlue.rate }}</h3>
              <h5>{{ match.bestOf }}</h5>
              <h5>{{ match.gId }}</h5>
              <div>{{ match.date }}</div>
              <div>Result: {{ match.result }}</div>
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
      matches: state => state.matches.items
    })
  },
  methods: {
    ...mapActions({
      getListMatches: 'matches/getListByTournament',
      setMatches: 'matches/setExtractItems',
      setTournament: 'matches/setOne'
    })
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
