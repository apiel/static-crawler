import { launch } from 'puppeteer';
import { info } from 'logol';
import { USER_AGENT, TIMEOUT, VIEWPORT } from './config';

export async function browse(
    url: string,
) {
    const browser = await launch({
        // headless: false,
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent(USER_AGENT); // this should be configurable from crawler file _.json
        VIEWPORT && await page.setViewport(VIEWPORT);

        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: TIMEOUT,
        });
        const html = await page.content();
        const links = await page.$$eval('a', as =>
            as.map(a => (a as any).href),
        );

        return {
            links,
            html,
        }
    } finally {
        await browser.close();
        info('browser closed', url);
    }
}
