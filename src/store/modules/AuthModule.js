import { __decorate, __extends, __metadata } from "tslib";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
var AuthModule = /** @class */ (function (_super) {
    __extends(AuthModule, _super);
    function AuthModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errors = {};
        _this.user = {};
        _this.isAuthenticated = !!JwtService.getToken();
        return _this;
        // @Action
        // [Actions.REGISTER](credentials) {
        //   return ApiService.post("register", credentials)
        //     .then(({ data }) => {
        //       this.context.commit(Mutations.SET_AUTH, data);
        //     })
        //     .catch(({ response }) => {
        //       this.context.commit(Mutations.SET_ERROR, response.data.errors);
        //     });
        // }
        // @Action
        // [Actions.FORGOT_PASSWORD](payload) {
        //   return ApiService.post("forgot_password", payload)
        //     .then(() => {
        //       this.context.commit(Mutations.SET_ERROR, {});
        //     })
        //     .catch(({ response }) => {
        //       this.context.commit(Mutations.SET_ERROR, response.data.errors);
        //     });
        // }
    }
    Object.defineProperty(AuthModule.prototype, "currentUser", {
        /**
         * Get current user object
         * @returns User
         */
        get: function () {
            return this.user;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthModule.prototype, "isUserAuthenticated", {
        /**
         * Verify user authentication
         * @returns boolean
         */
        get: function () {
            console.log("isAuthenticated", this.isAuthenticated);
            return this.isAuthenticated;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthModule.prototype, "getErrors", {
        /**
         * Get authentification errors
         * @returns array
         */
        get: function () {
            return this.errors;
        },
        enumerable: false,
        configurable: true
    });
    AuthModule.prototype[_a = Mutations.SET_ERROR] = function (error) {
        this.errors = error;
    };
    AuthModule.prototype[_b = Mutations.SET_AUTH] = function (user) {
        this.isAuthenticated = true;
        this.user = user;
        this.errors = {};
        JwtService.saveToken(user.api_key.plainTextToken);
    };
    AuthModule.prototype[_c = Mutations.SET_USER] = function (user) {
        this.user = user;
    };
    // @Mutation
    // [Mutations.SET_PASSWORD](password) {
    //   this.user.password = password;
    // }
    AuthModule.prototype[_d = Mutations.PURGE_AUTH] = function () {
        this.isAuthenticated = false;
        this.user = {};
        this.errors = [];
        JwtService.destroyToken();
    };
    AuthModule.prototype[_e = Actions.LOGIN] = function (credentials) {
        var _this = this;
        return ApiService.post("login", credentials)
            .then(function (_j) {
            var data = _j.data;
            _this.context.commit(Mutations.SET_AUTH, data);
            var userData = JSON.stringify(data);
            window.localStorage.setItem("UserData", userData);
        })
            .catch(function (_j) {
            var response = _j.response;
            _this.context.commit(Mutations.SET_ERROR, response === null || response === void 0 ? void 0 : response.status);
        });
    };
    AuthModule.prototype[_f = Actions.LOGOUT] = function () {
        this.context.commit(Mutations.PURGE_AUTH);
    };
    AuthModule.prototype[_g = Actions.GET_CITIES] = function (credentials) {
        return ApiService.get("cities").then(function (_j) {
            var data = _j.data;
            return data.cities;
        });
    };
    AuthModule.prototype[_h = Actions.GET_DISTRICTS] = function (payload) {
        return ApiService.get("districts/".concat(payload.id)).then(function (_j) {
            var data = _j.data;
            return data.districts;
        });
    };
    var _a, _b, _c, _d, _e, _f, _g, _h;
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _a, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _b, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _c, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _d, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _e, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _f, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _g, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AuthModule.prototype, _h, null);
    AuthModule = __decorate([
        Module
    ], AuthModule);
    return AuthModule;
}(VuexModule));
export default AuthModule;
//# sourceMappingURL=AuthModule.js.map