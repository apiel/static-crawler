#!/usr/bin/env node

import { info } from 'logol';
import { resolve } from 'path';
import * as minimist from 'minimist';
import { cosmiconfig } from 'cosmiconfig';

import { crawl, CONFIG_FILE } from '../lib';

const cosmiconfigOptions = {
    searchPlaces: [
        'package.json',
        `${CONFIG_FILE}.json`,
        `${CONFIG_FILE}.yaml`,
        `${CONFIG_FILE}.yml`,
        `${CONFIG_FILE}.js`,
    ],
};

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

        const cosmic = params.config
            ? await cosmiconfig(CONFIG_FILE).load(params.config)
            : await cosmiconfig(CONFIG_FILE, cosmiconfigOptions).search();
        console.log('cosmic', cosmic);
        crawl(url, dist);
    }
}

start();
