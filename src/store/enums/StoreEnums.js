var Actions;
(function (Actions) {
    // action types
    Actions["ADD_BODY_CLASSNAME"] = "addBodyClassName";
    Actions["REMOVE_BODY_CLASSNAME"] = "removeBodyClassName";
    Actions["ADD_BODY_ATTRIBUTE"] = "addBodyAttribute";
    Actions["REMOVE_BODY_ATTRIBUTE"] = "removeBodyAttribute";
    Actions["ADD_CLASSNAME"] = "addClassName";
    Actions["VERIFY_AUTH"] = "verifyAuth";
    Actions["GET_ALL_MENUS"] = "menu";
    Actions["LOGIN"] = "login";
    Actions["LOGOUT"] = "logout";
    Actions["REGISTER"] = "register";
    Actions["UPDATE_USER"] = "updateUser";
    Actions["FORGOT_PASSWORD"] = "forgotPassword";
    Actions["SET_BREADCRUMB_ACTION"] = "setBreadcrumbAction";
    Actions["GET_ALL_USERS"] = "users";
    Actions["ADD_USER"] = "users";
    Actions["ADD_MENU"] = "users/addmenu";
    Actions["GET_BRANCHES"] = "branches";
    Actions["GET_CURRENT_USER"] = "getCurrentUser";
    Actions["GET_CITIES"] = "getCities";
    Actions["GET_DISTRICTS"] = "getDistricts";
    Actions["GET_PARAMETERS"] = "getParameters";
})(Actions || (Actions = {}));
var Mutations;
(function (Mutations) {
    // mutation types
    Mutations["SET_CLASSNAME_BY_POSITION"] = "appendBreadcrumb";
    Mutations["PURGE_AUTH"] = "logOut";
    Mutations["SET_AUTH"] = "setAuth";
    Mutations["SET_USER"] = "setUser";
    Mutations["SET_ALL_MENUS"] = "setMenus";
    Mutations["SET_ALL_USERS"] = "setAllUsers";
    Mutations["ADD_USER"] = "addUser";
    Mutations["ADD_MENU"] = "addMenu";
    Mutations["SET_PASSWORD"] = "setPassword";
    Mutations["SET_ERROR"] = "setError";
    Mutations["SET_BRANCHES"] = "setBranches";
    Mutations["SET_BREADCRUMB_MUTATION"] = "setBreadcrumbMutation";
    Mutations["SET_LAYOUT_CONFIG"] = "setLayoutConfig";
    Mutations["RESET_LAYOUT_CONFIG"] = "resetLayoutConfig";
    Mutations["OVERRIDE_LAYOUT_CONFIG"] = "overrideLayoutConfig";
    Mutations["OVERRIDE_PAGE_LAYOUT_CONFIG"] = "overridePageLayoutConfig";
})(Mutations || (Mutations = {}));
export { Actions, Mutations };
//# sourceMappingURL=StoreEnums.js.map