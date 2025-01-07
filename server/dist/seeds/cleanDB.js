import Sound from '../models/Sound';
import User from '../models/user';
import process from 'process';
// async function cleanDB() {
//   await Sound.deleteMany({});
//   await User.deleteMany({});
//   process.exit(0);
// }
// cleanDB();
// export default cleanDB;
const cleanDB = async () => {
    try {
        await Sound.deleteMany({});
        await User.deleteMany({});
        console.log('Database cleaned.');
        process.exit(0);
    }
    catch (error) {
        console.error('Database cleaning error:', error);
        process.exit(1);
    }
};
export default cleanDB;
