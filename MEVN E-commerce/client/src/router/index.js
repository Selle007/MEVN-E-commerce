import { createRouter, createWebHistory } from "vue-router";


const router = createRouter ({
   history: createWebHistory (),
   routes:[
    { path: "/", component: () => import("../views/Home.vue"), meta:{showNavbar:true} },
    { path: "/register", component: () => import("../views/Register.vue"), meta:{showNavbar:true} },
    { path: "/login", component: () => import("../views/Login.vue"), meta:{showNavbar:true} },
    { path: "/feed", component: () => import("../views/Feed.vue"), meta:{showNavbar:true} },   
    { path: "/cart", component: () => import("../views/Cart.vue"), meta:{showNavbar:true} },   
    { path: "/contact", component: () => import("../views/Contact.vue"), meta:{showNavbar:true} },   
    { path: "/checkout", component: () => import("../views/Checkout.vue"), meta:{showNavbar:true} },   
    { path: "/about", component: () => import("../views/About.vue"), meta:{showNavbar:true} },   
    
    //DASHBOARD
    { path: "/dashboard", component: () => import("../views/Dashboard.vue"), meta:{showSidebar:true} },   
    
    //CATEGORY CRUD   
    { path: "/dashboard/category/list-categories", component: () => import("../views/dashboard/categories/list.vue"), meta:{showSidebar:true} },   
    { path: "/dashboard/category/create-category", component: () => import("../views/dashboard/categories/create.vue"), meta:{showSidebar:true}  },   
    { path: "/dashboard/category/edit-category/:id", component: () => import("../views/dashboard/categories/edit.vue"), meta:{showSidebar:true}  },   
  ],
 });
 
export default router;
