const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const routes = require('./api/routes');

const app = express();
app.use(cors());
app.use(fileUpload({ createParentPath: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const staticPath = path.resolve(`${__dirname}/../client/build`);
const imagesPath = path.resolve(`${__dirname}/images`);
app.use(express.static(staticPath));
app.use(express.static(imagesPath));
routes(app);

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

const port = 5000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});

module.exports = app;
