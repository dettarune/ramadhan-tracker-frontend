<template>
    <div class="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5"
        style="font-family: monospace;">
        <div class="card shadow-sm" style="max-width: 400px;">
            <div class="card-body p-4">
                <div class="text-center mb-4">
                    <h2 class="fw-bold">Verify</h2>
                    <p class="text-muted">
                        Verify Your Credentials!
                        <router-link to="/login" class="text-success text-decoration-none">
                            Login
                        </router-link>
                    </p>
                </div>

                <form @submit.prevent="verifyOTP">
                    <div class="mb-3">
                        <label for="token" class="form-label">Token</label>
                        <input type="text" class="form-control" id="token" required placeholder="Masukkan 6 digit token"
                            v-model="verificationData.token" />
                    </div>

                    <button type="submit" class="btn btn-success w-100 animate" style="border-radius: 40px;"
                        :disabled="isLoading">
                        {{ isLoading ? "Verifying..." : "Verify" }}
                    </button>
                </form>

                <h3 class="text-center text-success" v-if="success">Verifikasi Berhasil</h3>
                <h3 class="text-center text-danger" v-if="error">{{ errorMessage }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from 'axios';

export default {
    name: 'VerifyPage',
    data() {
        return {
            verificationData: { token: "" },
            success: false,
            error: false,
            errorMessage: "",
            isLoading: false,
        };
    },
    methods: {
        async verifyOTP() {
            if (!this.verificationData.token || this.verificationData.token.length !== 6) {
                toast.error("Masukkan kode OTP yang valid!", { autoClose: 3000 });
                return;
            }

            this.isLoading = true;
            this.success = false;
            this.error = false;

            try {
                const baseURL = "http://localhost:3000";
                const response = await axios.post(
                    `${baseURL}/api/users/verify`, 
                    { token: this.verificationData.token }, 
                    { headers: { 'Content-Type': 'application/json' }}
                );

                if (response.data.message === "Login Success!") {
                    toast.success("Verifikasi berhasil!", { autoClose: 3000 });
                    this.success = true;
                    this.$router.push("/dashboard");
                } else {
                    throw new Error("Respon tidak valid dari server");
                }

            } catch (error) {
                this.error = true;
                if (error.response) {
                    if (error.response.status === 401) {
                        this.errorMessage = "Akses tidak sah, silakan login ulang.";
                    } else if (error.response.status === 410) {
                        this.errorMessage = "Token salah atau sudah kadaluarsa!";
                    } else if (error.response.status === 404) {
                        this.errorMessage = "Token sudah expired!";
                    } else {
                        this.errorMessage = error.response.data.message || "Terjadi kesalahan!";
                    }
                } else if (error.request) {
                    this.errorMessage = "Gagal terhubung ke server, coba lagi!";
                } else {
                    this.errorMessage = "Terjadi kesalahan tidak diketahui.";
                }
                toast.error(this.errorMessage, { autoClose: 3000 });
            } finally {
                this.isLoading = false;
            }
        }
    }
};
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

.card {
    border-radius: 50px;
}
</style>
