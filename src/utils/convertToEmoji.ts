export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((char: any) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
