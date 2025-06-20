

export async function simpleRequire(id: string, path: string): Promise<any> {
    // Check if module is already loaded
    if ((window as any)[id]) {
        return (window as any)[id];
    }

    // Load the UMD bundle
    const script = document.createElement("script");
    script.src = import.meta.resolve(path);
    script.type = "text/javascript";
    script.async = false; // Ensure synchronous execution order
    document.head.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = () => {
            // UMD modules typically expose themselves on the global object
            const module = (window as any)[id];
            if (module) {
                resolve(module);
            } else {
                reject(new Error(`Module '${id}' not found on global object after loading ${path}`));
            }
        };

        script.onerror = () => {
            reject(new Error(`Failed to load UMD bundle: ${script.src}`));
        };

        // Timeout fallback for cases where onload doesn't fire
        setTimeout(() => {
            const module = (window as any)[id];
            if (module) {
                resolve(module);
            } else {
                reject(new Error(`Timeout loading UMD bundle: ${script.src}`));
            }
        }, 10000); // 10 second timeout
    });
}
