const express = require('express');
const app = express();
const port = 3000;
const Authentication = require('./controllers/authControllers');
const Aruskas = require('./controllers/aruskasControllers');
require('dotenv').config();
const auth = require('./midlewares/auth');
const aruskas = require('./models/aruskas');

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
app.post('/login', Authentication.login);

// register
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', Authentication.register)

// beranda
app.get('/beranda', (req, res) => {
    res.render('beranda');
});
app.get('/beranda/auth', auth, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// arus kas
app.get('/arus-kas', (req, res) => {
    res.render('arus-kas');
});

// pendapatan
app.get('/pendapatan', (req,res) => {
    res.render('pendapatan');
});
app.post('/tambah-pendapatan', Aruskas.addPendapatan);

// pengeluaran
app.get('/pengeluaran', (req,res) => {
    res.render('pengeluaran');
});

// produk
app.get('/produk', (req,res) => {
    res.render('produk');
});

app.listen(port, () => {
    console.log(`Beerjalann pada http://localhost:${port}`);
});