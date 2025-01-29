import dotenv from 'dotenv';
import path from 'path';
import 'cross-fetch/polyfill'


dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

