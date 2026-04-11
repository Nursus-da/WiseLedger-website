import { udProduk } from "./utils";
import { token } from "../../utilsAuth/getToken";
const formUpdate = document.getElementById('formEditPengeluaran');

const update = formUpdate.addEventListener('submit', async (e) => {

    e.preventDefault();

    const inputTipe = document.getElementById('form-input-tipe').value;
    const inputTanggal = document.getElementById('form-input-tanggal').value;
    const inputDeskripsi = document.getElementById('form-input-deskripsi').value;
    const inputJumlah = document.getElementById('form-input-jumlah').value;
    const inputSimpanke = document.getElementById('form-input-simpanke').value;
    const id = document.getElementById('id').value;

    await udProduk(`/pendapatan/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inputTipe, inputTanggal, inputDeskripsi, inputJumlah, inputSimpanke })
    });
    window.location.href = '/pengeluaran';
});
