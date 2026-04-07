const express = require('express');
const app = express();
const port = 3000;
const Authentication = require('./controllers/authControllers');
const OperatorAruskas = require('./controllers/aruskasControllers');
const verifyToken = require('./midlewares/verify');
const OperatorProduks = require('./controllers/produkControllers');

// view engine = ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// tipe data yang di terima
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// landing page
app.get('/', (req, res) => {
    res.render('index');
});

// login
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/api/login', Authentication.login);

// register
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', Authentication.register)

// beranda
app.get('/beranda', (req, res) => {
    res.render('beranda');
});
app.get('/beranda/auth', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// arus kas
app.get('/arus-kas', (req, res) => {
    res.render('arus-kas');
});
app.get('/arus-kas/auth', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
app.get('/arus-kas/list', verifyToken, OperatorAruskas.arusKas);

// pendapatan
app.get('/pendapatan', (req,res) => {
    res.render('pendapatan');
});
app.get('/pendapatan/auth', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
app.get('/pendapatan/list', verifyToken, OperatorAruskas.listPendapatan);
app.post('/pendapatan/tambah', verifyToken, OperatorAruskas.addPendapatan);


// pengeluaran
app.get('/pengeluaran', (req,res) => {
    res.render('pengeluaran');
});
app.get('/pengeluaran/auth', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
app.get('/pengeluaran/list', verifyToken, OperatorAruskas.listPengeluaran);
app.post('/pengeluaran/tambah',  verifyToken,OperatorAruskas.addPengeluaran);

// produk
app.get('/produk', (req,res) => {
    res.render('produk');
});
app.get('/produk/auth', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});
app.post('/produk/tambah', verifyToken, OperatorProduks.tambahProduk);

app.listen(port, () => {
    console.log(`Beerjalann pada http://localhost:${port}`);
});