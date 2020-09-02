import Mongoose from 'mongoose';
import * as config from '../../config/db.config';

async function connectToMongoDB(): Promise<void> {
  try {
    const { username, password, host, database } = config;
    const mongoDBUri: string = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`
    await Mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Connection has been established successfully.');
  } catch (e) {
    console.error('Server Error', e.message);
    process.exit(1);
  }
}

export default connectToMongoDB();
