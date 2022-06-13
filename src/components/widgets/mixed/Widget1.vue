<template>
  <!--begin::List Widget 1-->
  <!--begin::List Widget 10-->
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title font-weight-bolder text-dark">Bildirimler</h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <!-- <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg" />
          </span>
        </button> -->
        <!-- <Dropdown3></Dropdown3> -->
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-0">
      <!--begin::Item-->
      <div class="mb-6">
        <!--begin::Content-->
        <div class="d-flex align-items-center flex-grow-1">
          <!--begin::Checkbox-->
          <label class="checkbox checkbox-lg checkbox-lg flex-shrink-0 mr-4">
            <input type="checkbox" value="1" />
            <span></span>
          </label>
          <!--end::Checkbox-->
          <!--begin::Section-->
          <div
            class="d-flex flex-wrap align-items-center justify-content-between w-100"
          >
            <!--begin::Info-->
            <div class="d-flex flex-column align-items-cente py-2 w-75">
              <!--begin::Title-->
              <a
                href="#"
                class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >Sıcaklık 25 C üzerinde.</a
              >
              <!--end::Title-->
              <!--begin::Data-->
              <span
                class="text-muted font-weight-bold"
                style="color: red !important"
                >18.12.2021 15:32</span
              >
              <span class="text-muted font-weight-bold">Sıcaklığı düşür.</span>
              <!--end::Data-->
            </div>
            <!--end::Info-->
            <!--begin::Label-->
            <span
              class="label label-lg label-light-primary label-inline font-weight-bold py-4"
              >Müdahale Edildi</span
            >
            <!--end::Label-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Item-->
      <!--begin::Item-->
      <div class="mb-6">
        <!--begin::Content-->
        <div class="d-flex align-items-center flex-grow-1">
          <!--begin::Checkbox-->
          <label class="checkbox checkbox-lg checkbox-lg flex-shrink-0 mr-4">
            <input type="checkbox" value="1" />
            <span></span>
          </label>
          <!--end::Checkbox-->
          <!--begin::Section-->
          <div
            class="d-flex flex-wrap align-items-center justify-content-between w-100"
          >
            <!--begin::Info-->
            <div class="d-flex flex-column align-items-cente py-2 w-75">
              <!--begin::Title-->
              <a
                href="#"
                class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >Elektrik Kesintisi Oluştu.</a
              >
              <!--end::Title-->
              <!--begin::Data-->
              <span
                class="text-muted font-weight-bold"
                style="color: red !important"
                >28.12.2021 15:32</span
              >
              <span class="text-muted font-weight-bold">Sıcaklığı artır.</span>
              <!--end::Data-->
            </div>
            <!--end::Info-->
            <!--begin::Label-->
            <span
              class="label label-lg label-light-warning label-inline font-weight-bold py-4"
              >Müdahale Bekleniyor</span
            >
            <!--end::Label-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Item-->
      <!--begin::Item-->
      <div class="mb-6">
        <!--begin::Content-->
        <div class="d-flex align-items-center flex-grow-1">
          <!--begin::Checkbox-->
          <label class="checkbox checkbox-lg checkbox-lg flex-shrink-0 mr-4">
            <input type="checkbox" value="1" />
            <span></span>
          </label>
          <!--end::Checkbox-->
          <!--begin::Section-->
          <div
            class="d-flex flex-wrap align-items-center justify-content-between w-100"
          >
            <!--begin::Info-->
            <div class="d-flex flex-column align-items-cente py-2 w-75">
              <!--begin::Title-->
              <a
                href="#"
                class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >Kompanzasyon Alarmı Oluştu</a
              >
              <!--end::Title-->
              <!--begin::Data-->
              <span
                class="text-muted font-weight-bold"
                style="color: red !important"
                >22.12.2021 15:15</span
              >
              <span class="text-muted font-weight-bold"
                >Sıcaklık kafasına takılsın.</span
              >
              <!--end::Data-->
            </div>
            <!--end::Info-->
            <!--begin::Label-->
            <span
              class="label label-lg label-light-success label-inline font-weight-bold py-4"
              >Müdahale Bekleniyor</span
            >
            <!--end::Label-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Item-->
      <!--begin::Item-->
      <div class="mb-6">
        <!--begin::Content-->

        <!--end::Content-->
      </div>
      <!--end: Item-->
      <!--begin: Item-->
      <div class="">
        <!--begin::Content-->

        <!--end::Content-->
      </div>
      <!--end: Item-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end: Card-->
  <!--end: List Widget 10-->
  <!--end::List Widget 1-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Dropdown3 from "@/components/dropdown/Dropdown3.vue";

export default defineComponent({
  name: "widget-1",
  components: {
    // Dropdown3,
  },
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: Number,
  },
  setup() {
    const items = [
      {
        icon: "media/icons/duotune/maps/map004.svg",
        title: "Sales",
        description: "100 Regions",
        stats: "$2,5b",
        arrow: "up",
      },
      {
        icon: "media/icons/duotune/general/gen024.svg",
        title: "Revenue",
        description: "Quarter 2/3",
        stats: "$1,7b",
        arrow: "down",
      },
      {
        icon: "media/icons/duotune/electronics/elc005.svg",
        title: "Growth",
        description: "80% Rate",
        stats: "$8,8m",
        arrow: "up",
      },
      {
        icon: "media/icons/duotune/general/gen005.svg",
        title: "Dispute",
        description: "3090 Refunds",
        stats: "$270m",
        arrow: "down",
      },
    ];

    return {
      items,
    };
  },
});
</script>
