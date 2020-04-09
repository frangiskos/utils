/**
 * Pauses execution (non-blocking) for the specified time (milliseconds)
 * @param ms number
 */
function waitAsync(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}
