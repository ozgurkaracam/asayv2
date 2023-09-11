import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
// import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });
import ApiModule from "@/store/modules/ApiModule";
import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
config.rawError = true;
var store = createStore({
    modules: {
        AuthModule: AuthModule,
        BodyModule: BodyModule,
        BreadcrumbsModule: BreadcrumbsModule,
        ConfigModule: ConfigModule,
        ApiModule: ApiModule,
    },
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: (key) => ls.get(key),
    //       setItem: (key, value) => ls.set(key, value),
    //       removeItem: (key) => ls.remove(key),
    //     },
    //   }),
    // ],
});
export default store;
//# sourceMappingURL=index.js.map