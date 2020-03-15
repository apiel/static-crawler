#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logol_1 = require("logol");
const minimist = require("minimist");
const cosmiconfig_1 = require("cosmiconfig");
const lib_1 = require("../lib");
const cosmiconfigOptions = {
    searchPlaces: [
        'package.json',
        `${lib_1.CONFIG_FILE}.json`,
        `${lib_1.CONFIG_FILE}.yaml`,
        `${lib_1.CONFIG_FILE}.yml`,
        `${lib_1.CONFIG_FILE}.js`,
    ],
};
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = minimist(process.argv.slice(2)), { _: [url, dist], configFile } = _a, config = __rest(_a, ["_", "configFile"]);
        if (!url) {
            console.log(`Usage: static-crawler url [dist]

Options:
  --configFile=./config.json
  --userAgent="My custom user agent"
  --browserTimeout=10
  --consumerCount=5
  --distFolder=site
`);
        }
        else {
            logol_1.info('static-crawler');
            const cosmic = configFile
                ? yield cosmiconfig_1.cosmiconfig(lib_1.CONFIG_FILE).load(configFile)
                : yield cosmiconfig_1.cosmiconfig(lib_1.CONFIG_FILE, cosmiconfigOptions).search();
            lib_1.setConfig(cosmic === null || cosmic === void 0 ? void 0 : cosmic.config);
            lib_1.setConfig(config);
            lib_1.crawl(url, dist);
        }
    });
}
start();
//# sourceMappingURL=cli.js.map