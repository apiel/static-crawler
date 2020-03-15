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
const puppeteer_1 = require("puppeteer");
const logol_1 = require("logol");
const config_1 = require("./config");
function browse(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.launch({});
        try {
            const page = yield browser.newPage();
            yield page.setUserAgent(config_1.config.userAgent);
            config_1.config.viewport && (yield page.setViewport(config_1.config.viewport));
            yield page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: config_1.config.browserTimeout * 1000,
            });
            const html = yield page.content();
            const links = yield page.$$eval('a', as => as.map(a => a.href));
            return {
                links,
                html,
            };
        }
        finally {
            yield browser.close();
            logol_1.info('browser closed', url);
        }
    });
}
exports.browse = browse;
//# sourceMappingURL=browser.js.map