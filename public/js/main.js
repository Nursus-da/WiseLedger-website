const storage_key = 'token';

function dropdown() {
    const userBtn = document.getElementById('userProfileBtn');
    const dropdown = document.getElementById('userDropdown');

        // Fungsi untuk menampilkan/menyembunyikan dropdown saat icon diklik
        userBtn.addEventListener('click', function(event) {
            dropdown.classList.toggle('show');
            event.stopPropagation(); // Mencegah klik menembus ke luar elemen
        });

    // Fungsi untuk menutup dropdown jika user mengklik area kosong di luar menu
    document.addEventListener('click', function(event) {
        if (!userBtn.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function Logout () {
    localStorage.removeItem(storage_key);
    window.location.href = '/login';
}

document.addEventListener('DOMContentLoaded', dropdown);