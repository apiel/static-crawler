import { launch } from 'puppeteer';
import { info } from 'logol';
import { config } from './config';

export async function browse(
    url: string,
) {
    const browser = await launch({
        // headless: false,
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent(config.userAgent); // this should be configurable from crawler file _.json
        config.viewport && await page.setViewport(config.viewport);

        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: config.browserTimeout * 1000,
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
