import { __decorate, __extends, __metadata } from "tslib";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
var ApiModule = /** @class */ (function (_super) {
    __extends(ApiModule, _super);
    function ApiModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errors = {};
        _this.callMenus = {};
        _this.allUsers = {};
        _this.getBranches = {};
        _this.addUserHeader = {
            headers: {
                Authorization: "Bearer ".concat(JwtService.getToken()),
                Accept: "application/json",
            },
        };
        return _this;
    }
    Object.defineProperty(ApiModule.prototype, "getAllBranches", {
        get: function () {
            return this.getBranches;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiModule.prototype, "getAllMenus", {
        get: function () {
            return this.callMenus;
        },
        enumerable: false,
        configurable: true
    });
    ApiModule.prototype[_a = Mutations.SET_ALL_MENUS] = function (callMenus) {
        this.callMenus = callMenus;
    };
    ApiModule.prototype[_b = Mutations.SET_ALL_USERS] = function (data) {
        this.allUsers = data;
    };
    ApiModule.prototype[_c = Mutations.ADD_USER] = function (data) {
        this.addUser = data;
    };
    ApiModule.prototype[_d = Mutations.SET_BRANCHES] = function (data) {
        this.getBranches = data.data;
    };
    ApiModule.prototype[_e = Actions.GET_ALL_MENUS] = function () {
        var _this = this;
        return ApiService.query("menu", {
            headers: {
                Authorization: "Bearer ".concat(JwtService.getToken()),
                Accept: "application/json",
            },
        }).then(function (_h) {
            var data = _h.data;
            _this.context.commit(Mutations.SET_ALL_MENUS, data);
            var allMenus = JSON.stringify(data);
            window.localStorage.setItem("AllMenus", allMenus);
        });
    };
    ApiModule.prototype[_f = Actions.GET_ALL_USERS] = function () {
        var _this = this;
        return ApiService.query("users", {
            headers: {
                Authorization: "Bearer ".concat(JwtService.getToken()),
                Accept: "application/json",
            },
        }).then(function (_h) {
            var data = _h.data;
            _this.context.commit(Mutations.SET_ALL_USERS, data);
            var allUsers = JSON.stringify(data);
            window.localStorage.setItem("AllUsers", allUsers);
        });
    };
    ApiModule.prototype[_g = Actions.GET_BRANCHES] = function () {
        var _this = this;
        return ApiService.query("branches", {
            headers: {
                Authorization: "Bearer ".concat(JwtService.getToken()),
                Accept: "application/json",
            },
        }).then(function (_h) {
            var data = _h.data;
            _this.context.commit(Mutations.SET_BRANCHES, data);
            var allBranches = JSON.stringify(data);
            window.localStorage.setItem("AllBranches", allBranches);
        });
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _a, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _b, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _c, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _d, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _e, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _f, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ApiModule.prototype, _g, null);
    ApiModule = __decorate([
        Module
    ], ApiModule);
    return ApiModule;
}(VuexModule));
export default ApiModule;
//# sourceMappingURL=ApiModule.js.map