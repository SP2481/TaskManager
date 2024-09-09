import dotenv from 'dotenv';
import { resolve } from 'path';

const envpath = resolve(__dirname, '../../.env');

dotenv.config({ path: envpath });
