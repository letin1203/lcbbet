<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs4 sm6 v-for="(item, index) in tournament.commonParticipants" :key="index">
        <v-card>
          <v-img :src="getParticipantLogo(item)" class="logo">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline black--text">{{getParticipantTitle(item)}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{getParticipantTitle(item)}}</h3>
              <div>
                {{ getParticipantRank(item) }}
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn outline block color="green">Select This Team</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4 sm6 v-for="(item, index) in tournamentList" :key="index">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.name }}</h3>
              <div>{{ item.date }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn outline block color="green">Select This Tournament</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <div id="spinner_container">
          <v-progress-circular
            v-if="loading"
            v-bind:size="40"
            indeterminate
            color="pink"
            class="spinner"
          >
          </v-progress-circular>
        </div>

        <v-container fluid style="min-height: 0" grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <img :src="this.imgUrl" />
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
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import utils from '@/utils';
import { APPCONFIG } from '@/config';

export default {
  data() {
    return {
      imgUrl: null,
      title: '',
      author: '',
      loading: true
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
    axios
      .get('https://dog.ceo/api/breed/appenzeller/images/random')
      .then(response => {
        if (response.data.status) {
          this.imgUrl = response.data.message;
          this.loading = false;
        } else {
          // TODO toast error
        }
      });
    let payload = {
      callback: this.fetchListTournament
    }
    this.getHtml(payload);
  },
  methods: {
    ...mapActions({
      getHtml: 'getHtml',
      postOne: 'tournaments/postOne',
      getExtractItems: 'tournaments/getExtractItems',
      getExtractItem: 'tournaments/getExtractItem'
    }),
    fetchListTournament() {
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
    getTournament(link) {
      let payload = {
        url: APPCONFIG.TOURNAMENT_DETAIL_URL + link,
        callback: this.fetchTournament
      };
      utils.fetchUrl(payload);
    },
    fetchTournament(data) {
      this.getExtractItem(data);
    },
    getParticipantTitle(participant) {
      return $(participant).find('.name').text();
    },
    getParticipantRank(participant) {
      return $(participant).find('small').text();
    },
    getParticipantLogo(participant) {
      return $(participant).find('.avatar').prop('style').cssText.split('"')[1];
    }
  }
};
</script>

<style scoped>
#spinner_container {
  text-align: center;
}
.spinner {
  margin: auto;
  margin: 4rem;
}
.logo {
  height: 200px;
}
</style>
