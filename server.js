'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));



app.get('/hello', (req, res) => {

    res.render('pages/index');
});

app.get('/', (req, res) => {
    res.render('pages/index');
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
        res.render('pages/error', { errorView:error });
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
