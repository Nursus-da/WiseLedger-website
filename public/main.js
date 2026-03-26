// Ambil elemen form dari HTML
const loginForm = document.getElementById('login-form');
const storage_key = 'token';

document.addEventListener('DOMContentLoaded', () => {
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        // Mengambil data dari inputan user
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
            // Simpan token yang dikirim server ke LocalStorage 
            localStorage.setItem('storage_key', data.token);
            const token = localStorage.getItem('storage_key');

                alert('Login Berhasil');
                window.location.href = '/beranda';

            } else {
                alert('Login Gagal: ' + data.message);
            }
        } catch (error) {
            console.error('Terjadi kesalahan network:', error);
        }
    });

});