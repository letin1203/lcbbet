<template>
  <v-container grid-list-xs grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-for="(item, index) in tournamentList" :key="index">
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ item.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="headline mb-0">{{ item.name }}</h3>
              <div>{{ item.date }}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outline block color="green" @click="getTournament(item.link)">View Participants</v-btn>
            <v-btn :disabled="isTournamentDisable(item.gId)" outline block color="green" @click="addTournament(item)">{{ getAddBtnText(item.gId) }}</v-btn>
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
  data() {
    return {
      title: '',
      author: ''
    };
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      gosuHtml: state => state.dataFetched,
      gTournamentList: state => state.tournaments.items,
      tournamentList: state => state.tournaments.extractItems,
      tournament: state => state.tournaments.extractItem
    })
  },
  mounted() {
    if (this.tournamentList.length > 0) {
      return;
    }
    let payload = {
      callback: this.fetchListTournament
    };
    this.getHtml(payload);
    this.setLoading(true);
  },
  methods: {
    ...mapActions({
      getHtml: 'getHtml',
      postOne: 'tournaments/postOne',
      getExtractItems: 'tournaments/getExtractItems',
      getExtractItem: 'tournaments/getExtractItem',
      loadSnackbar: 'loadSnackbar',
      setLoading: 'setLoading'
    }),
    fetchListTournament() {
      this.onSuccessFetched();
      this.getExtractItems(this.gosuHtml);
    },
    addTournament(item) {
      let payload = {
        data: {
          name: item.name,
          date: item.date,
          link: item.link,
          gId: item.gId,
          points: item.points,
          createdBy: this.user.user.email
        }
      };
      this.postOne(payload);
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
    getTournament(link) {
      this.setLoading(true);
      let payload = {
        url: APPCONFIG.TOURNAMENT_DETAIL_URL + link,
        callback: this.fetchTournament
      };
      utils.fetchUrl(payload);
    },
    fetchTournament(data) {
      this.onSuccessFetched();
      this.getExtractItem(data);
      this.$router.push({
        name: 'tournament-participants'
      });
    },
    isTournamentDisable(gId) {
      return _.findIndex(this.gTournamentList, function(o) { return o.gId === gId; }) > -1;
    },
    getAddBtnText(gId) {
      return this.isTournamentDisable(gId) ? 'Added' : 'Add Tournament';
    }
  }
};
</script>

<style scoped>
.logo {
  height: 200px;
}
</style>
