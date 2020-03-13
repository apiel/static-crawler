import { Consumer } from './consumer';
import { CONSUMER_COUNT } from './config';
import { browse } from './browser';

const urlsCount = 0;
const urlsQueue: string[] = [];

export function pushToUrlsConsumer(url: string) {
    urlsQueue.push(url);
}

const queue = { name: 'browser', maxConcurrent: CONSUMER_COUNT };

export const consumer: Consumer = {
    finish: () => ({ urlsCount }),
    picker: async () => !!urlsQueue.length && ({
        data: urlsQueue[0],
        apply: async () => {
            urlsQueue.splice(0, 1);
        },
        queue,
    }),
    runner: async (url: string) => {
        const { html, links } = await browse(url);
        // await writeFile(htmlFile, html);
    },
};

