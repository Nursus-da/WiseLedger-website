/**
 * register.js
 * Menangani validasi form registrasi dan feedback inline ke pengguna.
 * Form menggunakan native POST ke /register, namun kita cegat dulu
 * untuk validasi sisi klien sebelum dikirim.
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

function showMessage(message, type = 'error') {
    const msgEl = document.getElementById('auth-message');
    if (!msgEl) return;
    msgEl.className = 'auth-message auth-message--' + type;
    msgEl.textContent = message;
    msgEl.style.display = 'block';

    // Scroll ke pesan agar terlihat
    msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
        setTimeout(() => { msgEl.style.display = 'none'; }, 6000);
    }
}

function hideMessage() {
    const msgEl = document.getElementById('auth-message');
    if (msgEl) msgEl.style.display = 'none';
}

function setLoading(isLoading) {
    const btn     = document.getElementById('btn-register');
    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('btn-spinner');
    if (!btn) return;
    btn.disabled         = isLoading;
    btnText.textContent  = isLoading ? 'Membuat akun...' : 'Buat Akun';
    spinner.style.display = isLoading ? 'inline-block' : 'none';
}

// ── Toggle show/hide password ─────────────────────────────────────────────────

function initPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-pw');
    const pwInput   = document.getElementById('password');
    const eyeIcon   = document.getElementById('eye-icon');
    if (!toggleBtn || !pwInput) return;

    toggleBtn.addEventListener('click', () => {
        const isHidden = pwInput.type === 'password';
        pwInput.type   = isHidden ? 'text' : 'password';
        // Ganti ikon (eye / eye-off)
        eyeIcon.innerHTML = isHidden
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
               <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
               <line x1="1" y1="1" x2="23" y2="23"/>`
            : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    });
}

// ── Validasi ──────────────────────────────────────────────────────────────────

function validateForm(username, email, password, confirmPassword) {
    if (!username || username.trim().length < 2) {
        return 'Nama lengkap minimal 2 karakter.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Masukkan alamat email yang valid.';
    }
    if (!password || password.length < 6) {
        return 'Password minimal 6 karakter.';
    }
    if (password !== confirmPassword) {
        return 'Konfirmasi password tidak cocok.';
    }
    return null; // null = valid
}

// ── Main ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideMessage();

        const username        = document.getElementById('username').value.trim();
        const email           = document.getElementById('email').value.trim();
        const password        = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validasi sisi klien
        const error = validateForm(username, email, password, confirmPassword);
        if (error) {
            showMessage(error, 'error');
            return;
        }

        setLoading(true);

        try {
            // Kirim data ke server menggunakan fetch agar kita bisa tangkap respons JSON
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            // Server merespons dengan redirect (201) atau JSON error (400)
            if (response.redirected) {
                // Registrasi berhasil → server arahkan ke /login
                showMessage('Akun berhasil dibuat! Mengalihkan ke halaman login...', 'success');
                setTimeout(() => { window.location.href = response.url; }, 1200);
                return;
            }

            // Coba baca JSON dari respons error
            let data;
            try { data = await response.json(); } catch (_) { data = {}; }

            if (response.ok || response.status === 201) {
                showMessage('Akun berhasil dibuat! Mengalihkan ke halaman login...', 'success');
                setTimeout(() => { window.location.href = '/login'; }, 1200);
            } else {
                showMessage(data.message || 'Pendaftaran gagal. Coba lagi.', 'error');
            }
        } catch (err) {
            console.error('Register error:', err);
            showMessage('Terjadi kesalahan jaringan. Periksa koneksi Anda.', 'error');
        } finally {
            setLoading(false);
        }
    });
});
