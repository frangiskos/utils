/**
 * Executes a function on dom ready.
 * same as $( document ).ready() in Jquery but without using Jquery or any other dependencies
 * @param fn function to execute
 */
function docReady(fn: (...param: any) => any) {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
