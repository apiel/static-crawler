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
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const config_1 = require("./config");
const browser_1 = require("./browser");
const urlsCount = 0;
const urlsQueue = [];
function pushToUrlsConsumer(url) {
    urlsQueue.push(url);
}
exports.pushToUrlsConsumer = pushToUrlsConsumer;
const queue = { name: 'browser', maxConcurrent: config_1.config.consumerCount };
exports.consumer = {
    finish: () => ({ urlsCount }),
    picker: () => __awaiter(void 0, void 0, void 0, function* () {
        return !!urlsQueue.length && {
            data: urlsQueue[0],
            apply: () => __awaiter(void 0, void 0, void 0, function* () {
                urlsQueue.splice(0, 1);
            }),
            queue,
        };
    }),
    runner: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const { html, links } = yield browser_1.browse(url);
        const filePath = getFilePath(url);
        yield fs_extra_1.mkdirp(path_1.dirname(filePath));
        yield fs_extra_1.writeFile(filePath, html);
        if (!config_1.config.skipLinks) {
            for (const link of links) {
                if (yield isValidChild(link)) {
                    pushToUrlsConsumer(link);
                }
            }
        }
    }),
};
function getFilePath(urlString) {
    const url = new URL(urlString);
    if (path_1.extname(url.pathname).trim() === '') {
        return path_1.join(config_1.distPath, url.pathname, 'index.html');
    }
    return path_1.join(config_1.distPath, url.pathname);
}
function isValidChild(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return url.indexOf(config_1.baseUrl) === 0 && !(yield fs_extra_1.pathExists(getFilePath(url)));
    });
}
//# sourceMappingURL=crawlerConsumer.js.map