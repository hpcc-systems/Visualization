import { scopedLogger } from "./logging";

const logger = scopedLogger("loader");

//  Shim to simplify dynamic import until rollupjs supports it (esnext)
declare function require(packages: string[], callback: (...packages: any[]) => void): void;

export function dynamicImport(packageStr: string): Promise<any> {
    return new Promise<any[]>((resolve, reject) => {
        if (require) {
            try {
                require([packageStr], (...packages: any[]) => {
                    resolve(packages[0]);
                });
            } catch {
                logger.error(`require([${packageStr}], ...) failed`);
                reject(`require([${packageStr}], ...) failed`);
            }
        } else {
            logger.error(`"require" is needed for dynamic loader.`);
            reject(`"require" is needed for dynamic loader.`);
        }
    });
}
