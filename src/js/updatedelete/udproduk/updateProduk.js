import { udProduk } from "./utils";
import { token } from "../../utilsAuth/getToken";

const formUpdate = document.getElementById('formEditProduk');

const update = formUpdate.addEventListener('submit', async (e) => {

    e.preventDefault();

    const inputKategori = document.getElementById('form-input-kategori').value;
    const inputStok = document.getElementById('form-input-stok').value;
    const inputProduk = document.getElementById('form-input-produk').value;
    const inputHarga = document.getElementById('form-input-harga').value;
    const inputBiaya = document.getElementById('form-input-biaya').value;
    const id = document.getElementById('id').value;

    await udProduk(`/produk/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inputKategori, inputStok, inputProduk, inputHarga, inputBiaya })
    });
    window.location.href = '/produk';
});
