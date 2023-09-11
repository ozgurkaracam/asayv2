import { __decorate, __extends, __metadata } from "tslib";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
var BodyModule = /** @class */ (function (_super) {
    __extends(BodyModule, _super);
    function BodyModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.classes = {};
        return _this;
    }
    Object.defineProperty(BodyModule.prototype, "getClasses", {
        /**
         * Get current page title
         * @returns string
         */
        get: function () {
            var _this = this;
            return function (position) {
                if (typeof position !== "undefined") {
                    return _this.classes[position];
                }
                return _this.classes;
            };
        },
        enumerable: false,
        configurable: true
    });
    BodyModule.prototype[_a = Mutations.SET_CLASSNAME_BY_POSITION] = function (payload) {
        var position = payload.position, className = payload.className;
        if (!this.classes[position]) {
            this.classes[position] = [];
        }
        this.classes[position].push(className);
    };
    BodyModule.prototype[_b = Actions.ADD_BODY_CLASSNAME] = function (className) {
        document.body.classList.add(className);
    };
    BodyModule.prototype[_c = Actions.REMOVE_BODY_CLASSNAME] = function (className) {
        document.body.classList.remove(className);
    };
    BodyModule.prototype[_d = Actions.ADD_BODY_ATTRIBUTE] = function (payload) {
        var qulifiedName = payload.qulifiedName, value = payload.value;
        document.body.setAttribute(qulifiedName, value);
    };
    BodyModule.prototype[_e = Actions.REMOVE_BODY_ATTRIBUTE] = function (payload) {
        var qulifiedName = payload.qulifiedName;
        document.body.removeAttribute(qulifiedName);
    };
    BodyModule.prototype[_f = Actions.ADD_CLASSNAME] = function (payload) {
        this.context.commit(Mutations.SET_CLASSNAME_BY_POSITION, payload);
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _a, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _b, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _c, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _d, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _e, null);
    __decorate([
        Action({ rawError: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BodyModule.prototype, _f, null);
    BodyModule = __decorate([
        Module
    ], BodyModule);
    return BodyModule;
}(VuexModule));
export default BodyModule;
//# sourceMappingURL=BodyModule.js.map