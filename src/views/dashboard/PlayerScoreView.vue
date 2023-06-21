<template>
    <div>
        <NavbarView/>
        <div class="w-screen h-screen absolute z-30 bg-blue-950 bg-opacity-80 flex justify-center">
            <div class="flex gap-8 text-white font-bold text-lg pt-10"> 
                <div>player Name</div>
                <div>Timestamp</div>

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