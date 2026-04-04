const panggilApiGet = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        });
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();

            console.log("ini pendapatan" ,data);

            let outputPengBulIni = "<h4>Pengeluaran Bulan Ini</h4>";
            outputPengBulIni += `<h2>${data.PengeluaranBulanIni.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPengBulIni += `<p><span class="text-green">+0</span> Rb lebih tinggi dibanding bulan lalu</p>`;
            document.getElementById("pengeluaran-bulan-ini").innerHTML = outputPengBulIni;

            let outputPendTertinggi = "<h4>Pengeluaran Tertinggi</h4>";
            outputPendTertinggi += `<h2>${data.PengeluaranTertinggi.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPendTertinggi += `<p><span>Pengeluaran</span></p>`;
            document.getElementById("pengeluaran-tertinggi").innerHTML = outputPengBulIni;;

            let output = "<tr>";
            data.pengeluaran.forEach(item => {
                output += `<td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>`;
                // output += `<td>${item.deskripsi}</td>`;
                output += `<td>${item.tipe}</td>`;
                output += `<td>${Number(item.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))}</td>`;
                output += 
                `<td>
                    <a href="/detailPendapatan/${item.id}"><i class="fa-solid fa-circle-info"></i> Detail</a>
                    <a href="/editPendapatan/${item.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                    <form>
                        <button type="submit"><i class="fa-solid fa-trash"></i> Hapus</button>
                    </form>
                </td>`;
                output += "</tr>";
            });
            document.getElementById("get").innerHTML = output;
            return data;
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem('token'); //Hapus token sampah jika error
        window.location.href = '/login';
    }

}
