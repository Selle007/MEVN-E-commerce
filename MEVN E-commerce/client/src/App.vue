<template>
  <body class="bg-gray-50">
    <component :is="navComponent" />

    <main>
      
    </main>
  </body>

  <footer>
    <Footer />
  </footer>
  
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    SideBar,
  },
  computed: {
    // Get the current route and determine the appropriate navigation component to show
    navComponent() {
      const routeMeta = this.$route.meta;
      if (routeMeta.showSidebar) {
        return 'SideBar';
      } else if (routeMeta.showNavbar) {
        return 'NavBar';
      } else {
        // Default to Navbar component if neither flag is set
        return 'NavBar';
      }
    },
  },
};
</script>

<style scoped>
body {
  width: 100%;
}
</style>
