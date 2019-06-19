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
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-img :src="item.logo" class="logo"> </v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.title }}</h3>
              <div>
                {{ item.rank }}
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
  }
};
</script>

<style scoped>
.logo {
  height: 200px;
}
</style>
