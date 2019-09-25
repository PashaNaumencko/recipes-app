const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

const port = 3000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});

module.exports = app;
