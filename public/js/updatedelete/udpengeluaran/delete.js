// Fungsi pasang listener (terpisah)
function pasangListenerHapus() {
    const formHapus = document.querySelectorAll('.formHapusPengeluaran');
    console.log('Form ditemukan:', formHapus.length);

    formHapus.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = form.dataset.id;

            await udProduk(`/pengeluaran/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            location.reload();
        });
    });
}