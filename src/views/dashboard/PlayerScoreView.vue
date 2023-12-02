<template>
  <div>
    <NavbarView />
    <div class="w-screen h-full absolute z-30 bg-opacity-80 flex justify-center">
      <div v-if="players.length === 0" class="text-center">
        <p class="text-gray-400 font-bold">Data will show after the game</p>
        <p class="text-gray-400 font-bold">Hello {{ login.firstName }}! The game is locked; you will be notified soon.</p>
      </div>
      <template v-else>
        <table class="table-auto">
          <!-- Add styling classes specific to your design system -->
          <thead>
            <tr class="bg-blue-600 h-10 text-gray-200">
              <th class="pr-10 pl-2">Player Name</th>
              <th class="pl-10 pr-2">Player Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player.id" class="bg-blue-900 h-10 text-gray-200 font-bold">
              <td class="pr-40 pl-4">{{ getPlayerName(player.user) }}</td>
              <td class="pr-4 pl-2">{{ player.time }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarView from './NavbarView.vue';

export default {
  components: {
    NavbarView,
  },
  data() {
    return {
      players: [],
      login: {}, // Initialize the login object with an empty object
    };
  },
  methods: {
    getPlayerName(user) {
      // Add logic to get the player name based on user data
      return `${user.firstName} ${user.lastName}`;
    },
  },
  async mounted() {
    try {
      const loginData = localStorage.getItem('login');
      if (loginData) {
        this.login = JSON.parse(loginData);
      }

      const response = await axios.get('https://quizzes-bmo0.onrender.com/fingers');
      this.players = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You might want to provide more detailed error handling here
    }
  },
};
</script>
