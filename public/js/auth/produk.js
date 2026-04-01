async function authProduk() {
    await panggilApi('/produk/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    authProduk();
});