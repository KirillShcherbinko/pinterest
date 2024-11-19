<script>
    import {login} from "../api/auth.js"
    import axios from "axios"

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                err: ''
            }
        },
        methods: {
            async handleLogin() {
                try {
                    const res = await login(this.username, this.password)
                    console.log(res)
                    const token = res.token
                    console.log(token)
                    if (token) {
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
                    this.$router.push("/");

                } catch (e) {
                    console.log(e)
                    this.err = "Invalid username or password"
                }
            }
        }
    }
</script>

<template>
    <h1>Login Form</h1>
    <form @submit.prevent="handleLogin" class="form-container" action="/auth/login" method="post">
        <input class="form-container__input" v-model="username" placeholder="Name" name="username" type="text" />
        <input class="form-container__input" v-model="password" placeholder="Password" name="password" type="password" />
        <input class="form-container__submit-button" type="submit" value="Login" />
    </form>
    <h3>Don't have an account?</h3>
    <p class="form-container__link">
        <router-link to="/auth/registration">Create a new account</router-link>
    </p>
    <p class="form-container__link">
        <router-link to="/">Go to home page</router-link>
    </p>
    <div v-if="err" class="error">{{ err }}</div>
</template>


<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2f2f2f;
    }

    h1 {
        text-align: center;
        margin-bottom: 30px;
    }

    .form-container {
        width: 300px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #CCCCCC;
        border-radius: 5px;
    }

    .form-container__input {
        margin-bottom: 15px;
        width: 100%;
        font-size: 10px;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
    }

    .form-container__submit-button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #472dbb;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .form-container__submit-button:hover {
        background-color: #4565a0;
    }

    .form-container__link {
        font-size: 8px;
        margin-bottom: 15px;
    }
</style>