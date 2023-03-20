<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" required>
        </div>
        <div class="form-group mt-2">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
        </div>
        <div class="form-group mt-3">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>
  
<script>
import api from '@/services/api';

export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        handleSubmit() {
            api.post('/me', {
                email: this.email,
                password: this.password,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>