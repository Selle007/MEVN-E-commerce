<template>
  <section class="bg-gray-200 p-3 sm:p-5 w-screen">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
        <h2 class="mb-2 text-xl leading-none text-black md:text-2xl ">All Categories</h2>
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0"
          >
            <a href="/dashboard/category/create-category"
              ><button
                type="button"
                class="inline-flex items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-emerald-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-emerald-700"

              >
                Add category
              </button></a
            >
          </div>
        </div>
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500"
            v-if="Categories.length > 0"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3">Category name</th>
                <th scope="col" class="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b" v-for="category in Categories" :key="category._id">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ category.name }}
                </th>

                <td class="px-4 py-3 flex flex-row w-">
                  <span
                    class="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm"
                  >
                    <button
                      class="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-emerald-600 focus:relative"
                      title="Edit Product"
                      @click="editCategory(category._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>

                    <button
                      class="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 focus:relative"
                      title="Delete Product"
                      @click.prevent="deleteCategory(category._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <div
              class="px-3 py-1 text-xs font-medium leading-none text-center text-emerald-800 bg-emerald-200 rounded-full animate-pulse"
            >
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <router-view />
</template>

<script>
import Sidebar from "../../../components/SideBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      Categories: [],
      showModal: false,
    };
  },
  components:{
    Sidebar
  },
  created() {
    let apiURL = "http://localhost:3000/api/categories";
    axios
      .get(apiURL)
      .then((res) => {
        //console.log(res.data); // Debugging statement
        this.Categories = res.data;
        //console.log(this.Categories); // Debugging statement
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteCategory(id) {
      let apiURL = `http://localhost:3000/api/delete-category/${id}`;
      let indexOfArrayItem = this.Categories.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Categories.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    editCategory: function (id) {
      this.$router.push(`/dashboard/category/edit-category/${id}`);
    },
  },
};
</script>
<style scoped>
*{
  text-decoration: none;
}
</style>
