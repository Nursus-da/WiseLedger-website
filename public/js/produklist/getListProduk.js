const getListProduk = async function get() {
    await panggilApiGetProduk('/produk/list', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    }); 
}

document.addEventListener('DOMContentLoaded', function(){
    getListProduk();
});