<script>
    import axios from "axios"

    export default {
        name: "Registration",
        data() {
            return {
                username: "", 
                password: "", 
                err: "",
            };
        },
        methods: {
            async handleRegistration() {
                try {
                    const registrationData = {
                        username: this.username,
                        password: this.password,
                    };

                    await axios.post("http://localhost:5000/auth/registration", registrationData)

                    this.$router.push("/auth/login")
                } catch (e) {
                    this.err = e.response?.data?.message || "Registration failed"
                }
            },
        },
    }
</script>

<template>
    <h1>Registration Form</h1>
    <form @submit.prevent="handleRegistration" class="form-container" action="/registration" method="post">
        <input class="form-container__input" v-model="username" placeholder="Name" name="username" type="text" />
        <input class="form-container__input" v-model="password" placeholder="Password" name="password" type="password" />
        <input class="form-container__submit-button" type="submit" value="Registration" />
        <h3>Already have an account?</h3>
        <p class="form-container__link">
        <router-link to="/auth/login">
            Go back to login page
        </router-link>
    </p>
    <div v-if="err" class="error">{{ err }}</div>
    </form>
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