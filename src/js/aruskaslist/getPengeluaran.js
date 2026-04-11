import { panggilApiGetPengeluaran } from "../utilsArusKasList/utilsGetPengeluaran";
import { token } from "../utilsAuth/getToken";

const verifyPengeluaran = async function get() {
    await panggilApiGetPengeluaran('/pengeluaran/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    verifyPengeluaran();
});