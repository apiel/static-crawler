import { resolve } from 'path';

export const ROOT_FOLDER = process.env.ROOT_FOLDER
    ? resolve(process.env.ROOT_FOLDER)
    : process.cwd();

export const DIST_FOLDER = process.env.DIST_FOLDER || 'site';
export const TIMEOUT = 10000; // 10 sec
export const CONSUMER_COUNT = 5;
export const USER_AGENT =
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
export const CONSUME_TIMEOUT = process.env.CONSUME_TIMEOUT
    ? parseInt(process.env.CONSUME_TIMEOUT, 10)
    : 30;

export const VIEWPORT = null;
// export const VIEWPORT = {
//     width: 800,
//     height: 600,
// };
