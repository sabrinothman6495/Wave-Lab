import Sound from '../models/Sound';
import User from '../models/User';
import process from 'process';

async function cleanDB() {
  await Sound.deleteMany({});
  await User.deleteMany({});
  process.exit(0);
}

cleanDB();

export default cleanDB;