import { computed } from "vue";
import store from "@/store/index";
/**
 * Returns layout config
 * @returns {object}
 */
export var config = computed(function () {
    return store.getters.layoutConfig();
});
/**
 * Set the sidebar display
 * @returns {boolean}
 */
export var displaySidebar = computed(function () {
    return store.getters.layoutConfig("sidebar.display");
});
/**
 * Check if footer container is fluid
 * @returns {boolean}
 */
export var footerWidthFluid = computed(function () {
    return store.getters.layoutConfig("footer.width") === "fluid";
});
/**
 * Check if header container is fluid
 * @returns {boolean}
 */
export var headerWidthFluid = computed(function () {
    return store.getters.layoutConfig("header.width") === "fluid";
});
/**
 * Returns header left part type
 * @returns {string}
 */
export var headerLeft = computed(function () {
    return store.getters.layoutConfig("header.left");
});
/**
 * Set the aside display
 * @returns {boolean}
 */
export var asideDisplay = computed(function () {
    return store.getters.layoutConfig("aside.display") === true;
});
/**
 * Check if toolbar width is fluid
 * @returns {boolean}
 */
export var toolbarWidthFluid = computed(function () {
    return store.getters.layoutConfig("toolbar.width") === "fluid";
});
/**
 * Set the toolbar display
 * @returns {boolean}
 */
export var toolbarDisplay = computed(function () {
    return store.getters.layoutConfig("toolbar.display");
});
/**
 * Check if the page loader is enabled
 * @returns {boolean}
 */
export var loaderEnabled = computed(function () {
    return store.getters.layoutConfig("loader.display");
});
/**
 * Check if container width is fluid
 * @returns {boolean}
 */
export var contentWidthFluid = computed(function () {
    return store.getters.layoutConfig("content.width") === "fluid";
});
/**
 * Page loader logo image
 * @returns {string}
 */
export var loaderLogo = computed(function () {
    return process.env.BASE_URL + store.getters.layoutConfig("loader.logo");
});
/**
 * Check if the aside menu is enabled
 * @returns {boolean}
 */
export var asideEnabled = computed(function () {
    return !!store.getters.layoutConfig("aside.display");
});
/**
 * Set the aside theme
 * @returns {string}
 */
export var asideTheme = computed(function () {
    return store.getters.layoutConfig("aside.theme");
});
/**
 * Set the subheader display
 * @returns {boolean}
 */
export var subheaderDisplay = computed(function () {
    return store.getters.layoutConfig("toolbar.display");
});
/**
 * Set the aside menu icon type
 * @returns {string}
 */
export var asideMenuIcons = computed(function () {
    return store.getters.layoutConfig("aside.menuIcon");
});
/**
 * Light theme logo image
 * @returns {string}
 */
export var themeLightLogo = computed(function () {
    return store.getters.layoutConfig("main.logo.light");
});
/**
 * Dark theme logo image
 * @returns {string}
 */
export var themeDarkLogo = computed(function () {
    return store.getters.layoutConfig("main.logo.dark");
});
/**
 * Set the header menu icon type
 * @returns {string}
 */
export var headerMenuIcons = computed(function () {
    return store.getters.layoutConfig("header.menuIcon");
});
/**
 * Illustrations set
 * @returns {string}
 */
export var illustrationsSet = computed(function () {
    return store.getters.layoutConfig("illustrations.set");
});
//# sourceMappingURL=config.js.map