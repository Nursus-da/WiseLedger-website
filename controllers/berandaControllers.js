const { where } = require('sequelize');
const { Produk } = require('../models');
const { Aruskas } = require('../models');
const { fn, col, literal } = require('sequelize');
const { Op } = require('sequelize');


class OperatorBeranda {
    static async getData (req, res) {

        const userId = req.user.id;
            console.log("ini log id getListProduk",userId);
    
            if (!userId) return res.status(401).json({message: unautorized});
    
            const dataInventaris = await Produk.findAll({
                where: {
                    userId: userId
                }
            });
    
            if(!dataInventaris) return res.status(400).json({message: "gagal mengambil data"});

            const pendapatan = await Aruskas.sum('jumlah' , {
                where: {
                    tipe: 'Pendapatan',
                    simpanke: 'Uang Kas',
                    userId: userId,
                    createdAt: {
                        [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            });

            const pengeluaran = await Aruskas.sum('jumlah' , {
                where: {
                    tipe: 'Pengeluaran',
                    simpanke : 'Uang Kas',
                    userId: userId,
                    createdAt: {
                        [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            });

            const nilaiPendapatan = await Aruskas.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'bulan'],
                    [fn('SUM', col('jumlah')), 'nilai']
                ],
                where: {
                    tipe: 'Pendapatan',
                    simpanke: 'Uang Kas',
                    userId: userId,
                    createdAt: {
                        [Op.gte]: new Date(new Date().getFullYear(), 0, 1), // Januari tahun ini
                        [Op.lt]: new Date(new Date().getFullYear() + 1, 0, 1) // Januari tahun depan
                    }
                },
                group: [fn('MONTH', col('createdAt'))],
                order: [[literal('bulan'), 'ASC']]
            });

            const nilaiPengeluaran = await Aruskas.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'bulan'],
                    [fn('SUM', col('jumlah')), 'nilai']
                ],
                where: {
                    tipe: 'Pengeluaran',
                    simpanke: 'Uang Kas',
                    userId: userId,
                    createdAt: {
                        [Op.gte]: new Date(new Date().getFullYear(), 0, 1), // Januari tahun ini
                        [Op.lt]: new Date(new Date().getFullYear() + 1, 0, 1) // Januari tahun depan
                    }
                },
                group: [fn('MONTH', col('createdAt'))],
                order: [[literal('bulan'), 'ASC']]
            });

            // Hitung keuntungan per bulan
            const keuntunganBulanan = nilaiPendapatan.map(pendapatan => {
                const bulan = pendapatan.dataValues.bulan;
                const totalPendapatan = Number(pendapatan.dataValues.nilai);

                const pengeluaran = nilaiPengeluaran.find(p => p.dataValues.bulan === bulan);
                const totalPengeluaran = pengeluaran ? Number(pengeluaran.dataValues.nilai) : 0;

                return {
                bulan: bulan,
                jumlah: totalPendapatan - totalPengeluaran
                };
            });

            const keuntungan = pendapatan - pengeluaran;
            const modal = pengeluaran;
        
            res.status(200).json({
                dataInventaris : dataInventaris,
                keuntungan : keuntungan,
                modal : modal,
                keuntunganBulanan: keuntunganBulanan
            });
        }
    }


module.exports = OperatorBeranda;