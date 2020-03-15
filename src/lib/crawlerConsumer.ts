import { join, extname } from 'path';
import { writeFile, pathExists } from 'fs-extra';

import { Consumer } from './consumer';
import { config, distPath } from './config';
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
        await writeFile(getFilePath(url), html);

        for (const link of links) {
            if (!(await pathExists(getFilePath(link)))) {
                pushToUrlsConsumer(link);
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
