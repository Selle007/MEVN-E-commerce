<template>
  <div>
    <button
      class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      @click="toggleVisibility"
    >
      <img class="w-8 h-8 rounded-full" src="" :alt="test" />
    </button>
    <div
      class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-44"
      v-if="isVisible"
      @click.away="isVisible = false"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        
      >
        <li>
          <a
            href="/dashboard"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Dashboard</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Orders</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Cart</a
          >
        </li>
        <li
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="handleSignOut"
        >
          Logout
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "../router";

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

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
a{
  text-decoration: none;
}
</style>
