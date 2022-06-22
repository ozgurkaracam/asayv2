<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          <!--          <input-->
          <!--            type="text"-->
          <!--            v-model="search"-->
          <!--            @input="searchItems()"-->
          <!--            class="form-control form-control-solid w-250px ps-15"-->
          <!--            placeholder="Search Customers"-->
          <!--          />-->
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="checkedCustomers.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <!-- <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr078.svg" />
            </span>
            Dışarı Aktar
          </button> -->
          <!--end::Export-->
          <!--begin::Add customer-->
          <router-link :to="'/modemler/modem-ekle'" class="btn btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            Modem Ekle
          </router-link>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span class="me-2">{{ checkedCustomers.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewCustomers()"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bolder me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <vue-element-loading
        :active="loading"
        spinner="ring"
        color="#FF6700"
        text="Lütfen bekleyiniz..."
      />
      <template v-if="modems.length > 0">
        <Datatable
          :table-data="modems"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="true"
        >
          <template v-slot:cell-checkbox="{ row: customer }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="customer.id"
                v-model="checkedCustomers"
              />
            </div>
          </template>
          <template v-slot:cell-name="{ row: customer }">
            {{ customer.name }}
          </template>
          <template v-slot:cell-branches="{ row: customer }">
            {{ customer.branches.map((br) => br.name).join(",") }}
          </template>
          <template v-slot:cell-serino="{ row: customer }">
            {{ customer.serino }}
          </template>
          <template v-slot:cell-msisdn="{ row: customer }">
            {{ customer.msisdn }}
          </template>
        </Datatable>
      </template>
    </div>
  </div>

  <AddUserModal></AddUserModal>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import AddUserModal from "@/components/modals/forms/AddUserModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import store from "@/store";
import axios from "axios";
import JwtService from "@/core/services/JwtService";
export default {
  name: "user-list",
  components: {
    Datatable,
    AddUserModal,
  },
  data() {
    return {
      checkedCustomers: [],
      modems: [],
      users: [],
      loading: false,
      tableHeader: [
        // {
        //   key: "checkbox",
        //   sortable: false,
        // },
        {
          name: "Adı",
          key: "name",
          sortable: true,
        },
        {
          name: "Şubeler",
          key: "branches",
          sortable: true,
        },
        {
          name: "Seri Numarası",
          key: "serino",
          sortable: true,
        },
        {
          name: "MSISDN",
          key: "serino",
          sortable: true,
        },
      ],
      search: "",
    };
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("modems", {
          headers: {
            Authorization: `Bearer ${JwtService.getToken()}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.modems = res.data.data;
          console.log(this.modems, "modems");
        })
        .catch((err) => {
          alert();
        })
        .finally((res) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getData();
    const users = JSON.parse(window.localStorage.getItem("AllUsers") || "{}");
    users.forEach((value) => {
      const dateTime = new Date(value.created_at);
      value.created_at = dateTime.toLocaleString();
    });
    setCurrentPageBreadcrumbs("Modem İşlemleri", []);
  },
};
</script>
