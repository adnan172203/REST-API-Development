const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//db 
const { connectDb } = require('./db/dbConnection');

//Route
const notesRoute = require('./routes/notes');
const usersRoute = require('./routes/users');

//middleware
app.use(express.json());
app.use(cookieParser('secretKey'));

//connection db
connectDb();

//Handling Route
app.use('/notes', notesRoute);
app.use('/users', usersRoute);

//server create
app.listen(3000, () => {
  console.log('hello world');
});

//route
app.get('/', (req, res) => {
  res.send('i am home page');
});

//note found
app.get('*', (req, res) => {
  res.send('404 not found');
});
