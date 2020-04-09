/**
 * Add listener for XHR responses
 *
 * usage:
 * xhrResponseListener(myFunction) // myFunction is called every time an XHR response is received successfully
 */
const xhrResponseListener = (() => {
    const cbs = [];

    const oldXHROpen = globalThis.XMLHttpRequest.prototype.open;

    globalThis.XMLHttpRequest.prototype.open = function (
        method: string,
        url: string,
        async?: boolean,
        username?: string | null,
        password?: string | null
    ) {
        // XHR request send.
        this.addEventListener('load', function () {
            // XHR response received.
            if (this.readyState == 4 && this.status == 200) {
                // XHR response is successful. Call any registered listeners
                cbs.forEach((f) => f());
            }
        });
        oldXHROpen.apply(this, arguments);
    };

    const registerListener = (listener: (...param: any) => any) => cbs.push(listener);

    return registerListener;
})();
