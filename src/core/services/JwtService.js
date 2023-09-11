var ID_TOKEN_KEY = "id_token";
/**
 * @description get token form localStorage
 */
export var getToken = function () {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};
/**
 * @description save token into localStorage
 * @param token: string
 */
export var saveToken = function (token) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};
/**
 * @description remove token form localStorage
 */
export var destroyToken = function () {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};
export default { getToken: getToken, saveToken: saveToken, destroyToken: destroyToken };
//# sourceMappingURL=JwtService.js.map