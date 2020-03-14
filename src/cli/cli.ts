#!/usr/bin/env node

import { info } from 'logol';
import { resolve } from 'path';
import * as minimist from 'minimist';

import { crawl } from '../lib';

async function start() {
    // const { 2: url, 3: destFolder } = process.argv;
    const {
        _: [url, dist],
        ...params
    } = minimist(process.argv.slice(2));
    if (!url) {
        console.log(`Usage: static-crawler url [dist]

Options:
  --config=./config.json
`);
    } else {
        info('static-crawler');
        crawl(url, dist);
    }
}

start();
