import objectPath from "object-path";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store/";
import { config } from "@/core/helpers/config";
var LayoutService = /** @class */ (function () {
    function LayoutService() {
    }
    /**
     * @description initialize default layout
     */
    LayoutService.init = function () {
        LayoutService.initLayout();
        LayoutService.initHeader();
        LayoutService.initToolbar();
        LayoutService.initAside();
        LayoutService.initFooter();
    };
    /**
     * @description init layout
     */
    LayoutService.initLayout = function () {
        store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
            qulifiedName: "id",
            value: "kt_body",
        });
        if (objectPath.get(config.value, "loader.display")) {
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading-enabled");
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
        }
    };
    /**
     * @description init header
     */
    LayoutService.initHeader = function () {
        if (objectPath.get(config.value, "header.fixed.desktop")) {
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "header-fixed");
        }
        if (objectPath.get(config.value, "header.fixed.tabletAndMobile")) {
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "header-tablet-and-mobile-fixed");
        }
    };
    /**
     * @description init toolbar
     */
    LayoutService.initToolbar = function () {
        if (!objectPath.get(config.value, "toolbar.display")) {
            return;
        }
        store.dispatch(Actions.ADD_BODY_CLASSNAME, "toolbar-enabled");
        if (objectPath.get(config.value, "toolbar.fixed")) {
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "toolbar-fixed");
        }
        store.dispatch(Actions.ADD_BODY_CLASSNAME, "toolbar-tablet-and-mobile-fixed");
    };
    /**
     * @description init aside
     */
    LayoutService.initAside = function () {
        if (!objectPath.get(config.value, "aside.display")) {
            return;
        }
        // Enable Aside
        store.dispatch(Actions.ADD_BODY_CLASSNAME, "aside-enabled");
        // Minimized
        if (objectPath.get(config.value, "aside.minimized") &&
            objectPath.get(config.value, "aside.toggle")) {
            store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
                qulifiedName: "data-kt-aside-minimize",
                value: "on",
            });
        }
        if (objectPath.get(config.value, "aside.fixed")) {
            // Fixed Aside
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "aside-fixed");
        }
        // Default minimized
        if (objectPath.get(config.value, "aside.minimized")) {
            store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
                qulifiedName: "data-kt-aside-minimize",
                value: "on",
            });
        }
    };
    /**
     * @description init footer
     */
    LayoutService.initFooter = function () {
        // Fixed header
        if (objectPath.get(config.value, "footer.width") === "fixed") {
            store.dispatch(Actions.ADD_BODY_CLASSNAME, "footer-fixed");
        }
    };
    return LayoutService;
}());
export default LayoutService;
//# sourceMappingURL=LayoutService.js.map