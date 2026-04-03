const pengeluaran = async function get() {
    await panggilApiGet('/pengeluaran/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    pengeluaran();
});