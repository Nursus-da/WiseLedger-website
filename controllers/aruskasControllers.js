const { Aruskas } = require('../models');
const { Op } = require('sequelize');

class OperatorAruskas {
    
    static async arusKas(req, res) {

        console.log(req.user.id);
        console.log("ini log controller",req.body);

        if (!req.user) return res.status(401).json({message: "unautorized"});

        // hitung total pendapatan bulan ini
        const pendapatan = await Aruskas.sum('jumlah' , {
            where: {
                tipe: 'Pendapatan',
                userId: req.user.id,
                simpanke: 'Uang Kas',
                createdAt: {
                    // hitung pendapatan bulan saat ini
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        // hitung total pengeluaran bulan ini
        const pengeluaran = await Aruskas.sum('jumlah' , {
            where: {
                tipe: 'Pengeluaran',
                userId: req.user.id,
                simpanke: 'Uang Kas',
                createdAt: {
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        // hitung laba bulan ini 
        const labaBersih = pendapatan - pengeluaran;

        // tampilkan semua arus kas
        const aruskas = await Aruskas.findAll({
            where: {userId: req.user.id}
        });

        res.status(200).json({
            labaBersih : labaBersih,
            pendapatan : pendapatan,
            pengeluaran : pengeluaran,
            arusKas : aruskas
        });
    }

    static async listPendapatan(req, res){

        if (!req.user) return res.status(401).json({message: "unautorized"});

        const pendapatan = await Aruskas.findAll({
            where: {
                tipe: 'Pendapatan',
                userId: req.user.id
            }
        });

        const PendapatanBulanIni = await Aruskas.sum('jumlah', {
            where: {
                tipe: 'Pendapatan',
                userId: req.user.id,
                createdAt: {
                    // tampilkan pendapatan bulan ini dan reset saat bulan berganti
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        const PendapatanTertinggi = await Aruskas.max('jumlah', {
            where: {
                tipe: 'Pendapatan',
                userId: req.user.id,
                createdAt: {
                    // tampilkan pendapatan bulan ini dan reset saat bulan berganti
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });



        res.status(200).json({
            pendapatan: pendapatan,
            PendapatanBulanIni: PendapatanBulanIni || 0,
            PendapatanTertinggi: PendapatanTertinggi
        });
    }

    static async listPengeluaran(req, res){

        if (!req.user) return res.status(401).json({message: "unautorized"});
    
        const pengeluaran = await Aruskas.findAll({
            where: {
                tipe: 'Pengeluaran',
                userId: req.user.id
            }
        });

        const PengeluaranBulanIni = await Aruskas.sum('jumlah', {
            where: {
                tipe: 'Pengeluaran',
                userId: req.user.id,
                createdAt: {
                    // tampilkan pendapatan bulan ini dan reset saat bulan berganti
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        const PengeluaranTertinggi = await Aruskas.max('jumlah', {
            where: {
                tipe: 'Pengeluaran',
                userId: req.user.id,
                createdAt: {
                    // tampilkan pendapatan bulan ini dan reset saat bulan berganti
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        });

        res.status(200).json({
            pengeluaran: pengeluaran,
            PengeluaranBulanIni:PengeluaranBulanIni || 0,
            PengeluaranTertinggi: PengeluaranTertinggi 
        });
    }
    
    static async addPendapatan(req, res){
        const body = req.body;

        console.log("ini log controller",req.body);

        if (!req.user) return res.status(401).json({message: "unautorized"});
        if ( !body.tanggal || !body.deskripsi || !body.jumlah ) return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        const createPendapatan = await Aruskas.create({
            tipe: 'Pendapatan',
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
            simpanke: body.simpanke
        });

        if (!createPendapatan) return res.status(400).json({message: "gagal menambahkan pendapatan"});

        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

    static async addPengeluaran(req, res){
        const body = req.body;


        if (!req.user) return res.status(401).json({message: "unautorized"});
        if ( !body.tanggal || !body.deskripsi || !body.jumlah ) return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        const createPengeluaran = await Aruskas.create({
            tipe: 'Pengeluaran',
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
            simpanke: body.simpanke
        });

        if (!createPengeluaran) return res.status(400).json({message: "gagal menambahkan pengeluaran"});
        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

}

module.exports = OperatorAruskas;