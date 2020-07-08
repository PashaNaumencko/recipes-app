const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  imgUrl: String,
  duration: {
    type: String,
    required: true
  },
  calorificValue: {
    type: Number,
    required: true
  },
  steps: [String],
  ingredients: [String]
},
{
  timestamps: true
});

module.exports = model('Recipe', schema);
