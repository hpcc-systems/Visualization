export async function load_dgrid_shim() {
    const script = document.createElement("script");
    script.src = import.meta.resolve("../../dgrid-shim/dist/index.js");
    script.type = "text/javascript";
    document.head.appendChild(script);

    await new Promise<void>((resolve) => {
        script.onload = () => {
            resolve();
        };
    });
}