import IRecipe from './IRecipe';
import { Document } from 'mongoose';

export default interface IRecipeDoc extends Document, IRecipe {}
