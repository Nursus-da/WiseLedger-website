const { where } = require('sequelize');
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

        res.status(200).json({
            listProduk : listProduk
        });
    }

    static async editProduk (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Produk.findByPk(id);

        if(!data) return res.status(400).json({message: "produk tidak ditemukan"});

        res.render('users/editProduk', {data: data});

    }

    static async updateProduk (req, res) {

        const body = req.body;

        if (!body.inputKategori || !body.inputStok || !body.inputProduk || !body.inputHarga || !body.inputBiaya) return res.status(400).json({message: "Input tidak boleh kosong"});
        console.log("ini body :",body);

        const updateProduk = await Produk.update(
            {
                kategori: body.inputKategori,
                stok: body.inputStok,
                produk: body.inputProduk,
                harga: body.inputHarga,
                biaya: body.inputBiaya
            },
            {
                where: {
                    id: req.params.id
                }
            });

            if(!updateProduk) return res.status(400).json({message: "gagal mengupdate produk"});
            res.status(201).json({
                message: "berhasil mengupdate produk"
            });
    }

    static async deleteProduk (req, res) {

        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const deleteProduk = await Produk.destroy({
            where: {
                id: id
            }
        });

        if(!deleteProduk) return res.status(400).json({message: "gagal menghapus produk"});
        res.status(200).json({message: "berhasil menghapus produk"});

    }

    static async detailProduk (req, res) {
        const id = req.params.id;

        if (!id) return res.status(401).json({message: "unautorized"});

        const data = await Produk.findByPk(id);

        if(!data) return res.status(400).json({message: "produk tidak ditemukan"});
        res.render('users/detailproduk', {data: data});
        
    }

}

module.exports = OperatorProduks;