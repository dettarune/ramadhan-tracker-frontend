<template>
  <div class="container">
    <h2>Tambah Ceramah</h2>
    <form >
      <div class="form-group">
        <label>Judul:</label>
        <input type="text" v-model="ceramahData.judul" required />
      </div>
      <div class="form-group">
        <label>Pembicara:</label>
        <input type="text" v-model="ceramahData.pembicara" required />
      </div>
      <div class="form-group">
        <label>Uraian:</label>
        <textarea v-model="ceramahData.uraian" required></textarea>
      </div>
      <button type="button" @click.prevent="tambahCeramah">Tambah Ceramah</button>
    </form>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import axios from "axios";

export default {
  name: "AddCeramahPage",
  data() {
    return {
      ceramahData: {
        judul: "",
        pembicara: "",
        uraian: "",
      },
      loading: false,
      success: false,
      error: false,
    };
  },
  methods: {
    async tambahCeramah() {
  console.log("🔹 tambahCeramah() dipanggil"); // Debug 1: Cek apakah function berjalan

  this.success = false;
  this.error = false;
  this.loading = true;

  console.log("🔹 Data sebelum dikirim:", this.ceramahData); // Debug 2: Cek data sebelum request

  try {
    const response = await axios.post("http://localhost:3000/api/ramadhan/ceramah", this.ceramahData);
    
    console.log("✅ Response dari backend:", response.data); // Debug 3: Cek response backend

    toast.success("Ceramah berhasil ditambahkan!", {
      autoClose: 3000,
      position: toast.POSITION.TOP_LEFT,
    });

    this.ceramahData = { judul: "", pembicara: "", uraian: "" }; // Reset form
  } catch (error) {
    this.error = true;
    console.error("❌ Error saat mengirim data:", error); // Debug 4: Cek error di console

    toast.error(`Gagal menambahkan ceramah! ${error.response?.data?.message || error.message}`, {
      autoClose: 3000,
      position: toast.POSITION.TOP_LEFT,
    });
  } finally {
    this.loading = false;
  }
}
  }
  }
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
