const authArusKas = async function auth() {
    await panggilApi('/arus-kas/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    authArusKas();

});