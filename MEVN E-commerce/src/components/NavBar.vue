<template>
    <div class="navbar">
        <nav>
        <img src="https://th.bing.com/th/id/R.0b333471aa2e67d8acf503abb80a2420?rik=y5ilHVYvvz3lcg&pid=ImgRaw&r=0"/>
        <div class="logo">
        </div>
        
        <div class="links">
        <router-link to="/"> Home </router-link>
            <router-link to="/feed"> Feed </router-link>
            </div>
            <div class="search">
            
            </div>



            </div>
           
        </nav>

        <router-view />
    </div>
</template>


<style scoped>
.navbar {
    overflow: hidden;
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
}

a {
    color: #000;
}
</style>
