<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex>
        <v-dialog v-model="dialogBet">
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Bet {{ currentTeamPick.name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p>Using {{ getCurrentBet() }} points.</p>
              <p>Rate of {{ currentTeamPick.name }} is {{ currentTeamPick.rate }}%</p>
              <p>If win: + {{ getPlusPoints() }} points</p>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="warning" @click="dialogBet = false">Đéo</v-btn>
              <v-btn block color="primary" @click="bet()">Bet</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex v-if="matches.length === 0">
        <h1 class="text-xs-center">Méo có match nào để bet.</h1>
      </v-flex>
      <v-flex v-for="match in matches" :key="match.id" xs12 md6 x13 pa-2>
        <v-card class="flex-card">
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ match.bestOf }}</v-toolbar-title>
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
                <v-list-tile @click="showConfirm(match, match.teamRed)">
                  <v-list-tile-title>Bet {{match.teamRed.name}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="showConfirm(match, match.teamBlue)">
                  <v-list-tile-title>Bet {{match.teamBlue.name}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-if="isBo2(match.bestOf)" @click="showConfirm(match, 'draw')">
                  <v-list-tile-title>Bet Draw</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text class="grow">
            <div>
              <h3 class="mb-0 text-xs-center">{{ match.teamRed.name }} - {{ match.teamRed.rate }}</h3>
              <h3 class="mb-0 text-xs-center">VS</h3>
              <h3 class="mb-0 text-xs-center">{{ match.teamBlue.name }} - {{ match.teamBlue.rate }}</h3>
              <h3 class="mb-0 text-xs-center" v-if="isBo2(match.bestOf)">Draw - {{ getDrawRate(match.teamRed.rate, match.teamBlue.rate) }}</h3>
              <div>{{ match.date }}</div>
              <div v-if="match.result !== ''">Result: {{ match.result }}</div>
              <div>{{ getCreatedString(match) }}</div>
              <v-flex xs12 class="mt-4">
                <v-slider
                  v-model="match.percent"
                  @input="onPercentBetChange(match)"
                  always-dirty
                  thumb-label="always"
                  min="5"
                  step="5"
                ></v-slider>
              </v-flex>
              <div>Wanna bet: {{ getCurrentMatchBet(match) }} points</div>
              <div>Your points: {{ currentPoints }}</div>
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
  data () {
    return {
      dialogBet: false,
      currentTeamPick: {
        name: '',
        rate: 0
      },
      percentBet: 5,
      currentPoints: 1000
    }
  },
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
    isBo2(bestOf) {
      return utils.isBo2(bestOf);
    },
    getDrawRate(rateRed, rateBlue) {
      return utils.getDrawRate(rateRed, rateBlue);
    },
    showConfirm(match, team) {
      if (team === 'draw') {
        this.currentTeamPick.name = 'Draw';
        this.currentTeamPick.rate = this.getDrawRate(match.teamRed.rate, match.teamBlue.rate);
      } else {
        this.currentTeamPick = team;
      }
      this.percentBet = match.percent || 5;
      this.dialogBet = true;
    },
    bet() {
      this.currentPoints = this.currentPoints - this.getCurrentBet();
      this.dialogBet = false;
    },
    getCurrentBet () {
      return Math.round(this.percentBet * this.currentPoints / 100);
    },
    getPlusPoints() {
      return Math.round(this.currentPoints * (50 / (Number(this.currentTeamPick.rate))) * (Number(this.percentBet) / 100));
    },
    onPercentBetChange(match) {
      this.percentBet = match.percent || 5;
      match.currentBet = Math.round(match.percent * this.currentPoints / 100);
    },
    getCurrentMatchBet(match) {
      return Math.round((match.percent || 5) * this.currentPoints / 100);
    }
  },
  mounted() {
    if (this.$route.params.id) {
      let payload = {
        gId: this.$route.params.id
      }
      this.getListMatches(payload);
    }
  }
};
</script>
