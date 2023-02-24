import { createRouter, createWebHistory } from "vue-router";


const router = createRouter ({
   history: createWebHistory (),
   routes:[
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/register", component: () => import("../views/Register.vue") },
    { path: "/login", component: () => import("../views/Login.vue") },
    { path: "/feed", component: () => import("../views/Feed.vue") },   
    { path: "/cart", component: () => import("../views/Cart.vue") },   
    { path: "/contact", component: () => import("../views/Contact.vue") },   
    { path: "/checkout", component: () => import("../views/Checkout.vue") },   
    { path: "/about", component: () => import("../views/About.vue") },   
    { path: "/products", component: () => import("../views/Products.vue") },   
  ],
 });
 
export default router;
