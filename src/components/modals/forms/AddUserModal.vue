<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addUserModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <vue-element-loading
          :active="loading"
          spinner="ring"
          color="#FF6700"
          text="Lütfen bekleyiniz..."
        />
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Kullanıcı Ekle</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">İsim</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="userData.name"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Email</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Kullanıcının sisteme giriş yapacağı mail adresi"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input v-model="userData.email" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Şifre</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Kullanıcının sisteme giriş yapacağı şifre"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="password">
                  <el-input
                    v-model="userData.password"
                    type="password"
                    show-password
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  <span class="required">Kullanıcıya tanımlanacak menüler</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Kullanıcının işlem yapabileceği menüler buradan tanımlanmaktadır"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-select
                  v-model="selectedMenu"
                  multiple
                  placeholder="Lütfen seçim yapınız"
                  :getMenu="getSelectedMenus"
                >
                  <el-option
                    v-for="item in menuList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  />
                </el-select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <!-- <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button> -->
            <!--end::Button-->

            <!--begin::Button-->
            <button class="btn btn-lg btn-primary" type="submit">
              <span class="indicator-label">
                Kaydet
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import VueElementLoading from "vue-element-loading";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import cryptoJs from "crypto-js";

export default {
  name: "add-customer-modal",
  components: {
    VueElementLoading,
  },
  data() {
    return {
      loading: false,
      selectedMenu: [],
      menuList: [],
      userData: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  created() {
    this.getMenuList();
  },
  computed: {
    getSelectedMenus() {
      if (this?.selectedMenu) {
        console.log("Seçilen Menüler", this.selectedMenu);
        console.log("Seçilen Menüler", typeof this.selectedMenu);
      }
      return this.selectedMenu;
    },
  },
  methods: {
    getMenuList() {
      this.menuList = JSON.parse(
        window.localStorage.getItem("AllMenus") || "{}"
      );
      console.log("MenuList", this.menuList);
    },
    submit() {
      let data = new FormData();
      data.append("email", this.userData.email);
      data.append("password", this.userData.password);
      data.append("name", this.userData.name);
      let menu = new FormData();
      this.loading = true;
      if (
        this.userData?.email &&
        this.userData?.password &&
        this.userData?.name &&
        this.selectedMenu != null
      ) {
        axios
          .post("users", data, {
            headers: {
              Authorization: `Bearer ${JwtService.getToken()}`,
              Accept: "application/json",
            },
          })
          .then((first_response) => {
            if (first_response?.data) {
              menu.append("user_id", first_response.data.user._id);
              menu.append("menu_id", this.selectedMenu);
              axios
                .post("users/addmenu", menu, {
                  headers: {
                    Authorization: `Bearer ${JwtService.getToken()}`,
                    Accept: "application/json",
                  },
                })
                .then((second_response) => {
                  if (second_response?.data) {
                    this.loading = false;
                    Swal.fire({
                      text: "Kullanıcı başarılı şekilde oluşturulmuş ve menüler tanımlanmıştır",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Tamam",
                      customClass: {
                        confirmButton: "btn fw-bold btn-light-primary",
                      },
                    }).then(function () {
                      this.$router.push({ name: "user-list" });
                    });
                  }
                });
            }
          });
      } else {
        this.loading = false;
        Swal.fire({
          text: "Lütfen bilgilerin tamamını doldurduğunuzdan emin olun",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Tamam",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then();
      }
    },
  },
};
</script>
