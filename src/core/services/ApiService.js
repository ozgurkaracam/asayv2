import axios from "axios";
import VueAxios from "vue-axios";
/**
 * @description service to call HTTP request via Axios
 */
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    /**
     * @description initialize vue axios
     */
    ApiService.init = function (app) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios);
        ApiService.vueInstance.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    };
    /**
     * @description set the default HTTP request headers
     */
    // public static setMenus(): void {
    //   ApiService.vueInstance.axios.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${JwtService.getToken()}`;
    //   ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
    //     "application/json";
    // }
    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    ApiService.query = function (resource, params) {
        return ApiService.vueInstance.axios.get(resource, params);
    };
    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param slug: string
     * @returns Promise<AxiosResponse>
     */
    ApiService.get = function (resource, slug) {
        if (slug === void 0) { slug = ""; }
        return ApiService.vueInstance.axios.get("".concat(resource, "/").concat(slug));
    };
    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    ApiService.post = function (resource, params) {
        return ApiService.vueInstance.axios.post("".concat(resource), params);
    };
    /**
     * @description send the UPDATE HTTP request
     * @param resource: string
     * @param slug: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    ApiService.update = function (resource, slug, params) {
        return ApiService.vueInstance.axios.put("".concat(resource, "/").concat(slug), params);
    };
    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    ApiService.put = function (resource, params) {
        return ApiService.vueInstance.axios.put("".concat(resource), params);
    };
    /**
     * @description Send the DELETE HTTP request
     * @param resource: string
     * @returns Promise<AxiosResponse>
     */
    ApiService.delete = function (resource) {
        return ApiService.vueInstance.axios.delete(resource);
    };
    return ApiService;
}());
export default ApiService;
//# sourceMappingURL=ApiService.js.map