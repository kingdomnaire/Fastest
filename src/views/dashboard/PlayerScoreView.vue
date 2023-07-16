<template>
    <div>
      <NavbarView />
      <div class="w-screen h-5/5 absolute z-30 bg-opacity-80 flex justify-center">
        <table class="">
          <thead>
            <tr class="bg-blue-600 w-auto h-10 text-gray-300">
              <th>Player Name</th>
              <th>Player Age</th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="player in players" :key="player.id" class="bg-blue-900 w-auto h-10 text-gray-200 font-bold">
              <td class="pr-10 pl-4">{{ player.firstName }}</td>
              <td class="pr-4 pl-2">{{ player.age }}</td>
            </tr>
          </tbody>
        </table>
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
      };
    },
    async mounted() {
      try {
        const response = await axios.get('https://quizzes-bmo0.onrender.com/user');
        this.players = response.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  
