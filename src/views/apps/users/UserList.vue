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
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers"
          />
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
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotone/Navigation/Plus.svg" />
            </span>
            Kullanıcı Ekle
          </button>
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
      <Datatable
        :table-data="users"
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
        <template v-slot:cell-email="{ row: customer }">
          {{ customer.email }}
        </template>
        <template v-slot:cell-owner_id="{ row: customer }">
          {{ customer.owner_id }}
        </template>
        <template v-slot:cell-created_at="{ row: customer }">
          {{ customer.created_at }}
        </template>
        <!-- <template v-slot:cell-actions="{ row: customer }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <div class="menu-item px-3">
              <router-link
                to="/apps/customers/customer-details"
                class="menu-link px-3"
                >View</router-link
              >
            </div>
            <div class="menu-item px-3">
              <a @click="deleteCustomer(customer.id)" class="menu-link px-3"
                >Delete</a
              >
            </div>
          </div>
        </template> -->
      </Datatable>
    </div>
  </div>

  <AddUserModal></AddUserModal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import AddUserModal from "@/components/modals/forms/AddUserModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "user-list",
  components: {
    Datatable,
    AddUserModal,
  },
  setup() {
    const checkedCustomers = ref([]);
    const store = useStore();
    const tableHeader = ref([
      // {
      //   key: "checkbox",
      //   sortable: false,
      // },
      {
        name: "İsim",
        key: "name",
        sortable: true,
      },
      {
        name: "Email",
        key: "email",
        sortable: true,
      },
      {
        name: "Oluşturan",
        key: "owner_id",
        sortable: true,
      },
      // {
      //   name: "Payment Method",
      //   key: "paymentMethod",
      //   sortingField: "payment.label",
      //   sortable: true,
      // },
      {
        name: "Oluşturma Tarihi",
        key: "created_at",
        sortable: true,
      },
      // {
      //   name: "Actions",
      //   key: "actions",
      // },
    ]);
    const users = JSON.parse(window.localStorage.getItem("AllUsers") || "{}");
    users.forEach((value) => {
      const dateTime = new Date(value.created_at);
      value.created_at = dateTime.toLocaleString();
    });
    onMounted(() => {
      setCurrentPageBreadcrumbs("Kullanıcı İşlemleri", []);
    });

    // const deleteFewCustomers = () => {
    //   checkedCustomers.value.forEach((item) => {
    //     deleteCustomer(item);
    //   });
    //   checkedCustomers.value.length = 0;
    // };

    // const deleteCustomer = (id) => {
    //   for (let i = 0; i < tableData.value.length; i++) {
    //     if (tableData.value[i].id === id) {
    //       tableData.value.splice(i, 1);
    //     }
    //   }
    // };

    const search = ref<string>("");
    // const searchItems = () => {
    //   tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
    //   if (search.value !== "") {
    //     let results: Array<ICustomer> = [];
    //     for (let j = 0; j < tableData.value.length; j++) {
    //       if (searchingFunc(tableData.value[j], search.value)) {
    //         results.push(tableData.value[j]);
    //       }
    //     }
    //     tableData.value.splice(0, tableData.value.length, ...results);
    //   }
    // };

    // const searchingFunc = (obj, value): boolean => {
    //   for (let key in obj) {
    //     if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
    //       if (obj[key].indexOf(value) != -1) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // };

    return {
      users,
      tableHeader,
      // deleteCustomer,
      search,
      // searchItems,
      checkedCustomers,
      // deleteFewCustomers,
    };
  },
});
</script>
