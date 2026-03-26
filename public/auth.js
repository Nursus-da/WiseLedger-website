

async function loadProfile() {
    // Ambil token dari laci (Local Storage)
    const token = localStorage.getItem('storage_key');

    console.log("ini token",token);

    //Cek apakah token ada. Jika tidak, langsung usir ke login
    if (!token || token === 'undefined') {
        alert("Sesi habis, silakan login kembali.");
        window.location.href = '/login';
        return;
    }

    try {
        //Lakukan Request ke backend
        const response = await fetch('/beranda/auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // kirim token ke backend
                'Content-Type': 'application/json'
            }
        });

        //Cek apakah server menolak token (401/403)
        if (!response.ok) {
            throw new Error("Token tidak valid");
        }

        const data = await response.json();

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem('token'); // Hapus token sampah jika error
        window.location.href = '/login';
    }
}

document.addEventListener('DOMContentLoaded', loadProfile);