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
Object.defineProperty(exports, "__esModule", { value: true });
const logol_1 = require("logol");
const path_1 = require("path");
const crawlerConsumer_1 = require("./crawlerConsumer");
const consumer_1 = require("./consumer");
const config_1 = require("./config");
var config_2 = require("./config");
exports.ROOT_FOLDER = config_2.ROOT_FOLDER;
exports.CONFIG_FILE = config_2.CONFIG_FILE;
exports.setConfig = config_2.setConfig;
consumer_1.setConsumers({ consumer: crawlerConsumer_1.consumer });
function crawl(url, dist) {
    return __awaiter(this, void 0, void 0, function* () {
        config_1.setBaseUrl(url);
        const distPath = path_1.resolve(dist || path_1.join(config_1.ROOT_FOLDER, config_1.config.distFolder));
        config_1.setDistPath(distPath);
        logol_1.log('input', { url, distPath, config: config_1.config });
        crawlerConsumer_1.pushToUrlsConsumer(url);
        consumer_1.runConsumers(results => {
            logol_1.info('done', results);
        });
    });
}
exports.crawl = crawl;
//# sourceMappingURL=index.js.map