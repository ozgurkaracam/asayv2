<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::User-->
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <!--begin::Menu-->
      <!-- <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <img src="media/avatars/300-1.jpg" alt="metronic" />
      </div> -->
      <div
        class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
        id="kt_quick_user_toggle"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <span
          class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1"
          >Merhaba,</span
        >
        <span
          class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3"
          >{{ userData.user.name }}</span
        >
        <span class="symbol symbol-lg-35 symbol-25 symbol-light-success">
          <img :src="userData.user.image" alt="" v-if="userData.user.image" />
          <span class="symbol-label font-size-h5 font-weight-bold" v-else>{{
            userData.user.name.slice(0, 1).toUpperCase()
          }}</span>
        </span>
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->

    <!--begin::Heaeder menu toggle-->
    <!-- <div
      class="d-flex align-items-center d-lg-none ms-2 me-n3"
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        id="kt_header_menu_mobile_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div> -->
    <!--end::Heaeder menu toggle-->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";

export default defineComponent({
  name: "topbar",
  components: {
    KTUserMenu,
  },
  data() {
    return {
      userData: [],
    };
  },
  created() {
    const user = JSON.parse(window.localStorage.getItem("UserData") || "{}");
    this.userData = user;
  },
});
</script>
