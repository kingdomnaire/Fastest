<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950 h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/WHO WANTS TO BE A RABBI.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Register your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label for="email" class="block font-bold text-lg leading-6 text-gray-100">Email address</label>
        <div class="mt-2">
          <input v-model="email" type="email" autocomplete="email"  
          class="block w-full rounded-md border-0 py-1.5 px-2 font-bold text-blue-900 shadow-sm ring-1 
          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
          focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label for="text" class="block font-bold text-lg leading-6 text-gray-100">Full name</label>
        <div class="mt-2 flex gap-3">
          <input v-model="firstName" type="text" autocomplete="text" 
          class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
          focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1 " placeholder="First Name" />

          <input v-model="lastName" type="text" autocomplete="text"  
          class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
          focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label for="text" class="block font-bold text-lg leading-6 text-gray-100">Church</label>
        <div class="mt-2">
          <input v-model="church" type="text" autocomplete="text"  
          class="block w-full rounded-md border-0 py-1.5 pl-2 text-blue-900 shadow-sm ring-1 
          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
          focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <label for="date" class="block font-bold text-lg leading-6 text-gray-100">Date of birth</label>
        <div class="mt-2">
          <input name="dateOfBirth"
            type="date"
            v-model="dateOfBirth"
            @input="updateAge"
            class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
          <span class="text-gray-400" v-if="age !== null"> You are {{ age }} years old.</span>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-lg font-bold leading-6 text-gray-100">Password</label>
          <div class="text-sm">
            <!--<a href="#" class="font-semibold text-indigo-100 hover:text-blue-50">Forgot password?</a>-->
          </div>
        </div>
        <div class="mt-2">
          <input v-model="password" type="password" autocomplete="current-password" placeholder="Enter Password"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-blue-900 font-bold shadow-sm ring-1 ring-inset
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
          sm:text-sm sm:leading-6" />
          <span v-if="password.length < 8" class="text-red-500 text-sm">Password must be at least 8 characters long.</span>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-green-700 
        px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="registerUser">
        Register
        </button>
      </div>

      <p class="mt-10 text-center text-lg text-gray-100">
        Already Registered?
        {{ ' ' }}
        <router-link to="/login" class="font-semibold leading-6 text-green-400 hover:text-green-300">login </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      church: '',
      dateOfBirth: '',
      password: '',
      age: null,
    };
  },

  methods: {
    calculateAge(dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },

    // Update the age when the date of birth is changed
    updateAge() {
      if (this.dateOfBirth) {
        this.age = this.calculateAge(this.dateOfBirth);
      } else {
        this.age = null;
      }
    },

    async registerUser() {
      if (this.age === null) {
        alert('Please enter a valid date of birth.');
        return;
      }

      if (this.age < 13 || this.age > 25) {
        alert('You need to be above 13 and below 25 years old to register.');
        return;
      }

      if (this.password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }

      try {
        const formData = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          church: this.church,
          age: this.age,
          password: this.password,
        };

        const response = await axios.post('https://quizzes-bmo0.onrender.com/user/register', formData);

        // Handle the response as needed
        console.log('user is registered:', response.data);
        alert('Registration successful!'); // Replace this with a custom modal or toast notification library if desired
        this.$router.push("/login");
      } catch (error) {
        console.error('An error occurred while registering the user:', error.response || error.message);
      }
    },
  },
};
</script>
