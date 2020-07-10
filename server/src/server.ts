import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'

import routes from './api/routes';

const app: Application = express();
dotenv.config();
app.use(cors());
app.use(fileUpload({ createParentPath: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const staticPath: string = path.resolve(`${__dirname}/../client/build`);
const imagesPath: string = path.resolve(`${__dirname}/images`);
app.use(express.static(staticPath));
app.use(express.static(imagesPath));

routes(app);

app.get('*', (req: Request, res: Response) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

const port = process.env.APP_PORT || 5000;

const server = app.listen(port as number, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});

module.exports = app;
