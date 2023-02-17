import { createRouter, createWebHistory } from "vue-router";


const router = createRouter ({
   history: createWebHistory (),
   routes:[
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/feed", component: () => import("../views/Feed.vue") },   
  ],
 });
 
export default router;
