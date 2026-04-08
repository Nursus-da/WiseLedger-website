const panggilApiGetProduk = async (endpoint, options = {} ) => {

    try {
        
         const response = await fetch(endpoint, {
            ...options
         });

         if (response.ok) {

         const data = await response.json();

      
        let outputTables = '';

        data.listProduk.forEach(item => {
            
            outputTables += '<tr>';
            
            outputTables += `<td>
                <div class="prod-cell">
                    <div class="prod-img"></div>
                    <div class="prod-info">
                        <span class="prod-cat">${item.kategori}</span>
                        <span class="prod-name">${item.produk}</span>
                    </div>
                </div>
            </td>`;
            
            outputTables += `<td>${Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>`;
            outputTables += `<td>${item.stok}</td>`;
        
            // Kolom tombol aksi (perbaiki spasi pada <a)
            outputTables += `<td>
                <a href="/produk/${item.id}"><i class="fa-solid fa-circle-info"></i>Detail</a>
                <a href="/produk/${item.id}/edit"><i class="fa-solid fa-pen-to-square"></i>Edit</a>
                <form action="/produk/${item.id}" method="POST">
                    <button type="submit"><i class="fa-solid fa-trash"></i>Hapus</button>
                </form>
            </td>`;
            
            // Tutup baris
            outputTables += '</tr>';
        });

        // Masukkan hasil ke dalam elemen dengan id "list-produk"
        document.getElementById("list-produk").innerHTML = outputTables;

        return data;

         }

    } catch (error) {
        console.error("Error:", error)
        localStorage.clear();
        window.location.href = '/login';
    }

}