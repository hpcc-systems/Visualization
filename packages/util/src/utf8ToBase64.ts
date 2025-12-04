const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function toUTF8Bytes(value: string): Uint8Array {
    if (typeof TextEncoder !== "undefined") {
        return new TextEncoder().encode(value);
    }

    const encoded = encodeURIComponent(value);
    const bytes: number[] = [];
    for (let i = 0; i < encoded.length; ++i) {
        if (encoded[i] === "%") {
            bytes.push(parseInt(encoded.substring(i + 1, i + 3), 16));
            i += 2;
        } else {
            bytes.push(encoded.charCodeAt(i));
        }
    }
    return Uint8Array.from(bytes);
}

function bytesToBase64(bytes: Uint8Array): string {
    let output = "";
    for (let i = 0; i < bytes.length; i += 3) {
        const byte1 = bytes[i];
        const hasByte2 = i + 1 < bytes.length;
        const hasByte3 = i + 2 < bytes.length;
        const byte2 = hasByte2 ? bytes[i + 1] : 0;
        const byte3 = hasByte3 ? bytes[i + 2] : 0;

        output += BASE64_ALPHABET[byte1 >> 2];
        output += BASE64_ALPHABET[((byte1 & 0x03) << 4) | (byte2 >> 4)];
        output += hasByte2 ? BASE64_ALPHABET[((byte2 & 0x0f) << 2) | (byte3 >> 6)] : "=";
        output += hasByte3 ? BASE64_ALPHABET[byte3 & 0x3f] : "=";
    }
    return output;
}

export function utf8ToBase64(value: string = ""): string {
    const normalized = value == null ? "" : String(value);

    const maybeBuffer = (globalThis as any)?.Buffer;
    if (maybeBuffer?.from) {
        return maybeBuffer.from(normalized, "utf8").toString("base64");
    }

    return bytesToBase64(toUTF8Bytes(normalized));
}
