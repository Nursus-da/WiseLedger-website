const { Produk } = require('../models');
const user = require('../models/user');

class OperatorProduks {
    static async tambahProduk (req, res){
        const body = req.body;
        const userId = req.user.id;
        console.log("ini log controller",body);
        console.log("ini log id",userId);

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
}

module.exports = OperatorProduks;