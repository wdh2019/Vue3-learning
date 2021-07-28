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

### 生命周期

setup()函数中可以使用的生命周期如下：

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted

需要用`import`从`vue`中引入：

```javascript
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';
```



## Provide & Inject

组件间可以通过`provide`函数和`inject`函数传值。

- 使用`provide`传递值：

```javascript
const student = reactive({
    name: 'xiaowang',
    age: 21,
    gender: '男'
});
provide('student', student);
```

- 使用`inject`接收值：

```javascript
const student = inject('student');
// 对 student 进行操作
```



## 路由器

<a href="https://next.router.vuejs.org/installation.html">Vue Router 官方链接</a>

### 安装路由

```bash
npm install vue-router@next
```

### 基本路由

router/index.js

```javascript
import {createRouter, createWebHashHistory} from 'vue-router';

// 1. Define route components.
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  // 4. Provide the history implementation to use.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router
```

### 使用路由

main.js

```javascript
import router from './router'

const app = createApp(App);

//使用路由
app.use(router);
```



### 路由匹配

#### 动态路由

通常用`:`后跟参数表示，参数会包含在$route.params中。

````javascript
{
	path: '/news/:id', component: News
}
````

#### 匹配全路由（用于404）

```javascript
{
	path: '/:path(.*)*', component: NotFound
}
```

#### 路由正则

在括号中为参数指定自定义正则表达式。

- 以下`id`参数总是数字

```javascript
{
	path: '/news/:id(\\d+)', component: News
}
```

#### 可重复参数

匹配具有多个部分的路由。

- `*`表示 0 或更多

```javascript
// 匹配 /, /one, /one/two, /one/two/three 等
{ path: '/news/:id*' }
```

- `+`表示 1 或更多

```javascript
// 匹配 /one, /one/two, /one/two/three 等
{ path: '/news/:id+' }
```

#### 可选参数

将参数标记为可选。

- `?`表示 0 或 1

```javascript
// 匹配 /news 和 /news/some-id
{ path: '/news/:id?' }
```



### 嵌套路由

`children`属性

```javascript
{ 
    path: '/user/:id?', component: User, 
    children:[
        {
            path: 'vertical',
            component: Vertical
        },
        {
            path: 'horizontal',
            component: Horizontal
        }
    ] 
}
```



### 路由跳转

#### router-link

```html
<router-link to='/'>Go to Home</router-link>
```

#### this.$router.push

用于页面跳转。

- 可以携带参数。

```javascript
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })
```

#### this.$router.replace

用于替换当前页面。

- 后退不到之前的一个页面，因为该页面已被替换掉。

#### this.$router.go

- `this.$router.go(1)`前进一个页面
- `this.$router.go(-1)`后退一个页面



### 命名路由

`name`属性，可用于`$router.push`时跳转到指定的命名路由等。

### 命名视图

- `components`属性指定多个组件：

```javascript
{
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
},
```

- 为`router-view`添加`name`属性，在对应路由时显示匹配的组件：
  - 按照以下配置，在路由为`/`时，才会显示以下三个`router-view`匹配的组件。

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```



### 重定向

`redirect`属性

#### 字符串

```javascript
{ path: '/home', redirect: '/' }
```

#### 命名路由

```javascript
{ path: '/home', redirect: { name: 'homepage' } }
```

#### 函数

```javascript
{
	path: '/',
	redirect: to => {
		return { path: '/news', query: {q: to.params.id}}
	}
}
```

- 重定向后会**替换**URL。



### 别名

`alias`属性

```javascript
{ path: '/', component: Homepage, alias: '/home' }
```

- 在访问`/home`时，URL**不会被替换成** `/`，但仍然会像访问`/`一样。



### 路由守卫

#### 全局前置守卫

`router.beforeEach`

- 接收3个参数：to/from/next

  - to：要跳转到的目标路由。
  - from：当前正要跳转走的路由。
  - next：可以传入参数并跳转。

  ```javascript
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  })
  ```



#### 单独的前置守卫

`beforeEnter`

```javascript
{
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
}
```

