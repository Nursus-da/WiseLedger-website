const panggilApiGet = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        });
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();
            let output = "<tr>";
            data.forEach(item => {
                output += `<td>${item.tanggal}</td>`;
                // output += `<td>${item.deskripsi}</td>`;
                output += `<td>${item.tipe}</td>`;
                output += `<td>${item.jumlah}</td>`;
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
