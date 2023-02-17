<template>
    <h1>Create Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Login</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    </template>
    
    <script setup>
    import {ref} from "vue";
    import {getAuth , signInWithEmailAndPassword} from "firebase/auth";
    import {useRouter} from "vue-router"
    const email = ref("");
    const password = ref("");
    const errMsg = ref();
    const router = useRouter();
    const register  = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully registered!");
            router.push('/feed')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value="Email is invalid!";
                    break;
                case "auth/user-not-found":
                    errMsg.value="Email does not exist!";
                    break;
                case "auth/wrong-password":
                    errMsg.value="Incorrect password!";
                    break;
            
                default:
                    errMsg.value = "Email or password is incorrect!"
                    break;
            }
        })
    };
    
    const signInWithGoogle = () => {
        
    };
    </script>