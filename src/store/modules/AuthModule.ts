import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
  api_key: {
    plainTextToken: string;
  };
  user: {
    name: string;
    email: string;
    created_at: string;
    menu_id: string;
    id: string;
  };
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    console.log("isAuthenticated", this.isAuthenticated);
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = error;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.user = user;
    this.errors = {};
    JwtService.saveToken(user.api_key.plainTextToken);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  // @Mutation
  // [Mutations.SET_PASSWORD](password) {
  //   this.user.password = password;
  // }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action({ rawError: true })
  [Actions.LOGIN](credentials) {
    return ApiService.post("login", credentials)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_AUTH, data);
        const userData = JSON.stringify(data);
        window.localStorage.setItem("UserData", userData);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response?.status);
      });
  }

  @Action({ rawError: true })
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  // @Action
  // [Actions.REGISTER](credentials) {
  //   return ApiService.post("register", credentials)
  //     .then(({ data }) => {
  //       this.context.commit(Mutations.SET_AUTH, data);
  //     })
  //     .catch(({ response }) => {
  //       this.context.commit(Mutations.SET_ERROR, response.data.errors);
  //     });
  // }

  // @Action
  // [Actions.FORGOT_PASSWORD](payload) {
  //   return ApiService.post("forgot_password", payload)
  //     .then(() => {
  //       this.context.commit(Mutations.SET_ERROR, {});
  //     })
  //     .catch(({ response }) => {
  //       this.context.commit(Mutations.SET_ERROR, response.data.errors);
  //     });
  // }
}
