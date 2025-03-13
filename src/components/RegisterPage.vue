<template>
    <div class="d-flex justify-content-center align-items-center vh-100"
        style="background-color: #f4fdf4; font-family: monospace;">
        <div class="card shadow-sm" style="width: 24rem; border-radius: 50px;">
            <div class="card-body">
                <h3 class="card-title text-center mb-4" style="font-family: sans-serif; font-weight: 545;">Register</h3>
                
                <form @submit.prevent="registerData">
                    <div class="mb-3">
                        <label for="name" class="form-label">Username</label>
                        <input type="text" id="name" class="form-control" placeholder="Masukkan Username"
                            v-model="userData.username" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Alamat Email</label>
                        <input type="email" id="email" class="form-control" placeholder="emailmu@example.com"
                            v-model="userData.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Masukkan Password"
                            v-model="userData.password" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                        <input type="password" id="confirmPassword" class="form-control" placeholder="Konfirmasi Password"
                            v-model="userData.confirmpw" required>
                    </div>

                    <button type="submit" class="btn btn-success w-100 animate" :disabled="loading" @click="registerData">
                        <span v-if="loading">
                            <i class="fas fa-spinner fa-spin"></i> Registering...
                        </span>
                        <span v-else>Register</span>
                    </button>
                </form>

                <div class="text-center mt-3">
                    <p id="login1">Sudah punya akun? </p>
                    <router-link to="/login" class="text-success text-decoration-none" id="login">Login disini</router-link>
                </div>
            </div>

            <div v-if="loading" class="text-center mt-3">
                <p>Harap tunggu...</p>
            </div>

            <h3 class="text-center text-success" v-if="success && !loading">{{ response.message }}</h3>
            <h3 class="text-center text-danger" v-if="error && !loading">{{ response.message }}</h3>
        </div>
    </div>
</template>

<script>
import { toast } from "vue3-toastify";
import axios from 'axios';
import textFile from '!!raw-loader!./file.txt';

export default {
    name: 'RegisterPage',
    data() {
        return {
            userData: {
                username: "",
                email: "",
                password: "",
                confirmpw: ""
            },
            success: false,
            error: false,
            loading: false,
            response: {}
        };
    },
    methods: {
        async registerData() {
            this.success = false;
            this.error = false;
            this.loading = true;

            console.log("Register function dipanggil!"); // Cek apakah fungsi ini dieksekusi

            const { username, email, password, confirmpw } = this.userData;

            if (!username || !password || !email || !confirmpw) {
                toast.error("Isi semua kolom!", { autoClose: 3000 });
                this.loading = false;
                return;
            }

            if (password !== confirmpw) {
                toast.error("Password tidak sama!", { autoClose: 3000 });
                this.loading = false;
                return;
            }

            try {
                const response = await axios.post(`${textFile}/api/users/`, {
                    username,
                    email,
                    password,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                },
                );

                this.success = true;
                this.response = response.data;
                toast.success(response.data.message, { autoClose: 3000 });

                // Reset form
                this.userData = { username: "", email: "", password: "", confirmpw: "" };
            } catch (error) {
                this.error = true;
                this.response = error.response?.data || { message: "Terjadi kesalahan!" };
                toast.error(this.response.message, { autoClose: 3000 });
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
#login1 {
    color: black;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 2px;
    margin-right: 5px;
}

#login {
    font-size: 14px;
    transition: color 0.3s ease-in-out;
    margin-bottom: 10px;
}

#login:hover {
    color: #357ab8;
}

.animate {
    transition: all 0.3s ease;
}

.animate:hover {
    transform: scale(1.05);
}

.animate:active {
    transform: scale(0.95);
}
</style>
