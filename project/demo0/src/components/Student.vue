<template>
    <div class='content'>
        <h2>{{ name }}</h2>
        <span>{{ age }}</span>
        <br />
        <span>{{ gender }}</span>
    </div>
</template>
<script>
import { inject } from 'vue';

export default {
    name:'Student',
    setup() {
        const student = inject('student');
        return {
            ...student
        }
    }
}
</script>