/**
 * Calls a function on a specified interval for a maximum wait time.
 * Returns a promise that resolves when the function returns true or rejects when the maximum wait time reaches.
 * @param {Function} waitCondition Calls the function on specific interval and
 * @param {number} maxWaitTime Max time in milliseconds to wait
 * @param {number} interval the interval in milliseconds in which the function will be called
 */
let waitingQueue = 0;
const waitUntilTrue = (waitCondition = () => true, maxWaitTime = 5000, interval = 200) => {
    waitingQueue++;

    console.log(
        'info',
        `waitUntilTrue condition added`,
        `total waiting in queue:${waitingQueue}`,
        `waitCondition added: ${JSON.stringify('' + waitCondition)}`
    );
    return new Promise((resolve, reject) => {
        if (!!waitCondition()) {
            waitingQueue--;
            return resolve();
        }

        let checkInterval = null;
        let isResolved = false;

        const checkIfExists = () => {
            if (waitCondition()) {
                clearInterval(checkInterval);
                isResolved = true;
                waitingQueue--;
                resolve();
            }
        };

        checkInterval = setInterval(checkIfExists, interval);

        setTimeout(() => {
            if (!isResolved) {
                clearInterval(checkInterval);
                waitingQueue--;
                console.log('error', `maxWaitTime reached for ${JSON.stringify('' + waitCondition)}`);
                reject(`maxWaitTime reached for ${JSON.stringify('' + waitCondition)}`);
            }
        }, maxWaitTime);
    });
};

const findButtonByCssSelector = (selector) => {
    return new Promise((resolve, reject) => {
        waitUntilTrue(() => document.querySelector(selector))
            .then(() => resolve(document.querySelector(selector)))
            .catch((e) => reject('Could not find element ' + e));
    });
};

const runEventOnCssSelector = (selector, event) => {
    return new Promise((resolve, reject) => {
        findButtonByCssSelector(selector)
            .then((el) => {
                log(`runEventOnCssSelector`, `element: ${el}`, `selector: ${selector}`, `event: ${event})`);
                switch (event) {
                    case 'focus':
                        const eventFocus = new Event('focus');
                        resolve(el.dispatchEvent(eventFocus));
                        break;
                    case 'click':
                        resolve(el.click());
                        break;
                    default:
                        reject('runEventOnCssSelector: Event not handled!');
                }
            })
            .catch((e) => reject('Could not run event on element ' + e));
    });
};
