import { panggilApi } from "../utilsAuth/utils.js";
import { token } from "../utilsAuth/getToken.js";

const form = document.getElementById('formPendapatan');
// Ambil elemen untuk show modal
    const modal = document.getElementById('modalPendapatan');
    const btnBuka = document.getElementById('btn-tambah-pendapatan');
    const btnTutup = document.getElementById('btn-tutup-modal');


const authPendapatan = async function auth() {
    await panggilApi('/pendapatan/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

// show active dan show inactive produk
const show = function show() {

    // Event untuk membuka modal
    btnBuka.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // Event untuk menutup modal (klik panah kiri)
    btnTutup.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Opsional: Tutup modal saat user klik di luar kotak putih
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

const setupFormPendapatan = async function setupFormPendapatan() {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        //ambil data
        const tipe = document.getElementById('tipe').value;
        const tanggal = document.getElementById('tanggal').value;
        const deskripsi = document.getElementById('deskripsi').value;
        const jumlah = document.getElementById('jumlah').value;
        const simpanke = document.getElementById('simpan').value;

        console.log(tipe, tanggal, deskripsi, jumlah, simpanke);

        await panggilApi('/pendapatan/tambah', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tipe,tanggal, deskripsi, jumlah, simpanke })
        });
        modal.classList.remove('show');
        location.reload();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    authPendapatan();
    show();
    setupFormPendapatan();
});