const express = require('express');
const app = express();
const port = 3000;

// view engine = ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/beranda', (req, res) => {
    res.render('beranda');
});

app.listen(port, () => {
    console.log(`Beerjalann pada http://localhost:${port}`);
});