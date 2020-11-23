<template>
    <div>
        <show-blog></show-blog>
        <starry-sky></starry-sky>
    </div>
</template>

<script>
import starrySky from '../../components/starrySky.vue'
import canvass from '../../utils/canvas-nets'
// import $ from 'jquery' 
export default {
    components:{
        starrySky
    },
    mounted(){
        canvass
    }
}
</script>

<style scoped>
    canvas{
    background: rgb(226, 225, 225);
    opacity: 0.3;
    }
</style>