const { Aruskas } = require('../models');

class OperatorAruskas {
    
    static async listPendapatan(req, res){
        const pendapatan = await Aruskas.findAll({
            where: {
                tipe: 'Pendapatan',
                userId: req.user.id
            }
        });
        res.status(200).json(pendapatan);
    }

    static async listPengeluaran(req, res){
        const pengeluaran = await Aruskas.findAll({
            where: {
                tipe: 'pengeluaran',
                userId: req.user.id
            }
        });
        res.status(200).json(pengeluaran);
    }
    
    static async addPendapatan(req, res){
        const body = req.body;

        console.log(body);

        if ( !body.tanggal || !body.deskripsi || !body.jumlah ) return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        await Aruskas.create({
            tipe: 'Pendapatan',
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
            simpanke: body.simpanke
        });
        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

    static async addPengeluaran(req, res){
        const body = req.body;

        console.log(body);

        if ( !body.tanggal || !body.deskripsi || !body.jumlah ) return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        await Aruskas.create({
            tipe: 'Pengeluaran',
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
            simpanke: body.simpanke
        });
        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

}

module.exports = OperatorAruskas;