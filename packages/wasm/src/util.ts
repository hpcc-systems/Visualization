declare const window: any;

let _wasmFolder: string = window.__hpcc_wasmFolder || "./node_modules/@hpcc-js/wasm/dist";
export function wasmFolder(_?: string): string {
    if (!arguments.length) return _wasmFolder;
    const retVal = _wasmFolder;
    _wasmFolder = _;
    return retVal;
}

export function loadWasm(_wasmLib): Promise<any> {
    const wasmLib = _wasmLib.default || _wasmLib;
    //  Prevent double load ---
    if (!wasmLib.__hpcc_promise) {
        wasmLib.__hpcc_promise = new Promise(resolve => {
            wasmLib({
                locateFile: (path, prefix) => {
                    return `${wasmFolder()}/${path}`;
                }
            }).then(instance => {
                //  Not a real promise, remove "then" to prevent infinite loop  ---
                delete instance.then;
                resolve(instance);
            });
        });

    }
    return wasmLib.__hpcc_promise;
}
