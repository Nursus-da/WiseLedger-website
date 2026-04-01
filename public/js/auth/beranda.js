async function authBeranda() {
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