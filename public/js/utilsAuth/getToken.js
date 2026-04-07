// Ambil token dari laci (Local Storage)
    const token = localStorage.getItem('storage_key');

    //Cek apakah token ada. Jika tidak, langsung usir ke login
    if (!token || token === 'undefined' || token !== localStorage.getItem('storage_key') ) {
        alert("Sesi habis, silakan login kembali.");
        window.location.href = '/login';
    }