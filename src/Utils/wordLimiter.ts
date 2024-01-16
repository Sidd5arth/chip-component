export function wordLimiter(str: string, limit: number) {
    if (str.length > limit) {
        str = str.substring(0, limit);
        str += "...";
        return str;
    }
    return str;
}
