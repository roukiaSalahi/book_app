'use strict';
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


app.get('/hello', (req, res) => {
    res.render('pages/index');
});


app.get('/', (req, res) => {
    let SQL = `SELECT * FROM books;`;
    return client.query(SQL).then((data) => {
        res.render("pages/index", { finalResult: data.rows });
        console.log('data.rows', data.rows)
    }).catch((error) => {
        error = { 'message': 'page not found', 'status': '404' }
        res.render('pages/error', { errorView: error });
    });
});


app.get('/books/:id', (req , res ) =>{
    let SQL = 'SELECT * FROM books WHERE id=$1;';
    let values = [req.params.id];

    client.query(SQL, values).then(data => {
        // console.log('single', result.rows[0]);
       res.render('pages/books/detail', { book: data.rows[0] });
      }).catch((error) => {
        error = { 'message': 'page not found', 'status': '404' }
        res.render('pages/error', { errorView:error });
    })
});


app.get("/searches/new", (req, res) => {
    res.render("pages/searches/new");
});


// https://www.googleapis.com/books/v1/volumes?q=search+terms
// ex : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor
app.post(`/searches`, (req, res) => {
    let searchInput = req.body.searchInput;
    let sreachType = req.body.sreachType;
    let terms;
    if (sreachType == 'title') {
        terms = 'intitle'
    }
    else {
        terms = 'inauthor'
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}+${terms}`;

    superagent.get(url).then(data => {
        let allbooks = [];
        data.body.items.map(element => {

            let bookData = new Book(element);
            allbooks.push(bookData);

        });
        res.render('pages/searches/show', { books: allbooks });
    }).catch((error) => {
        error = { 'message': 'page not found', 'status': '404' }
        res.render('pages/error', { errorView: error });
    })
})
// constructer 

function Book(data) {
    this.image = data.volumeInfo.imageLinks.smallThumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
    this.title = data.volumeInfo.title;
    this.authors = data.volumeInfo.authors;
    this.description = data.volumeInfo.description;
}


app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});
