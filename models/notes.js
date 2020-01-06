const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title: {
      type:String,
      required:true,
      minlength:2,
      maxlength:15
    },
    description: {
      type: String,
      required:true,
      minlength:2,
      maxlength:100
    }
  },
  {
    timestamps: true
  }
);

const Note =  mongoose.model('Note', notesSchema);

//Note nam er upor vitti kore notes nam e ekta collection database e create hobe... mongoose.model() er vitor Note er prothom okkhor capital hobe

module.exports = Note;