#!/usr/bin/env node

import { info } from 'logol';
import { crawl } from '../lib';

async function start() {
    info('static-crawler');
    const { 2: url, 3: destFolder } = process.argv;
    if (url) {
        crawl(url, destFolder);
    }
}

start();
