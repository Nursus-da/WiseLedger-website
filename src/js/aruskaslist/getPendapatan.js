import { token } from '../utilsAuth/getToken';
import { panggilApiGetPendapatan } from '../utilsArusKasList/utilsGetPendapatan';

const verifyPendapatan = async function get() {
    await panggilApiGetPendapatan('/pendapatan/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    verifyPendapatan();
});