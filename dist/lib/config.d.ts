export declare const CONFIG_FILE = "static-crawler";
export declare const ROOT_FOLDER: string;
export declare let config: {
    viewport: any;
    userAgent: string;
    browserTimeout: number;
    consumerCount: number;
    distFolder: string;
};
export declare let distPath: string;
export declare function setConfig(newConfig?: {}): void;
export declare function setDistPath(path: string): void;
