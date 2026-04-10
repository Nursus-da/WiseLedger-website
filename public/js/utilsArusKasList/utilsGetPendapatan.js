const panggilApiGetPendapatan = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        });
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();

            console.log("ini pendapatan" ,data);

            let outputPendBulIni = '<h4>Pendapatan bulan ini</h4>';
            outputPendBulIni += `<h2>${Number(data.PendapatanBulanIni).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPendBulIni += `<p><span class="text-green">+0</span> Rb lebih tinggi dibanding bulan lalu</p>`;
            document.getElementById("pendapatan-bulan-ini").innerHTML = outputPendBulIni;

            let outputPendTertinggi = '<h4>Pendapatan tertinggi</h4>';
            outputPendTertinggi += `<h2>${Number(data.PendapatanTertinggi).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPendTertinggi += `<p><span>Pendapatan</span></p>`;
            document.getElementById("pendapatan-tertinggi").innerHTML = outputPendTertinggi;

            let output = "<tr>";
            data.pendapatan.forEach(item => {
                output += `<td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>`;
                // output += `<td>${item.deskripsi}</td>`;
                output += `<td>${item.tipe}</td>`;
                output += `<td>${Number(item.jumlah).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>`;
                output += 
                `<td>
                    <a href="/pendapatan/detail/${item.id}"><i class="fa-solid fa-circle-info"></i> Detail</a>
                    <a href="/pendapatan/edit/${item.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                    <form class="formHapusPendapatan" data-id="${item.id}">
                        <button type="submit"><i class="fa-solid fa-trash"></i> Hapus</button>
                    </form>
                </td>`;
                output += "</tr>";
            });
            document.getElementById("get").innerHTML = output;
            pasangListenerHapus();
            return data;
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.clear(); //Hapus token sampah jika error
        window.location.href = '/login';
    }

}
