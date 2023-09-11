import { __assign } from "tslib";
/* eslint-disable no-useless-escape */
// DOCS: https://javascript.info/cookie
var CookieComponent = /** @class */ (function () {
    function CookieComponent() {
    }
    /**
     * Returns the cookie with the given name, or undefined if not found
     *
     * @param  {string} name - cookie name
     * @returns string | null
     */
    CookieComponent.get = function (name) {
        var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    /**
     * Please note that a cookie value is encoded,
     * so getCookie uses a built-in decodeURIComponent function to decode it.
     *
     * @param  {string} name - cookie name
     * @param  {string | number | boolean} value - cookie value
     * @param  {any} cookieOptions - cookie options
     * @returns void
     */
    CookieComponent.set = function (name, value, cookieOptions) {
        var options = __assign({ path: '/' }, cookieOptions);
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        var updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        for (var optionKey in options) {
            updatedCookie += '; ' + optionKey;
            var optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }
        document.cookie = updatedCookie;
    };
    /**
     * To delete a cookie, we can call it with a negative expiration date
     *
     * @param  {string} name
     */
    CookieComponent.delete = function (name) {
        CookieComponent.set(name, '', {
            'max-age': -1,
        });
    };
    return CookieComponent;
}());
export { CookieComponent };
//# sourceMappingURL=_CookieComponent.js.map