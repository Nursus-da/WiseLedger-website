const authProduk = async function auth() {
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