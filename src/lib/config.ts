import { resolve, join } from 'path';

export const CONFIG_FILE = 'static-crawler';
export const ROOT_FOLDER = process.env.ROOT_FOLDER
    ? resolve(process.env.ROOT_FOLDER)
    : process.cwd();

export let config = {
    viewport: null,
    userAgent:
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    browserTimeout: 10,
    consumerCount: 5,
    distFolder: 'site',
    skipLinks: false,
};

export let distPath = join(ROOT_FOLDER, config.distFolder);

export function setConfig(newConfig = {}) {
    config = { ...config, ...newConfig };
    distPath = join(ROOT_FOLDER, config.distFolder);
}

export function setDistPath(path: string) {
    distPath = path;
}
