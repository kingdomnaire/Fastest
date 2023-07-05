<template>
    <div>
        <NavbarView/>
        <div class="w-screen h-5/5 absolute z-30 bg-opacity-80 flex justify-center">
            <table class="">
            <thead>
                <tr class="bg-blue-600 w-auto h-10 text-gray-300">
                <th>Player Name</th>
                <th>Time Stamp</th>
                </tr>
            </thead>
            <tbody class="">
                <tr class="bg-blue-900 w-auto h-10 text-gray-200 font-bold">
                <td class="pr-10 pl-4">Emmanuel Amadi Okechukwu</td>
                <td class="pr-4 pl-2">7/5/2023, 10:31:06 AM:724</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NavbarView from './NavbarView.vue';
export default{
    components: { NavbarView }
}
</script>
