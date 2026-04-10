const { Aruskas } = require('../models');
const { Op } = require('sequelize');

class OperatorAruskas {
    
    static async arusKas(req, res) {

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

    static async editPendapatan (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Aruskas.findByPk(id);

        if(!data) return res.status(400).json({message: "produk tidak ditemukan"});

        res.render('users/editPendapatan', {data: data});

    }

    static async updatePendapatan(req, res){
        const body = req.body;
        const id = req.params.id;
        const userId = req.user.id;

        console.log("...........",body);
        console.log("...........",id);
        console.log("...........",userId);

        if (!id) return res.status(401).json({message: "unautorized"});

        if (!body.inputTipe || !body.inputTanggal || !body.inputDeskripsi || !body.inputJumlah || !body.inputSimpanke) return res.status(400).json({message: "Input tidak boleh kosong"});

        const updatePendapatan = await Aruskas.update(
            {
                tipe: body.inputTipe,
                tanggal: body.inputTanggal,
                deskripsi: body.inputDeskripsi,
                jumlah: body.inputJumlah,
                simpanke: body.inputSimpanke
            },
            {
                where: {
                    id: id
                }
            });

        if(!updatePendapatan) return res.status(400).json({message: "gagal mengupdate pendapatan"});
        res.status(201).json({message: "berhasil mengupdate pendapatan"});
    }

    static async deletePendapatan (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const deletePendapatan = await Aruskas.destroy({
            where: {
                id: id
            }
        });

        if(!deletePendapatan) return res.status(400).json({message: "gagal menghapus produk"});
        res.status(200).json({message: "berhasil menghapus pendapatan"});

    }
    static async editPengeluaran (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Aruskas.findByPk(id);

        if(!data) return res.status(400).json({message: "data tidak ditemukan"});

        res.render('users/editPengeluaran', {data: data});

    }

    static async updatePengeluaran(req, res){
        const body = req.body;
        const id = req.params.id;
        const userId = req.user.id;

        console.log("...........",body);
        console.log("...........",id);
        console.log("...........",userId);

        if (!id) return res.status(401).json({message: "unautorized"});

        if (!body.inputTipe || !body.inputTanggal || !body.inputDeskripsi || !body.inputJumlah || !body.inputSimpanke) return res.status(400).json({message: "Input tidak boleh kosong"});

        const updatePengeluaran = await Aruskas.update(
            {
                tipe: body.inputTipe,
                tanggal: body.inputTanggal,
                deskripsi: body.inputDeskripsi,
                jumlah: body.inputJumlah,
                simpanke: body.inputSimpanke
            },
            {
                where: {
                    id: id
                }
            });

        if(!updatePengeluaran) return res.status(400).json({message: "gagal mengupdate pengeluaran"});
        res.status(201).json({message: "berhasil mengupdate pengeluaran"});
    }

    static async deletePengeluaran (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const deletePengeluaran = await Aruskas.destroy({
            where: {
                id: id
            }
        });

        if(!deletePengeluaran) return res.status(400).json({message: "gagal menghapus produk"});
        res.status(200).json({message: 'Berhasil menghapus mengeluarkan'});

    }
    
    static async detailPengeluaran (req, res) {
        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Aruskas.findByPk(id);

        if(!data) return res.status(400).json({message: "produk tidak ditemukan"});
        res.render('users/detailpengeluaran', {data: data});
        
    }

    static async detailPendapatan (req, res) {
        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Aruskas.findByPk(id);

        if(!data) return res.status(400).json({message: "produk tidak ditemukan"});
        res.render('users/detailpendapatan', {data: data});
        
    }

}

module.exports = OperatorAruskas;