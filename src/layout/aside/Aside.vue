<template>
  <!--begin::Aside-->
  <div
    id="kt_aside"
    class="aside aside-hoverable"
    :class="[
      asideTheme === 'light' && 'aside-light',
      asideTheme === 'dark' && 'aside-dark',
    ]"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_mobile_toggle"
  >
    <!--begin::Brand-->
    <div class="aside-logo flex-column-auto" id="kt_aside_logo">
      <!--begin::Logo-->
      <router-link to="/anasayfa">
        <!-- <img
          v-if="asideTheme === 'dark'"
          alt="Logo"
          src="../../../public/media/logos/logo-light.png"
          class="logo"
          width="150"
        />
        <img
          v-else
          alt="Logo"
          src="../../../public/media/logos/logo-dark.png"
          class="logo"
        /> -->
      </router-link>
      <!--      <a href="/anasayfa" v-if="asideTheme === 'dark'"> </a>-->
      <!--      <a href="/anasayfa" v-if="asideTheme === 'light'">-->
      <!--        <img-->
      <!--          alt="Logo"-->
      <!--          src="../../../public/media/logos/logo-dark.png"-->
      <!--          class="logo"-->
      <!--        />-->
      <!--      </a>-->
      <!--end::Logo-->

      <!--begin::Aside toggler-->
      <div
        id="kt_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
      >
        <span class="svg-icon svg-icon-1 rotate-180">
          <inline-svg src="media/icons/duotune/arrows/arr080.svg" />
        </span>
      </div>
      <!--end::Aside toggler-->
    </div>
    <!--end::Brand-->

    <!--begin::Aside menu-->
    <div class="aside-menu flex-column-fluid">
      <KTMenu></KTMenu>
    </div>
    <!--end::Aside menu-->
  </div>
  <!--end::Aside-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n/index";
import KTMenu from "@/layout/aside/Menu.vue";
import { asideTheme } from "@/core/helpers/config";

export default defineComponent({
  name: "KTAside",
  components: {
    KTMenu,
  },
  props: {
    lightLogo: String,
    darkLogo: String,
  },
  setup() {
    const { t } = useI18n();

    return {
      asideTheme,
      t,
    };
  },
});
</script>
