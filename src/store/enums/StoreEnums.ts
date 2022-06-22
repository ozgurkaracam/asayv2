enum Actions {
  // action types
  ADD_BODY_CLASSNAME = "addBodyClassName",
  REMOVE_BODY_CLASSNAME = "removeBodyClassName",
  ADD_BODY_ATTRIBUTE = "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE = "removeBodyAttribute",
  ADD_CLASSNAME = "addClassName",
  VERIFY_AUTH = "verifyAuth",
  GET_ALL_MENUS = "menu",
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  UPDATE_USER = "updateUser",
  FORGOT_PASSWORD = "forgotPassword",
  SET_BREADCRUMB_ACTION = "setBreadcrumbAction",
  GET_ALL_USERS = "users",
  ADD_USER = "users",
  ADD_MENU = "users/addmenu",
  GET_BRANCHES = "branches",
  GET_CURRENT_USER = "getCurrentUser",
  GET_CITIES = "getCities",
  GET_DISTRICTS = "getDistricts",
}

enum Mutations {
  // mutation types
  SET_CLASSNAME_BY_POSITION = "appendBreadcrumb",
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_ALL_MENUS = "setMenus",
  SET_ALL_USERS = "setAllUsers",
  ADD_USER = "addUser",
  ADD_MENU = "addMenu",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",
  SET_BRANCHES = "setBranches",
  SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",
}

export { Actions, Mutations };
