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
          </ul>
        </nav>

        <form class="flex justify-center items-center 2-24">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only "
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none justify-center "
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-6 w-96"
              placeholder="   Search..."
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
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

            <LoggedIn v-if="isLoggedIn" />
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
import LoggedIn from "../components/LoggedIn.vue";
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
