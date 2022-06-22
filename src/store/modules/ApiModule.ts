import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import axios from "axios";

export interface Menu {
  _id: string;
  name: string;
  created_at: string;
}

export interface MenuInfo {
  errors: unknown;
  callMenus: Menu;
}

@Module
export default class ApiModule extends VuexModule implements MenuInfo {
  errors = {};
  callMenus = {} as Menu;
  allUsers = {};
  getBranches = {};
  addUserHeader = {
    headers: {
      Authorization: `Bearer ${JwtService.getToken()}`,
      Accept: "application/json",
    },
  };

  get getAllBranches() {
    return this.getBranches;
  }

  get getAllMenus() {
    return this.callMenus;
  }

  @Mutation
  [Mutations.SET_ALL_MENUS](callMenus) {
    this.callMenus = callMenus;
  }

  @Mutation
  [Mutations.SET_ALL_USERS](data) {
    this.allUsers = data;
  }

  @Mutation
  [Mutations.ADD_USER](data) {
    this.addUser = data;
  }
  @Mutation
  [Mutations.SET_BRANCHES](data) {
    this.getBranches = data.data;
  }

  @Action({ rawError: true })
  [Actions.GET_ALL_MENUS]() {
    return ApiService.query("menu", {
      headers: {
        Authorization: `Bearer ${JwtService.getToken()}`,
        Accept: "application/json",
      },
    }).then(({ data }) => {
      this.context.commit(Mutations.SET_ALL_MENUS, data);
      const allMenus = JSON.stringify(data);
      window.localStorage.setItem("AllMenus", allMenus);
    });
  }

  @Action({ rawError: true })
  [Actions.GET_ALL_USERS]() {
    return ApiService.query("users", {
      headers: {
        Authorization: `Bearer ${JwtService.getToken()}`,
        Accept: "application/json",
      },
    }).then(({ data }) => {
      this.context.commit(Mutations.SET_ALL_USERS, data);
      const allUsers = JSON.stringify(data);
      window.localStorage.setItem("AllUsers", allUsers);
    });
  }
  @Action({ rawError: true })
  [Actions.GET_BRANCHES]() {
    return ApiService.query("branches", {
      headers: {
        Authorization: `Bearer ${JwtService.getToken()}`,
        Accept: "application/json",
      },
    }).then(({ data }) => {
      this.context.commit(Mutations.SET_BRANCHES, data);
      const allBranches = JSON.stringify(data);
      window.localStorage.setItem("AllBranches", allBranches);
    });
  }
}
