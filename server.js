'use strict';
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const cors = require('cors');
const { request, response } = require('express');

// application setup
const PORT = process.env.PORT || 8080;
const app = express();

// set the view engine for server-side templeting
app.set('view engine', 'ejs');

app.use(cors());
// application middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect().then(()=>{
    app.listen(PORT, () => {
        console.log(`Listening to Port ${PORT}`);
    });
})
client.on('error', err => console.error(err));

// routs
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
       res.render('pages/books/show', { book: data.rows[0] });
      }).catch((error) => {
        error = { 'message': 'page not found', 'status': '404' }
        res.render('pages/error', { errorView:error });
    })
});

app.post('/books', (req , res)=>{
    let bookData = req.body;
    let SQL = 'INSERT INTO books (title,author,isbn,description,image_url,bookshelf) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id';
    //object.values
    let bookArray = [bookData.title,bookData.author,bookData.isbn, bookData.description,bookData.image_url,bookData.bookshelf];
    client.query(SQL,bookArray).then(result =>{
        res.redirect(`/books/${result.rows[0].id}`);
    });

})


app.get("/searches/new", (req, res) => {
    res.render("pages/searches/new");
});


// https://www.googleapis.com/books/v1/volumes?q=search+terms
// ex : https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor
app.post(`/searches`, (req, res) => {
   
   
    let url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.search}+${req.body.title ? 'intitle' : 'inauthor'}`;

   return superagent.get(url).then(data => {
        let allbooks = [];
        data.body.items.map(element => {

            let bookData = new Book(element);
            allbooks.push(bookData);
            return allbooks;

        });
        res.render('pages/searches/show', { searchRuslts: allbooks });
    }).catch((error) => {
        error = { 'message': 'page not found', 'status': '404' }
        res.render('pages/error', { errorView: error });
    })
})
// constructer 

function Book(data) {
    this.image_url = data.volumeInfo.imageLinks.thumbnail.replace(/^(http:)/g,'https:')  || 'https://i.imgur.com/J5LVHEL.jpg';
    this.author = data.volumeInfo.authors || 'not available';
    this.title = data.volumeInfo.title || 'not available';
    this.author = data.volumeInfo.authors || 'not available';
    this.description = data.volumeInfo.description || 'not available';
    this.isbn = data.volumeInfo.industryIdentifiers[0].identifier || 'not available';
}



