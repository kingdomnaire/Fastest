<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950 h-screen">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!--<img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />-->
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
          <div v-if="loginError" class="text-red-500 text-sm text-center mt-2">Invalid email or password.</div>
          <div>
            <label for="email" class="block font-bold text-lg leading-6 text-gray-100">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email"  
              class="block w-full rounded-md border-0 py-1.5 px-2 text-blue-900 font-bold shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter Email" />
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
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" 
              class="block w-full rounded-md border-0 py-1.5 px-2 text-blue-900 font-bold shadow-sm ring-1 ring-inset
               ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
               sm:text-sm sm:leading-6" placeholder="Enter Password" />
            </div>
          </div>
  
          <div class="mt-3">
            <button type="submit" class="flex w-full justify-center rounded-md bg-green-700 
            px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="loginUser">
            Sign in
            </button>
          </div>
  
        <p class="mt-10 text-center text-lg text-gray-100">
          can't login?
          {{ ' ' }}
          <router-link to="/register" class="font-semibold leading-6 text-green-400 hover:text-green-300">Register </router-link>
        </p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const loginData = {
          email: this.email,
          password: this.password,
        };

        const response = await axios.post('https://quizzes-bmo0.onrender.com/user/login', loginData );

        // Check the response status and handle accordingly
        if (response.status === 200) {
          // Login successful
          localStorage.setItem("login", JSON.stringify(response.data));
          // You can handle the successful login here, e.g., redirect to the user dashboard
          this.$router.push("/dashboard");
          console.log('Login successful:', response.data);
        } else {
          // Login failed
          // Handle invalid email or password prompt
          console.log('Login failed:', response.data);
          this.loginError = true;
        }
      } catch (error) {
        console.error('An error occurred while logging in:', error.response || error.message);
        this.loginError = true;
      }
    },
  },
};
</script>