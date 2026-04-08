const { Produk } = require('../models');

class OperatorProduks {
    static async tambahProduk (req, res){
        const body = req.body;
        const userId = req.user.id;

        if (!userId) return res.status(401).json({message: "unautorized"});
        if (!body.inputKategori || !body.inputStok || !body.inputProduk || !body.inputHarga || !body.inputBiaya) return res.status(400).json({message: "Input tidak boleh kosong"});

        const createProduk = await Produk.create({
            kategori: body.inputKategori,
            stok: body.inputStok,
            produk: body.inputProduk,
            harga: body.inputHarga,
            biaya: body.inputBiaya,
            userId: userId
        });

        if(!createProduk) return res.status(400).json({message: "gagal menambahkan produk"});
        res.status(201).json({
            message: "berhasil menambahkan produk"
        });

    }

    static async getListProduk (req, res) {
        const userId = req.user.id;
        console.log("ini log id getListProduk",userId);

        if (!userId) return res.status(401).json({message: unautorized});

        const listProduk = await Produk.findAll({
            where: {
                userId: userId
            }
        });

        if(!listProduk) return res.status(400).json({message: "gagal mengambil produk"});

        console.log("ini log getListProduk",listProduk);

        res.status(200).json({
            listProduk : listProduk
        });
    }
}

module.exports = OperatorProduks;