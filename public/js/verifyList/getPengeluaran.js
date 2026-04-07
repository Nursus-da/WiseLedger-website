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