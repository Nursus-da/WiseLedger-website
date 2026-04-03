const pendapatan = async function get() {
    await panggilApiGet('/pendapatan/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    pendapatan();
});