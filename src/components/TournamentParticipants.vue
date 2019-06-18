<template>
  <v-container grid-list-xs grid-list-lg>
    <v-layout row wrap>
      <v-flex
        xs12
        sm4
        v-for="(item, index) in tournament.commonParticipants"
        :key="index"
      >
        <v-card>
          <v-toolbar color="purple" dark>
            <v-toolbar-title>{{ getParticipantTitle(item) }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-img :src="getParticipantLogo(item)" class="logo">
          </v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ getParticipantTitle(item) }}</h3>
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      tournament: state => state.tournaments.extractItem
    })
  },
  methods: {
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
