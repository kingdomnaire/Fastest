<template>

import router from '@/router';
    <div class="w-screen h-screen absolute z-30 bg-blue-950 bg-opacity-80 flex justify-center items-center">
        
        <div class="bg-blue-900 p-4 text-center text-white">
            <p class="font-bold text 2xl"> All Done!</p>
            <p class="my-4 font-bold text-3xl">score {{ score }}</p>

            <!--Buttons-->
        <div class="flex justify-around">
            <div class="rounded-full py-1 w-28 border cursor-pointer
            hover:text-black hover:bg-white">
            <router-link to="/dashboard">View all result</router-link>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
export default{
    name: "QuizCompleteOverlay",
    props: ["score"],
}
</script>