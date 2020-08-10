import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import deliveryboys from "../views/deliveryboys.vue";
import categories from "../views/categories.vue";
import login from "../views/login.vue";


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: "deliveryboys",
        name: "deliveryboys",
        component: deliveryboys
      },
      {
        path: "categories",
        name: "categories",
        component: categories
      },
      {
        path: "products",
        name: "products",
        component: Products
      },
      {
        path: "orders",
        name: "orders",
        component: Orders
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
