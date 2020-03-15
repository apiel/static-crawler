import { join, extname, dirname } from 'path';
import { writeFile, pathExists, mkdirp } from 'fs-extra';
import * as minimatch from 'minimatch';

import { Consumer } from './consumer';
import { config, distPath, baseUrl } from './config';
import { browse } from './browser';

const urlsCount = 0;
const urlsQueue: string[] = [];

export function pushToUrlsConsumer(url: string) {
    urlsQueue.push(url);
}

const queue = { name: 'browser', maxConcurrent: config.consumerCount };

export const consumer: Consumer = {
    finish: () => ({ urlsCount }),
    picker: async () =>
        !!urlsQueue.length && {
            data: urlsQueue[0],
            apply: async () => {
                urlsQueue.splice(0, 1);
            },
            queue,
        },
    runner: async (url: string) => {
        const { html, links } = await browse(url);
        const filePath = getFilePath(url);
        await mkdirp(dirname(filePath));
        await writeFile(filePath, html);

        if (!config.skipLinks) {
            for (const link of links) {
                if (await isValidChild(link)) {
                    pushToUrlsConsumer(link);
                }
            }
        }
    },
};

function getFilePath(urlString: string) {
    const url = new URL(urlString);
    if (extname(url.pathname).trim() === '') {
        return join(distPath, url.pathname, 'index.html');
    }
    return join(distPath, url.pathname);
}

async function isValidChild(url: string) {
    if(config.ignorePattern && minimatch(url, config.ignorePattern as any as string)) {
        return false;
    }
    return url.indexOf(baseUrl) === 0 && !(await pathExists(getFilePath(url)));
}
