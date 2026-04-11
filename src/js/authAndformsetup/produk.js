import { token } from "../utilsAuth/getToken";
import { panggilApi } from "../utilsAuth/utils";

const formProduk = document.getElementById('formTambahProduk');
 // Ambil elemen-elemen
    const btnTambahProduk = document.querySelector('.btn-add');
    const modalOverlay = document.getElementById('modalProduk');
    const btnTutupModal = document.getElementById('btnTutupModal');

const authProduk = async function auth() {
    await panggilApi('/produk/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

// show active dan show inactive produk
const show = async function show() {

        // Event listener untuk membuka modal ketika tombol '+ Produk' diklik
        if(btnTambahProduk) {
            btnTambahProduk.addEventListener('click', function(e) {
                e.preventDefault(); // Mencegah reload jika tombol berada di dalam form (opsional)
                modalOverlay.classList.add('active');
            });
        }

        // Event listener untuk menutup modal ketika ikon panah kiri diklik
        if(btnTutupModal) {
            btnTutupModal.addEventListener('click', function() {
                modalOverlay.classList.remove('active');
            });
        }

        // Opsional: Tutup modal ketika area gelap di luar kotak putih diklik
        window.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    };

const setUpFormProduk = async function setUpFormProduk() {
    formProduk.addEventListener('submit', async (e) => {
        e.preventDefault();

        const inputKategori = document.getElementById('form-input-kategori').value;
        const inputStok = document.getElementById('form-input-stok').value;
        const inputProduk = document.getElementById('form-input-produk').value;
        const inputHarga = document.getElementById('form-input-harga').value;
        const inputBiaya = document.getElementById('form-input-biaya').value;

        console.log(inputKategori, inputStok, inputProduk, inputHarga, inputBiaya);

        await panggilApi('/produk/tambah', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({inputKategori, inputStok, inputProduk, inputHarga, inputBiaya})
        });
        modalOverlay.classList.remove('active');
        location.reload();

    });
}

document.addEventListener('DOMContentLoaded', function() {
    authProduk();
    show();
    setUpFormProduk();
});