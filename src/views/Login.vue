<template>
  <!--begin::Wrapper-->
  <div class="kt-grid kt-grid--ver kt-grid--root">
    <div
      class="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v4 kt-login--signin"
      id="kt_login"
    >
      <div
        class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
        style="
          background-image: url('https://portal.enerclever.com/assets/media/bg/bg-2.jpg');
        "
      >
        <div class="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
          <div class="kt-login__container">
            <div class="kt-login__logo">
              <a href="#">
                <img src="https://portal.enerclever.com/logo.png" />
              </a>
            </div>

            <div class="kt-login__signin">
              <div class="kt-login__head">
                <h3 class="kt-login__title">Giriş Yapın</h3>
              </div>

              <Form class="kt-form" id="loginForm" :validation-schema="login">
                <!--                <div class="input-group">-->
                <!--                  <div class="input-group">-->
                <!--                    <input-->
                <!--                      type="text"-->
                <!--                      id="email"-->
                <!--                      name="email"-->
                <!--                      placeholder="Email"-->
                <!--                      class="form-control kt-font-light"-->
                <!--                      autocomplete="off"-->
                <!--                      data-val="true"-->
                <!--                      data-val-required="Email girilmesi zorunludur."-->
                <!--                      required-->
                <!--                    />-->
                <!--                  </div>-->
                <!--                </div>-->
                <Field
                  class="form-control kt-font-light"
                  type="text"
                  name="email"
                  v-model="emaill"
                  placeholder="Email"
                  autocomplete="off"
                />
                <div class="input-group">
                  <div class="input-group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      v-model="password"
                      placeholder="Şifre"
                      class="form-control kt-font-light"
                      autocomplete="off"
                      data-val="true"
                      data-val-required="Şifre girilmesi zorunludur."
                      required
                    />
                  </div>
                </div>

                <div class="kt-login__actions">
                  <button
                    id="kt_login_signin_submit"
                    type="submit"
                    ref="submitButton"
                    class="btn btn-brand btn-pill kt-login__btn-primary"
                    @click="onSubmitLogin"
                  >
                    Giriş Yap
                    <span class="indicator-progress">
                      Lütfen Bekleyiniz...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--end::Wrapper-->
</template>
<style scoped>
@import "../../public/cssvodafone/pages/general/login/login-4.css";
@import "../../public/cssvodafone/style.bundle.css";
@import "../../public/cssvodafone/skins/header/base/light.css";
@import "../../public/cssvodafone/skins/header/menu/light.css";
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    const emaill = ref<string>("");
    const password = ref<string>("");

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().required().label("Text"),
      password: Yup.string().required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.dispatch(Actions.LOGIN, {
        email: emaill.value,
        password: password.value,
      });
      const error = store.getters.getErrors;
      let email = "test";
      if (error != "404") {
        Swal.fire({
          title: "Giriş Başarılı!",
          text: "Kullanıcı bilgileriniz doğrulanmıştır, Lütfen Bekleyiniz",
          icon: "success",
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
        });
        await store.dispatch(Actions.GET_ALL_MENUS);
        if (emaill.value == "bhm.teklif") {
          router.push({ name: "Anket" });
        } else if (emaill.value == "bhm.admin") {
          router.push({ name: "Teklif Formları" });
        } else router.push({ name: "anasayfa" });
      } else {
        Swal.fire({
          title: "Giriş Başarısız!",
          text: "Lütfen bilgilerinizi tekrar kontrol ediniz.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Tekrar dene!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      emaill,
      password,
    };
  },
});
</script>
