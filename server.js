const express = require ('express');
const app = express();
app.set('view engine' ,'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));


 //Database
const Document = require('./models/Document');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wastebin');


app.get('/', (req, res)=> {
    const code = `We are here
This is my coded Line!`

    res.render('code-display', {code, language: 'plaintext'});
});

app.get('/new', (req, res) => {
    res.render('new')
});

app.post('/save', async (req, res) => {
    const value = req.body.value;
    try {
       const document = await Document.create({value});
       res.redirect(`/${document.id}`) 
    } catch (error) {
        res.render('new', {value})
    }
});

app.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id);
        res.render ('code-display', {code : document.value , id})
    } catch (error) {
        res.redirect('/');
    }
});

app.get('/:id/duplicate', async(req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id);
        res.render ('new', {value : document.value})
    } catch (error) {
        res.redirect(`/${id}`);
    }
})
app.listen(3000)