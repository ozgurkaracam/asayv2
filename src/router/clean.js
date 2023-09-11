import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";
var routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: function () { return import("@/layout/Layout.vue"); },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: function () { return import("@/views/Dashboard.vue"); },
            },
        ],
    },
    {
        path: "/",
        component: function () { return import("@/components/page-layouts/Auth.vue"); },
        children: [
            {
                path: "/sign-in",
                name: "sign-in",
                component: function () {
                    return import("@/views/crafted/authentication/basic-flow/SignIn.vue");
                },
            },
            {
                path: "/sign-up",
                name: "sign-up",
                component: function () {
                    return import("@/views/crafted/authentication/basic-flow/SignUp.vue");
                },
            },
            {
                path: "/password-reset",
                name: "password-reset",
                component: function () {
                    return import("@/views/crafted/authentication/basic-flow/PasswordReset.vue");
                },
            },
        ],
    },
    {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: function () { return import("@/views/crafted/authentication/Error404.vue"); },
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];
var router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});
router.beforeEach(function () {
    // reset config to initial state
    store.commit(Mutations.RESET_LAYOUT_CONFIG);
    store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });
    // Scroll page to top on every route change
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 100);
});
export default router;
//# sourceMappingURL=clean.js.map