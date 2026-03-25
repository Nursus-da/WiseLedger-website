const express = require('express');
const app = express();
const port = 3000;
const Authentication = require('./controllers/authControllers');

// view engine = ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// tipe data yang di terima
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', Authentication.register)

app.get('/beranda', (req, res) => {
    res.render('beranda');
});

app.listen(port, () => {
    console.log(`Beerjalann pada http://localhost:${port}`);
});