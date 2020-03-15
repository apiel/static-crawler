import { log, info } from 'logol';
import { join, resolve } from 'path';

import { consumer, pushToUrlsConsumer } from './crawlerConsumer';
import { runConsumers, setConsumers } from './consumer';
import { ROOT_FOLDER, config, setDistPath, setBaseUrl } from './config';

export { ROOT_FOLDER, CONFIG_FILE, setConfig } from './config';

setConsumers({ consumer });
export async function crawl(url: string, dist?: string) {
    setBaseUrl(url);
    const distPath = resolve(dist || join(ROOT_FOLDER, config.distFolder));
    setDistPath(distPath);
    log('input', { url, distPath, config });
    pushToUrlsConsumer(url);
    runConsumers(results => {
        info('done', results);
    });
}
