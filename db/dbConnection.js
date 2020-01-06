//mongoose connect
const mongoose = require('mongoose');

//connection database

module.exports.connectDb= () => {
    mongoose
  .connect('mongodb://localhost:27017/notes-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('database connection successfulll'));
}
