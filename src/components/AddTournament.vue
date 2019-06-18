<template>
  <v-container grid-list-xs grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="(item, index) in tournamentList" :key="index">
        <v-card>
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ item.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.name }}</h3>
              <div>{{ item.date }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn outline block color="green" @click="getTournament(item.link)">View Participants</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-container fluid style="min-height: 0" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="title"
                name="title"
                label="Describe me"
                id="title"
              />
              <v-text-field
                v-model="author"
                name="author"
                label="Author"
                hint="your name"
                id="author"
              />
              <v-btn block color="primary" @click="post()">
                SUBMIT
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import utils from '@/utils';
import { APPCONFIG } from '@/config';

export default {
  data() {
    return {
      title: '',
      author: ''
    };
  },
  computed: {
    ...mapState({
      gosuHtml: state => state.dataFetched,
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
    post() {
      let payload = {
        data: {
          imgUrl: this.imgUrl,
          title: this.title,
          createdBy: this.author
        }
      };
      this.postOne(payload);
    },
    onSuccessFetched () {
      this.loadSnackbar({
        show: true,
        text: APPCONFIG.FETCHED_SUCCESS_MESSAGE,
        color: 'success'
      });
      setTimeout(() => { this.setLoading(false); }, 200);
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
    getParticipantTitle(participant) {
      return $(participant)
        .find('.name')
        .text();
    },
    getParticipantRank(participant) {
      return $(participant)
        .find('small')
        .text();
    },
    getParticipantLogo(participant) {
      return $(participant)
        .find('.avatar')
        .prop('style')
        .cssText.split('"')[1];
    }
  }
};
</script>

<style scoped>
.logo {
  height: 200px;
}
</style>
