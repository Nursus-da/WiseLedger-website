const { Aruskas } = require('../models');

class OperatorAruskas {
    static async add(req, res){
        const body = req.body;

        console.log(body);

        if ( !body.tanggal || !body.deskripsi || !body.jumlah ) return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        await Aruskas.create({
            tipe: body.tipe,
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
        });
        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

}

module.exports = OperatorAruskas;