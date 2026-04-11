import { token } from "../../utilsAuth/getToken";
import { udProduk } from "./utils";
export function pasangListenerHapus() {
    const formHapus = document.querySelectorAll('.formHapusProduk');
    console.log('Form ditemukan:', formHapus.length);

    formHapus.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = form.dataset.id;

            await udProduk(`/produk/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            location.reload();
        });
    });
}