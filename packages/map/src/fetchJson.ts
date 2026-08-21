export function fetchJson<T = any>(url: string): Promise<T> {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    });
}