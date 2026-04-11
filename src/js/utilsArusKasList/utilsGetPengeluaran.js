import { pasangListenerHapus } from "../updatedelete/udpengeluaran/delete";

export const panggilApiGetPengeluaran = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        });
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();

            console.log("ini pendapatan" ,data);

            let outputPengBulIni = "<h4>Pengeluaran bulan ini</h4>";
            outputPengBulIni += `<h2>${Number(data.PengeluaranBulanIni).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPengBulIni += `<p><span class="text-green">${Number(data.selisihPengeluaran).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span> Rb lebih tinggi dibanding bulan lalu</p>`;
            document.getElementById("pengeluaran-bulan-ini").innerHTML = outputPengBulIni;

            let outputPengTertinggi = "<h4>Pengeluaran tertinggi</h4>";
            outputPengTertinggi += `<h2>${Number(data.PengeluaranTertinggi).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </h2>`;
            outputPengTertinggi += `<p><span>Pengeluaran</span></p>`;
            document.getElementById("pengeluaran-tertinggi").innerHTML = outputPengTertinggi;

            let output = "<tr>";
            data.pengeluaran.forEach(item => {
                output += `<td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>`;
                // output += `<td>${item.deskripsi}</td>`;
                output += `<td>${item.tipe}</td>`;
                output += `<td>${Number(item.jumlah).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>`;
                output += 
                `<td>
                    <a href="/pengeluaran/detail/${item.id}"><i class="fa-solid fa-circle-info"></i> Detail</a>
                    <a href="/pengeluaran/edit/${item.id}"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                    <form class="formHapusPengeluaran" data-id="${item.id}">
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
