<template>
  <div class="navbar"></div>
  <header aria-label="Site Header" class="bg-white">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a class="block text-emerald-600" href="/">
        <img class="h-8" viewBox="0 0 28 24" fill="none" src="/vuejs.png" />
      </a>

      <div class="flex flex-1 items-center justify-between">
        <nav aria-label="Site Nav" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm mt-3">
            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="/">
                Home
              </a>
            </li>

            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="/feed">
                Products
              </a>
            </li>

            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="/about">
                About
              </a>
            </li>

            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a class="text-gray-500 transition hover:text-gray-500/75" href="/cart">
                Cart
              </a>
            </li>
          </ul>
        </nav>

        <form class="mb-0 hidden lg:flex">
          <div class="relative">
            <input
              class="h-100 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
              placeholder="Search..."
              type="text"
            />

            <button
              type="submit"
              class="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600"
            >
              <span class="sr-only">Submit Search</span>
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <router-link
              class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-emerald-600 transition hover:text-emerald-600/75 sm:block"
              to="/register"
              v-if="!isLoggedIn"
            >
              Register
            </router-link>
            <router-link
              class="block rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              to="/login"
              v-if="!isLoggedIn"
            >
              Login
            </router-link>

            <LoggedIn v-if="isLoggedIn"/>
    
            
          </div>

          <button
            class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import LoggedIn from "../components/LoggedIn.vue"
import router from "../router";

const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};


</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

a {
  color: #000;
  text-decoration: none;
}
</style>
