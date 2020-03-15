#!/usr/bin/env node

import { info } from 'logol';
import * as minimist from 'minimist';
import { cosmiconfig } from 'cosmiconfig';

import { crawl, CONFIG_FILE, setConfig } from '../lib';

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
    const {
        _: [url, dist],
        configFile,
        ...config
    } = minimist(process.argv.slice(2));
    if (!url) {
        console.log(`Usage: static-crawler url [dist]

Options:
  --configFile=./config.json
  --userAgent="My custom user agent"
  --browserTimeout=10
  --consumerCount=5
  --distFolder=site
`);
    } else {
        info('static-crawler');

        const cosmic = configFile
            ? await cosmiconfig(CONFIG_FILE).load(configFile)
            : await cosmiconfig(CONFIG_FILE, cosmiconfigOptions).search();

        setConfig(cosmic?.config);
        setConfig(config);
        crawl(url, dist);
    }
}

start();
