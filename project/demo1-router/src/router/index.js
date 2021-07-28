import {createRouter, createWebHashHistory} from 'vue-router'
// 1. Define route components.
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import News from '../components/News.vue'
import User from '../components/User.vue'
import Vertical from '../components/Vertical.vue'
import Horizontal from '../components/Horizontal.vue'
import NotFound from '../components/NotFound.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/news/:id', component: News },
  { path: '/:path(.*)', component: NotFound },
  // 嵌套路由
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
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router