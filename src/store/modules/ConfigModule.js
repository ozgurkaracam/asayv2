import { __decorate, __extends, __metadata } from "tslib";
import objectPath from "object-path";
import merge from "deepmerge";
import layoutConfig from "@/core/config/DefaultLayoutConfig";
import { Mutations } from "@/store/enums/StoreEnums";
import { Mutation, Module, VuexModule } from "vuex-module-decorators";
var ConfigModule = /** @class */ (function (_super) {
    __extends(ConfigModule, _super);
    function ConfigModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = layoutConfig;
        _this.initial = layoutConfig;
        return _this;
    }
    Object.defineProperty(ConfigModule.prototype, "layoutConfig", {
        /**
         * Get config from layout config
         * @returns {function(path, defaultValue): *}
         */
        get: function () {
            var _this = this;
            return function (path, defaultValue) {
                return objectPath.get(_this.config, path, defaultValue);
            };
        },
        enumerable: false,
        configurable: true
    });
    ConfigModule.prototype[_a = Mutations.SET_LAYOUT_CONFIG] = function (payload) {
        this.config = payload;
    };
    ConfigModule.prototype[_b = Mutations.RESET_LAYOUT_CONFIG] = function () {
        this.config = Object.assign({}, this.initial);
    };
    ConfigModule.prototype[_c = Mutations.OVERRIDE_LAYOUT_CONFIG] = function () {
        this.config = this.initial = Object.assign({}, this.initial, JSON.parse(window.localStorage.getItem("config") || "{}"));
    };
    ConfigModule.prototype[_d = Mutations.OVERRIDE_PAGE_LAYOUT_CONFIG] = function (payload) {
        this.config = merge(this.config, payload);
    };
    var _a, _b, _c, _d;
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ConfigModule.prototype, _a, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ConfigModule.prototype, _b, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ConfigModule.prototype, _c, null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ConfigModule.prototype, _d, null);
    ConfigModule = __decorate([
        Module
    ], ConfigModule);
    return ConfigModule;
}(VuexModule));
export default ConfigModule;
//# sourceMappingURL=ConfigModule.js.map