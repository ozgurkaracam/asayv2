import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
/**
 * Sets current page breadcrumbs
 * @param {string} pageTitle Current page title
 * @param {Array<string>} breadcrumbs Current page breadcrumbs
 */
export var setCurrentPageBreadcrumbs = function (pageTitle, breadcrumbs) {
    store.dispatch(Actions.SET_BREADCRUMB_ACTION, {
        title: pageTitle,
        pageBreadcrumbPath: breadcrumbs,
    });
};
/**
 * Sets current page breadcrumbs
 * @param {string} title Current page title name
 */
export var setCurrentPageTitle = function (title) {
    store.dispatch(Actions.SET_BREADCRUMB_ACTION, {
        title: title,
    });
};
//# sourceMappingURL=breadcrumb.js.map