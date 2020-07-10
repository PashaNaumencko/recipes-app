import fileUpload from "express-fileupload";

export default interface IRecipe {
  title: string;
  imgFile?:  fileUpload.UploadedFile | null;
  imgUrl?: string;
  calorificValue: number;
  steps: string[];
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}
