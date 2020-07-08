const Mongoose = require('mongoose');
const config = require('../../config/db.config');

async function connectToMongoDB() {
  try {
    const { username, password, host, database } = config;
    const mongoDBUri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`
    await Mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Connection has been established successfully.');
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

module.exports = connectToMongoDB();
