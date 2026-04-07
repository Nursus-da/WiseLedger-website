const panggilApiGetAruskas = async (endpoint, options = {}) => {

    try {
        
        const response = await fetch(endpoint, {
            ...options
        });
        
        if (response.ok) {

            const data = await response.json();

            // parent element laba bersih
            let cardLaba = document.getElementById('card-laba');

            // wrapper textContent laba bersih
            let cardAruskasWrapper = document.createElement('div');
            cardAruskasWrapper.classList.add('card-label');
            cardAruskasWrapper.textContent = "Laba Bersih";

            // wrapper textContent value laba bersih
            let cardAruskasValue = document.createElement('div');
            cardAruskasValue.classList.add('card-value');
            cardAruskasValue.textContent = Number(data.labaBersih).toLocaleString('id-ID', { style: 'currency', currency: 'IDR'});

            // output
            cardLaba.append(cardAruskasWrapper, cardAruskasValue);

            // parent element pendapatan
            let cardPendapatan = document.getElementById('card-pendapatan');

            // wrapper pengeluaran
            let cardWrapperPendapatan = document.createElement('div');
            cardWrapperPendapatan.classList.add('card-label');
            cardWrapperPendapatan.textContent = 'Pendapatan';

            // wrapper value
            let cardWrapperValuePendapatan = document.createElement('div');
            cardWrapperValuePendapatan.classList.add('card-value');
            cardWrapperValuePendapatan.textContent = Number(data.pendapatan).toLocaleString('id-ID', {style:'currency', currency:'IDR'});

            // wrapper subtext
             let cardWrapperSubtextPendapatan = document.createElement('div');
            cardWrapperSubtextPendapatan.classList.add('card-subtext');

            // span 
            let spanTextPendapatan = document.createElement('span');
            spanTextPendapatan.classList.add('text-green');
            spanTextPendapatan.textContent = '+0';

            cardWrapperSubtextPendapatan.append(spanTextPendapatan, ' Transaksi');
            cardPendapatan.append(cardWrapperPendapatan, cardWrapperValuePendapatan, cardWrapperSubtextPendapatan);


            // parent element pengeluaran
            let cardPengeluaran = document.getElementById('card-pengeluaran');

            // wrapper pengeluaran
            let cardWrapperPengeluaran = document.createElement('div');
            cardWrapperPengeluaran.classList.add('card-label');
            cardWrapperPengeluaran.textContent = 'Pengeluaran';

            // wrapper value
            let cardWrapperValuePengeluaran = document.createElement('div');
            cardWrapperValuePengeluaran.classList.add('card-value');
            cardWrapperValuePengeluaran.textContent = Number(data.pengeluaran).toLocaleString('id-ID', {style:'currency', currency:'IDR'});

            // wrapper subtext
             let cardWrapperSubtextPengeluaran = document.createElement('div');
            cardWrapperSubtextPengeluaran.classList.add('card-subtext');

            // span 
            let spanTextPengeluaran = document.createElement('span');
            spanTextPengeluaran.classList.add('text-red');
            spanTextPengeluaran.textContent = '+0';

            cardWrapperSubtextPengeluaran.append(spanTextPengeluaran, ' Transaksi');
            cardPengeluaran.append(cardWrapperPengeluaran, cardWrapperValuePengeluaran, cardWrapperSubtextPengeluaran)

            let tablesOutput = "<tr>"; //inisialisasi table output
            data.arusKas.forEach(item => {
                tablesOutput += `<td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>`;
                tablesOutput += `<td>${item.tipe}</td>`
                tablesOutput += `<td>${item.simpanke}</td>`
                tablesOutput += `<td>${Number(item.jumlah).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>`
                tablesOutput += "</tr>";
            });

            document.getElementById("table-aruskas").innerHTML = tablesOutput;
            return data;
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.clear();
    }
}