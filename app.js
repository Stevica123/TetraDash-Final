const express = require('express');
const { title } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const User = require('./models/user');
const methodOverride = require('method-override');




const app = express();

const dbURI = 'mongodb+srv://stefanristevski20:stefan123@cluster0.dshqlwz.mongodb.net/tetra-dash?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
.then((result) => app.listen(4000))
.catch((err) => console.log(err));


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));




app.get('/index', (req, res) => {
    res.render('index');
 });


app.get('/home', (req, res) => {
    res.render('home');
});


app.get('/share', (req, res) => {
    res.redirect('/users');
});

app.get('/users', (req, res) => {
    User.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('share', {title: 'All Comments', users: result })
    })
    .catch((err) =>{
        console.log(err);
    })
});

app.post('/users', async (req, res) => {
    const { name, lastname, comment } = req.body;
  
    if (!name || !lastname || !comment) {
      return res.status(400).send('All fields are required.');
    }
  
    const user = new User({ name, lastname, comment });
  
    try {
      await user.save();
      res.redirect('/users');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error.');
    }
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then((result) => {
        res.render('user', { user: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send('User not found.');
      });
  });


  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: '/users' });
      })
      .catch((err) => {
        console.log(err);
      });
  });

    

