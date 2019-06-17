<template>
  <v-app>
    <v-toolbar app>
      <v-btn icon v-if="$route.name !== 'home'" @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span>LCB BET</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn icon @click="goLogin">
          LOGIN
        </v-btn>
        <v-btn icon @click="goJoin">
          JOIN
        </v-btn>
      </div>
      <div v-else>
        <v-btn icon @click="userLogout">
          LOGOUT
        </v-btn>
      </div>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      matches: state => state.matches.items,
      isAuthenticated: state => state.users.isAuthenticated
    }),
    matchesLength() {
      return this.matches ? this.matches.length : 0;
    }
  },
  methods: {
    ...mapActions({
      userLogout: 'users/userLogout'
    }),
    goBack() {
      this.$router.go(-1);
    },
    goLogin() {
      this.$router.push({
        name: 'login'
      });
    },
    goJoin() {
      this.$router.push({
        name: 'join'
      });
    }
  }
};
</script>
