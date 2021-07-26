# Vue3 笔记

<a href="https://v3.cn.vuejs.org/">Vue3官网链接</a>

## Vite

Web 开发构建工具，快速构建。

```bash
npm init @vitejs/app ${projectName}
cd ${projectName}
npm install
```

启动热部署，部署在`localhost:3000`

```bash
npm run dev
```



### 问题

<a href="https://blog.csdn.net/qq_41499782/article/details/116118683">博客链接</a>

**报错**

```javascript
events.js:288
      throw er; // Unhandled 'error' event

Error: spawn E:\前端学习note\Vuenote\Vue3\project\demo0\node_modules\esbuild\esbuild.exe 
ENOENT
```

**原因**

找不到文件 `esbuild/esbuild.exe` 

**解决**

```bash
node ./node_modules/esbuild/install.js
```



## Composition API

<a href="https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api">链接</a>

解决逻辑关注点的碎片化。

### setup 函数

- 在组件创建**之前**执行，所以组件的`data`/`methods`/`computed`属性尚不能获取。

- 接收2个参数：`props`和`context`。
- 避免使用`this`指向组件实例。

```javascript
export default {
    props: {
    	user: {
      	type: String,
      	required: true
    	}
  	},
    setup(props) {
    	console.log(props) // { user: '' }
    	return {} // 这里返回的任何内容都可以用于组件的其余部分
	},
    // 组件的“其他部分”
}
```

### ref

使用`ref`函数，创建一个响应式变量。

```javascript
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

- 操作时需访问`value`属性，如`counter.value`。但在模板里可以直接使用变量，如插值`{{ counter }}`
- 响应式变量的修改不会影响原始数据。

### reactive

使用`reactive`函数，创建一个响应式对象。

```javascript
import { reactive } from 'vue'

const user = reactive({
	username: 'xiaowang',
	age: 21,
	gender: '男'
});
```

### toRef 和 toRefs

使用`toRef`函数，为原始数据的属性创建一个`ref`类型变量，其修改会影响原始数据。

使用`toRefs`函数，为原始数据的每个属性都创建`ref`类型变量，其修改会影响原始数据。

- 相当于对对象的每个属性都使用`toRef`函数。

- 可以用于对返回的对象进行解构，且不丢失响应性。

  ```javascript
  return {
  	...toRefs(user)
  }
  ```

### computed

使用`computed`函数，创建计算属性。

```javascript
const reverseUsername = computed(()=>{
	return user.username.split('').reverse().join('');
})
```

### watchEffect

使用`watchEffect`函数，自动监听所用到的属性。

```javascript
watchEffect(()=>{
	console.log("监听到user.age改变",user.age);
});
```

### watch

使用`watch`函数，监听对象。可以同时监听多个对象。

```javascript
watch([counter, user],(newVal, oldVal)=>{
	console.log("监听到counter或user改变",newVal, oldVal);
});
```

