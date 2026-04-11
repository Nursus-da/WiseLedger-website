
import { token } from "../utilsAuth/getToken";
import { panggilApi } from "../utilsAuth/utils";

const authBeranda = async function auth() {
    await panggilApi('/beranda/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    authBeranda();
});