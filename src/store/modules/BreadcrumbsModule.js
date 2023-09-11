import { __decorate, __extends, __metadata } from "tslib";
import { Action, Mutation, Module, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
var BreadcrumbsModule = /** @class */ (function (_super) {
    __extends(BreadcrumbsModule, _super);
    function BreadcrumbsModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.breadcrumbs = {};
        return _this;
    }
    Object.defineProperty(BreadcrumbsModule.prototype, "getBreadcrumbs", {
        /**
         * Get breadcrumb object for current page
         * @returns object
         */
        get: function () {
            return this.breadcrumbs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BreadcrumbsModule.prototype, "pageBreadcrumbPath", {
        /**
         * Get breadcrumb array for current page
         * @returns object
         */
        get: function () {
            return this.breadcrumbs.pageBreadcrumbPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BreadcrumbsModule.prototype, "pageTitle", {
        /**
         * Get current page title
         * @returns string
         */
        get: function () {
            return this.breadcrumbs.title;
        },
        enumerable: false,
        configurable: true
    });
    BreadcrumbsModule.prototype[_a = Mutations.SET_BREADCRUMB_MUTATION] = function (payload) {
        this.breadcrumbs = payload;
    };
    BreadcrumbsModule.prototype[_b = Actions.SET_BREADCRUMB_ACTION] = function (payload) {
        this.context.commit(Mutations.SET_BREADCRUMB_MUTATION, payload);
    };
    var _a, _b;
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BreadcrumbsModule.prototype, _a, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BreadcrumbsModule.prototype, _b, null);
    BreadcrumbsModule = __decorate([
        Module
    ], BreadcrumbsModule);
    return BreadcrumbsModule;
}(VuexModule));
export default BreadcrumbsModule;
//# sourceMappingURL=BreadcrumbsModule.js.map