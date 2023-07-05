<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-950 h-screen">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">Register your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="text" class="block font-bold text-lg leading-6 text-gray-100">Full name</label>
            <div class="mt-2 flex gap-3">
              <input id="email" name="email" type="text" autocomplete="text" 
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1 " placeholder="First Name" />

               <input id="email" name="email" type="text" autocomplete="text"  
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1" placeholder="Last Name"/>
            </div>
            
          </div>
          <div>
            <label for="text" class="block font-bold text-lg leading-6 text-gray-100">Church</label>
            <div class="mt-2">
              <input id="email" name="email" type="text" autocomplete="text"  
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="date" class="block font-bold text-lg leading-6 text-gray-100">Date of birth</label>
            <div class="mt-2">
              <input id="email" name="email" type="date"   
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="email" class="block font-bold text-lg leading-6 text-gray-100">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email"  
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
               focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
              <input id="password" name="password" type="password" autocomplete="current-password" 
              class="block w-full rounded-md border-0 py-1.5 text-blue-900 shadow-sm ring-1 ring-inset
               ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
               sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-green-700 
            px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Register
            </button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-lg text-gray-100">
          Already Registered?
          {{ ' ' }}
          <router-link to="/login" class="font-semibold leading-6 text-green-400 hover:text-green-300">login </router-link>
        </p>
      </div>
    </div>
  </template>