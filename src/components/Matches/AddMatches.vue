<template>
  <v-container grid-list-xs grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        Match: {{ match.bestOf }}
      </v-flex>
      <v-flex xs12 md6 lg4 v-for="(item, index) in matchList" :key="index">
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ item.teamRed }} vs {{ item.teamBlue }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="headline mb-0">{{ item.gId }}</h3>
              <div>{{ item.date }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="isMatchDisable(item.gId)" outline block color="green" @click="addMatch(item)">{{ getAddBtnText(item.gId) }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import utils from '@/utils';
import { APPCONFIG } from '@/config';
import _ from 'lodash';

export default {
  data () {
    return {
      currentMatchSelect: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      tournament: state => state.tournaments.item,
      gMatchList: state => state.matches.items,
      matchList: state => state.matches.extractItems,
      match: state => state.matches.extractItem
    })
  },
  mounted() {
    if (this.matchList.length > 0) {
      return;
    }
    let payload = {
      url: APPCONFIG.MATCHTICKER + this.$route.params.id + '/upcoming',
      callback: this.fetchListmatch
    };
    utils.fetchUrl(payload);
    this.setLoading(true);
  },
  methods: {
    ...mapActions({
      postOne: 'matches/postOne',
      getExtractMatches: 'matches/getExtractItems',
      getExtractMatch: 'matches/getExtractItem',
      loadSnackbar: 'loadSnackbar',
      setLoading: 'setLoading',

    }),
    fetchListmatch(contents) {
      this.onSuccessFetched();
      this.getExtractMatches(contents);
    },
    addMatch(item) {
      if (this.tournament && this.tournament.gId) {
        this.currentMatchSelect = item;
        let payload = {
          url: APPCONFIG.TOURNAMENT_DETAIL_URL + this.tournament.link + "/matches/" + item.link,
          callback: this.fetchMatch
        }
        this.setLoading(true);
        utils.fetchUrl(payload);
      }
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
    fetchMatch(item) {
      this.getExtractMatch(item);
      let payload = {
          data: {
            tournament: {
                name: this.tournament.name,
                gId: this.tournament.gId,
                link: this.tournament.link
              },
            bestOf: this.match.bestOf,
            date: this.match.date,
            link: this.currentMatchSelect.link,
            gId: this.currentMatchSelect.gId,
            teamRed: this.match.teamRed,
            teamBlue: this.match.teamBlue,
            result: this.match.result,
            createdBy: this.user.user.email
          },
          callback: this.updateMatchList
      };
      this.setLoading(true);
      this.postOne(payload);
    },
    updateMatchList(response) {
      this.onSuccessFetched();
    },
    isMatchDisable(gId) {
      return _.findIndex(this.gMatchList, function(o) { return o.gId === gId; }) > -1;
    },
    getAddBtnText(gId) {
      return this.isMatchDisable(gId) ? 'Added' : 'Add match';
    }
  }
};
</script>

<style scoped>
.logo {
  height: 200px;
}
</style>
