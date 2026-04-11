// ── Konstanta ─────────────────────────────────────────────────────────────────
const loginForm = document.getElementById('login-form');
const TOKEN_KEY = 'token';

// ── Toggle show/hide password ─────────────────────────────────────────────────
function initPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-pw');
    const pwInput   = document.getElementById('password');
    const eyeIcon   = document.getElementById('eye-icon');
    if (!toggleBtn || !pwInput) return;

    toggleBtn.addEventListener('click', () => {
        const isHidden = pwInput.type === 'password';
        pwInput.type   = isHidden ? 'text' : 'password';
        eyeIcon.innerHTML = isHidden
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
               <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
               <line x1="1" y1="1" x2="23" y2="23"/>`
            : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    });
}

// Tampilkan pesan notifikasi
function showMessage(message, type = 'error') {
    let msgEl = document.getElementById('auth-message');
    if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.id = 'auth-message';
        loginForm.parentNode.insertBefore(msgEl, loginForm);
    }
    msgEl.className = 'auth-message auth-message--' + type;
    msgEl.textContent = message;
    msgEl.style.display = 'block';

    // Auto hilang setelah 5 detik jika sukses
    if (type === 'success') {
        setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const submitBtn = loginForm.querySelector('.btn-submit');

        // Validasi sederhana di sisi klien
        if (!email || !password) {
            showMessage('Email dan password harus diisi.', 'error');
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Masuk...';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Simpan token ke localStorage dengan key yang benar
                localStorage.setItem(TOKEN_KEY, data.token);
                showMessage('Login berhasil! Mengalihkan...', 'success');
                setTimeout(() => { window.location.href = '/beranda'; }, 800);
            } else {
                showMessage(data.message || 'Login gagal. Periksa kembali email dan password Anda.', 'error');
            }
        } catch (error) {
            console.error('Terjadi kesalahan network:', error);
            showMessage('Terjadi kesalahan jaringan. Coba lagi.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign in';
        }
    });

});