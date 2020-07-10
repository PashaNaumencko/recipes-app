import { IRecipeDoc } from '../../types'
import { Schema, model } from 'mongoose';

const schema: Schema = new Schema({
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

export default model<IRecipeDoc>('Recipe', schema);
