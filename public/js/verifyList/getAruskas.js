const verifyAruskas = async function get() {
    await panggilApiGetAruskas('/arus-kas/list', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    verifyAruskas();
});