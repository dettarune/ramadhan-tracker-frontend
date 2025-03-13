<template>
    <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5"
        style="font-family: monospace;">
        <div class="card shadow-sm" style="max-width: 400px;">
            <div class="card-body p-4">
                <div class="text-center mb-4">
                    <h2 class="fw-bold">Login</h2>
                    <p class="text-muted">
                        Atau
                        <router-link to="/register" class="text-success text-decoration-none">
                            Buat Akun Baru
                        </router-link>
                    </p>
                </div>

                <form @submit.prevent="loginMethods">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" required placeholder="Masukkan nama mu"
                            v-model="loginData.username" />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required placeholder="Masukkan Password"
                            v-model="loginData.password" />
                    </div>

                    <div class="mb-3 d-flex justify-content-between align-items-center">
                        <div class="form-check me-1">
                            <input class="form-check-input border-success cekboks" type="checkbox" id="remember-me"
                                value="true" v-model="loginData.rememberMe" />
                            <label class="form-check-label" for="remember-me">
                                Remember me
                            </label>
                        </div>
                        <router-link to="/forgot-password" class="text-success text-decoration-none">
                            Lupa password?
                        </router-link>
                    </div>

                    <button type="submit" class="btn btn-success w-100 animate" style="border-radius: 40px;"
                        :disabled="isLoading" @click="loginMethods">
                        {{ isLoading ? "Memproses..." : "Login" }}
                    </button>
                </form>

                <h3 class="text-center text-success" v-if="success">Login Berhasil</h3>
                <h3 class="text-center text-danger" v-if="error">Login Gagal</h3>
            </div>
        </div>
    </div>
</template>



<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from 'axios';
import textFile from '!!raw-loader!./file.txt';
import router from "@/router";

export default {
    name: 'LoginPage',
    data() {
        return {
            loginData: {
                username: "",
                password: "",
                rememberMe: false
            },
            success: false,
            error: false,
            response: {}
        }
    },
    methods: {
        async loginMethods() {
            this.success = false;
            this.error = false;
            const { username, password } = this.loginData;

            if (!username || !password) {
                toast.error("Isi semua kolom di bawah!", {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_LEFT,
                });
                return;
            }

            try {
                const response = await axios.post(`${textFile}/api/users/login`, { username, password }, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                toast.success(response.data.message, { autoClose: 3000 });
                router.push('/verify');                
            } catch (error) {
                this.error = true;
                toast.error(error.response?.data?.message || "Terjadi kesalahan!", {
                    autoClose: 3000
                });
            }
        },

        // async verifyOTP() {
        //     const { email, token } = this.verificationData;

        //     if (!token) {
        //         toast.error("Masukkan kode OTP!", { autoClose: 3000 });
        //         return;
        //     }

        //     try {
        //         const response = await axios.post(`/api/users/verify`, { email, token }, {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         });

        //         const jwtToken = response.data.jwtToken;
        //         localStorage.setItem("authToken", jwtToken);

        //         toast.success("Login berhasil!", { autoClose: 3000 });
        //         this.success = true;
        //         this.isWaitingForVerification = false;

        //         // Redirect atau update UI setelah login
        //         this.$router.push("/dashboard");

        //     } catch (error) {
        //         this.error = true;
        //         toast.error(error.response?.data?.message || "OTP salah!", { autoClose: 3000 });
        //     }
        // }
    },
}
</script>


<style scoped>
.animate {
    transition: all 0.3s ease;
}

.animate:hover {
    transform: scale(1.05);
}

.animate:active {
    transform: scale(0.95);
}

.cekboks {
    cursor: pointer;
}

.card {
    border-radius: 50px;
}
</style>