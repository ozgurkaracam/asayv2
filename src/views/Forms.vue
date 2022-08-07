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
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <vue-element-loading
        :active="loading"
        spinner="ring"
        color="#FF6700"
        text="Lütfen bekleyiniz..."
      />
      <template v-if="questions.length > 0">
        <Datatable
          :table-data="questions"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="true"
        >
          <template v-slot:cell-_id="{ row: form }">
            {{ form._id }}
          </template>
          <template v-slot:cell-totalPoint="{ row: form }">
            {{ form.totalPoint }}
          </template>
          <template v-slot:cell-packet="{ row: form }">
            {{ form.packet }}
          </template>
          <template v-slot:cell-created_at="{ row: form }">
            {{ moment(form.created_at).format("DD-MM-YYYY HH:mm:ss") }}
          </template>
          <template v-slot:cell-details="{ row: form }">
            <button
              @click="seeDetails(form._id)"
              class="btn btn-info btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_add_customer"
            >
              <i class="fa fa-eye"></i>
            </button>
          </template>
        </Datatable>
      </template>
    </div>
  </div>

  <DetailForm
    :selectedFormId="selectedFormId"
    :selected-form="selectedForm"
    :loading="modalLoading"
  ></DetailForm>
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
import moment from "moment";
import DetailForm from "@/components/forms/DetailForm";
export default {
  name: "user-list",
  components: {
    Datatable,
    DetailForm,
  },
  data() {
    return {
      checkedCustomers: [],
      selectedFormId: "",
      selectedForm: null,
      questions: [],
      users: [],
      moment: moment,
      loading: false,
      modalLoading: true,
      tableHeader: [
        {
          name: "Teklif Numarası",
          key: "_id",
          sortable: true,
        },
        {
          name: "Toplam Puan",
          key: "totalPoint",
          sortable: true,
        },
        {
          name: "Önerilen Paket",
          key: "packet",
          sortable: true,
        },
        {
          name: "Teklif Tarihi",
          key: "created_at",
          sortable: true,
        },
        {
          name: "DETAY",
          key: "details",
          sortable: false,
        },
      ],
      search: "",
    };
  },
  methods: {
    seeDetails(id) {
      this.selectedFormId = id;
      this.modalLoading = true;
      axios
        .get(`/questions/${this.selectedFormId}`, {
          headers: {
            Authorization: `Bearer ${JwtService.getToken()}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.selectedForm = res.data.data;
        })
        .finally((res) => {
          this.modalLoading = false;
        });
    },
    getData() {
      this.loading = true;
      axios
        .get("questions", {
          headers: {
            Authorization: `Bearer ${JwtService.getToken()}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.questions = res.data.data;
          console.log(this.questions, "questions");
        })
        .catch((err) => {
          console.log(err);
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
    setCurrentPageBreadcrumbs("Teklif Formları", []);
  },
};
</script>
