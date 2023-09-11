import { __awaiter, __generator } from "tslib";
import { MenuComponent, ScrollComponent, StickyComponent, ToggleComponent, DrawerComponent, SwapperComponent, } from "@/assets/ts/components";
/**
 * @description Initialize KeenThemes custom components
 */
var initializeComponents = function () {
    setTimeout(function () {
        ToggleComponent.bootstrap();
        StickyComponent.bootstrap();
        MenuComponent.bootstrap();
        ScrollComponent.bootstrap();
        DrawerComponent.bootstrap();
        SwapperComponent.bootstrap();
    }, 0);
};
/**
 * @description Reinitialize KeenThemes custom components
 */
var reinitializeComponents = function () {
    setTimeout(function () {
        ToggleComponent.reinitialization();
        StickyComponent.reInitialization();
        MenuComponent.reinitialization();
        reinitializeScrollComponent().then(function () {
            ScrollComponent.updateAll();
        });
        DrawerComponent.reinitialization();
        SwapperComponent.reinitialization();
    }, 0);
};
var reinitializeScrollComponent = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ScrollComponent.reinitialization()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export { initializeComponents, reinitializeComponents, reinitializeScrollComponent, };
//# sourceMappingURL=keenthemes.js.map