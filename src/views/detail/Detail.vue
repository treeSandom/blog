<template>
    <div>
        <blog-detail></blog-detail>
        <starry-sky></starry-sky>
        
    </div>
</template>

<script>
import starrySky from '../../components/starrySky'
import canvass from '../../utils/canvas-nets'
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