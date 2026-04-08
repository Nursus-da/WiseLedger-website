const { where } = require('sequelize');
const { Produk } = require('../models');
const { Aruskas } = require('../models');

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
                    userId: userId
                }
            });

            const pengeluaran = await Aruskas.sum('jumlah' , {
                where: {
                    tipe: 'pengeluaran',
                    userId: userId
                }
            });

            const keuntungan = pendapatan - pengeluaran;
            const modal = pengeluaran;
        
            res.status(200).json({
                dataInventaris : dataInventaris,
                keuntungan : keuntungan,
                modal : modal
            });
        }
    }


module.exports = OperatorBeranda;