import { consumer, pushToCrawl } from './crawlerConsumer';
import { runConsumers, setConsumers } from './consumer';

setConsumers({ consumer });
export async function crawl(
    url: string,
    destFolder?: string,
) {
    const addedToqueue = await pushToCrawl(url, destFolder || 'site');
    if (!addedToqueue) {
        throw new Error('Something went wrong while adding job to queue');
    }

    runConsumers((results) => {
        console.log('done', results);
    });
}
