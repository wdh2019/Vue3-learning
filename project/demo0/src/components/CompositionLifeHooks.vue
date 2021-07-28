<template>
    <h1>Composition Life Hooks 练习</h1>
</template>
<script>
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';

export default {
    name:'CompositionLifeHooks',
    data(){
        console.log('data');
        return {}
    },
    setup() {
        console.log('setup');
        onBeforeMount(()=>{
            console.log('onBeforeMount');
        });
        onMounted(()=>{
            console.log('onMounted');
        });
        onBeforeUpdate(()=>{
            console.log('onBeforeUpdate');
        });
        onUpdated(()=>{
            console.log('onUpdated');
        });
        onBeforeUnmount(()=>{
            console.log('onBeforeUnmount');
        });
        onUnmounted(()=>{
            console.log('onUnmounted');
        });
    },
}
</script>