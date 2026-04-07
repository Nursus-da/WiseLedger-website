const getListProduk = async function get() {
    await panggilApiGetProduk('/produk/list', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Autorization' : `Bearer ${token}`
        }
    }); 
}

document.addEventListener('DOMContentLoaded', function(){
    getListProduk();
});