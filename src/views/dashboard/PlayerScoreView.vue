<template>
    <div>
        <NavbarView/>
        <div class="w-screen h-5/5 absolute z-30 bg-opacity-80 flex justify-center">
            <div class="flex gap-6 grid-cols-2 h-20 text-blue-950 font-bold text-lg pt-10"> 
                <div>player Name</div>
                <div class="">Timestamp</div>
            </div>
            <div class="flex gap-6 bg-gray-400 -ml-56 mt-24 h-10 z-50 text-blue-950">
                    <div>Emmanuel Amadi</div>
                    <div>your time</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarView from './NavbarView.vue';
export default{
    components: { NavbarView }
}
</script>