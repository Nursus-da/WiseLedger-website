class Aruskas {
    static async addPendapatan(req, res){
        const body = req.body;

        if ( !body.tanggal || !body.deskripsi || !body.jumlah )
            return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        await Aruskas.create({
            tipe: "pendapatan",
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
        });
        res.status(201).json({message: "berhasil menambahkan pendapatan"});
    }

    static async addPengeluaran(req, res){
        const body = req.body;

        if ( !body.tanggal || !body.deskripsi || !body.jumlah )
            return res.status(400).json({message: "tanggal, deskripsi, dan jumlah harus diisi"});

        await Aruskas.create({
            tipe: "pengeluaran",
            userId: req.user.id,
            tanggal: body.tanggal,
            deskripsi: body.deskripsi,
            jumlah: body.jumlah,
        });
        res.status(201).json({message: "berhasil menambahkan pengeluaran"});
    }
}

module.exports = Aruskas;