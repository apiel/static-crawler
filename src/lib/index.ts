import { log } from 'logol';
import { join } from 'path';

import { consumer, pushToUrlsConsumer } from './crawlerConsumer';
import { runConsumers, setConsumers } from './consumer';
import { ROOT_FOLDER, DIST_FOLDER } from './config';

export { ROOT_FOLDER, CONFIG_FILE } from './config';

setConsumers({ consumer });
export async function crawl(url: string, dist?: string) {
    const distFolder = dist || join(ROOT_FOLDER, DIST_FOLDER);
    log('input', { url, distFolder });
    pushToUrlsConsumer(url);
    // runConsumers(results => {
    //     console.log('done', results);
    // });
}
