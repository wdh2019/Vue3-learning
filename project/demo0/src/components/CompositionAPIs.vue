<template>
    <!-- Composition API 练习-->
    <div>
        <h1>Composition API 练习</h1>
        <div class="content">
            <h2 @click="addCounter">Counter: {{counter}}</h2>
            <div>
                <h2>user: {{ user.username }}</h2>
                <span @click="addAge">{{ user.age }}</span>
                <br/>
                <span>{{ user.gender }}</span>
            </div>
            <div>
                <h1>toRefsUser: {{ username }}</h1>
                <span @click="addRefsAge">{{ age }}</span>
                <br/>
                <span>{{ gender }}</span>
            </div>
            <h2>reverseUsername: {{ reversedUsername }}</h2>
        </div>
        
    </div>
</template>

<script>
import {ref, reactive, toRefs, computed, watchEffect, watch} from 'vue';

export default {
    name:'Composition',
    props:{
        name:{
            type: String,
            required: true,
        }
    },
    setup(props) {
        // setup函数接收参数props
        console.log("setup函数接收参数props",props);

        // ref函数定义响应式变量counter
        const counter = ref(0);
        console.log("ref函数定义响应式变量counter",counter);
        function addCounter(){
            counter.value++;
        }

        // reactive函数定义响应式对象user
        const user = reactive({
            username: props.name,
            age: 21,
            gender: '男'
        });
        function addAge(){
            user.age++;
        }

        // toRef和toRefs
        const toRefsUser = toRefs(user);
        function addRefsAge(){
            toRefsUser.age.value++;
        }

        // computed函数定义计算属性
        const reversedUsername = computed(()=>{
            return user.username.split('').reverse().join('');
        })

        // watchEffect函数自动监听用到的属性
        watchEffect(()=>{
            console.log("监听到user.age改变",user.age);
        });
        // watch函数监听对象，可监听多个对象
        watch([counter, user],(newVal, oldVal)=>{
            console.log("监听到counter或user改变",newVal, oldVal);
        })

        return {
            counter,addCounter,
            user,addAge,
            ...toRefsUser,addRefsAge,
            reversedUsername
        }
    },
}
</script>
