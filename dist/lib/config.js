"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.CONFIG_FILE = 'static-crawler';
exports.ROOT_FOLDER = process.env.ROOT_FOLDER
    ? path_1.resolve(process.env.ROOT_FOLDER)
    : process.cwd();
exports.config = {
    viewport: null,
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    browserTimeout: 10,
    consumerCount: 5,
    distFolder: 'site',
    skipLinks: false,
};
exports.distPath = path_1.join(exports.ROOT_FOLDER, exports.config.distFolder);
function setConfig(newConfig = {}) {
    exports.config = Object.assign(Object.assign({}, exports.config), newConfig);
    exports.distPath = path_1.join(exports.ROOT_FOLDER, exports.config.distFolder);
}
exports.setConfig = setConfig;
function setDistPath(path) {
    exports.distPath = path;
}
exports.setDistPath = setDistPath;
//# sourceMappingURL=config.js.map