import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const panggilApiForPlugin = async (endpoint, options = {}) => {
    
    try {
        //Lakukan Request ke backend
        const response = await fetch(endpoint, {
            ...options
        })
        
        //Jika request berhasil
        if (response.ok) {
            const data = await response.json();
            console.log(data);

    // Menggunakan Chart.js dan ChartDataLabels    
    Chart.register(ChartDataLabels);

        // 1. Populate Inventaris Data
        const inventarisItems = data.dataInventaris;
        
        const invGrid = document.getElementById('inventaris-data');
        inventarisItems.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.produk + ' : ' + item.stok + ' Pcs,' + " Harga Satuan : " + Number(item.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            invGrid.appendChild(div);
        });

        // 2. Setup Pie Chart (DIUBAH UNTUK MENAMPILKAN PERSENTASE)
        const ctxPie = document.getElementById('pieChart').getContext('2d');
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Keuntungan', 'Modal'],
                datasets: [{
                    data: [data.keuntungan, data.modal], // Value asli
                    backgroundColor: ['#8884d8', '#ff8042'], 
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8,
                            font: { size: 11 }
                        }
                    },
                    // Mengatur tampilan persentase di dalam diagram pie
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value * 100 / sum).toFixed(1) + "%";
                            return percentage; // Mereturn persentase (contoh: 66.7%)
                        }
                    },
                    // Memodifikasi tooltip (saat di hover) agar memunculkan persentase juga
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                let sum = context.dataset.data.reduce((a, b) => a + b, 0);
                                let percentage = (context.raw * 100 / sum).toFixed(1) + "%";
                                return label + percentage + ' (' + context.raw + ')';
                            }
                        }
                    }
                }
            }
        });

        // 3. Setup Line (Area) Chart
        const ctxLine = document.getElementById('lineChart').getContext('2d');
        
        // Create Gradient for Line Chart
        let gradientFill = ctxLine.createLinearGradient(0, 0, 0, 350);
        gradientFill.addColorStop(0, 'rgba(136, 132, 216, 0.4)');
        gradientFill.addColorStop(1, 'rgba(136, 132, 216, 0.05)');

        const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const labelBulan = data.keuntunganBulanan.map(item => namaBulan[item.bulan - 1]);
        const nilaiKeuntungan = data.keuntunganBulanan.map(item => item.jumlah);

        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: labelBulan,
                datasets: [{
                    label: 'Keuntungan',
                    data: nilaiKeuntungan,
                    borderColor: '#8884d8',
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#8884d8',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    // Menonaktifkan datalabels untuk chart line karena kita hanya butuh di chart pie
                    datalabels: { display: false } 
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false,
                            borderDash: [5, 5]
                        },
                        ticks: { color: '#9ca3af', font: { size: 11 } }
                    },
                    x: {
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false,
                            borderDash: [5, 5]
                        },
                        ticks: { color: '#9ca3af', font: { size: 11 } }
                        }
                    }
                }
            });

         return data;

    }

    } catch (error) {
        console.error("Error:", error);
        // localStorage.clear(); //Hapus token sampah jika error
        // window.location.href = '/login';
    }

}

export {panggilApiForPlugin};
