async function getData() {
    await panggilApiForPlugin('/beranda/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    getData();
});
