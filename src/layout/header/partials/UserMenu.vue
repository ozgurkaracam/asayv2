<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <!--    <div class="menu-item px-3">-->
    <!--      <div class="menu-content d-flex align-items-center px-3">-->
    <!--        &lt;!&ndash;begin::Avatar&ndash;&gt;-->
    <!--        &lt;!&ndash;        <div class="symbol symbol-50px me-5">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <img alt="Logo" src="media/avatars/300-1.jpg" />&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--        &lt;!&ndash;end::Avatar&ndash;&gt;-->

    <!--        &lt;!&ndash;begin::Username&ndash;&gt;-->
    <!--        &lt;!&ndash;        <div class="d-flex flex-column">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <div class="fw-bolder d-flex align-items-center fs-5">&ndash;&gt;-->
    <!--        &lt;!&ndash;            {{ userData.user.name }}&ndash;&gt;-->
    <!--        &lt;!&ndash;            &lt;!&ndash; <span&ndash;&gt;-->
    <!--        &lt;!&ndash;              class="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2"&ndash;&gt;-->
    <!--        &lt;!&ndash;              >Pro</span&ndash;&gt;-->
    <!--        &lt;!&ndash;            > &ndash;&gt;&ndash;&gt;-->
    <!--        &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--        &lt;!&ndash;          <a href="#" class="fw-bold text-muted text-hover-primary fs-7">{{&ndash;&gt;-->
    <!--        &lt;!&ndash;            userData.user.email&ndash;&gt;-->
    <!--        &lt;!&ndash;          }}</a>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--        &lt;!&ndash;end::Username&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <!--    <div class="separator my-2"></div>-->
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <!--    <div class="menu-item px-5">-->
    <!--      <router-link to="/profile/overview" class="menu-link px-5">-->
    <!--        Profil-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!--    <div class="menu-item px-5">-->
    <!--      <router-link to="/profile/projects" class="menu-link px-5">-->
    <!--        <span class="menu-text">Projelerim</span>-->
    <!--        <span class="menu-badge">-->
    <!--          <span class="badge badge-light-danger badge-circle fw-bolder fs-7"-->
    <!--            >3</span-->
    <!--          >-->
    <!--        </span>-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-title">My Subscription</span>
        <span class="menu-arrow"></span>
      </router-link>

      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Referrals
          </router-link>
        </div>
        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Billing
          </router-link>
        </div>
        <div class="menu-item px-3">
          <router-link to="/pages/profile/overview" class="menu-link px-5">
            Payments
          </router-link>
        </div>
        <div class="menu-item px-3">
          <router-link
            to="/pages/profile/overview"
            class="menu-link d-flex flex-stack px-5"
          >
            Statements

            <i
              class="fas fa-exclamation-circle ms-2 fs-7"
              data-bs-toggle="tooltip"
              title="View your statements"
            ></i>
          </router-link>
        </div>
        <div class="separator my-2"></div>
        <div class="menu-item px-3">
          <div class="menu-content px-3">
            <label
              class="form-check form-switch form-check-custom form-check-solid"
            >
              <input
                class="form-check-input w-30px h-20px"
                type="checkbox"
                value="1"
                checked="checked"
                name="notifications"
              />
              <span class="form-check-label text-muted fs-7">
                Notifications
              </span>
            </label>
          </div>
        </div>
      </div>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        My Statements
      </router-link>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <!--    <div class="separator my-2"></div>-->
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <!-- <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <span class="menu-title position-relative">
          Language
          <span
            class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
          >
            {{ currentLangugeLocale.name }}
            <img
              class="w-15px h-15px rounded-1 ms-2"
              :src="currentLangugeLocale.flag"
              alt="metronic"
            />
          </span>
        </span>
      </router-link>

      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <div class="menu-item px-3">
          <a
            @click="setLang('en')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('en') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/united-states.svg"
                alt="metronic"
              />
            </span>
            English
          </a>
        </div>
        <div class="menu-item px-3">
          <a
            @click="setLang('es')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('es') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/spain.svg"
                alt="metronic"
              />
            </span>
            Spanish
          </a>
        </div>
        <div class="menu-item px-3">
          <a
            @click="setLang('de')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('de') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/germany.svg"
                alt="metronic"
              />
            </span>
            German
          </a>
        </div>
        <div class="menu-item px-3">
          <a
            @click="setLang('ja')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('ja') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/japan.svg"
                alt="metronic"
              />
            </span>
            Japanese
          </a>
        </div>
        <div class="menu-item px-3">
          <a
            @click="setLang('fr')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('fr') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/france.svg"
                alt="metronic"
              />
            </span>
            French
          </a>
        </div>
      </div>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-5 my-1">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        Account Settings
      </router-link>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Oturumu Kapat </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useStore();
    const user = JSON.parse(window.localStorage.getItem("UserData") || "{}");
    const userData = user;
    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "media/flags/france.svg",
        name: "French",
      },
    };

    const signOut = () => {
      store
        .dispatch(Actions.LOGOUT)
        .then(() => router.push({ name: "sign-in" }));
    };

    const setLang = (lang) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = (lang) => {
      return i18n.locale.value === lang;
    };

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      userData,
    };
  },
});
</script>
