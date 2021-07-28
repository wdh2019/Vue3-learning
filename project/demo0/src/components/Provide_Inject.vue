<template>
    <h1>Provide & Inject 练习</h1>
    <Student />
</template>
<script>
import {reactive, provide} from 'vue';
import Student from './Student.vue';

export default {
    name:'ProvideInject',
    components:{
        Student
    },
    setup() {
        const student = reactive({
            name: 'xiaowang',
            age: 21,
            gender: '男'
        });
        provide('student', student);
    },
}
</script>