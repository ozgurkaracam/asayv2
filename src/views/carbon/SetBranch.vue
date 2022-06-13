<template>
  <!--begin::details View-->
  <div class="card mb-4 mb-xl-9" id="kt_carbon_data_input">
    <vue-element-loading
      :active="loading"
      spinner="ring"
      color="#FF6700"
      text="Lütfen bekleyiniz..."
    />
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Şube Tanımlama</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7 justify-content-center">
        <!--begin::Label-->

        <div class="col-lg-5">
          <label class="fw-bold text-muted">Şube Adı</label>
          <select class="form-control" v-model="selectedBranch">
            <option v-for="i in branchList.data" :key="i._id" :value="i._id">
              {{ i.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted"> Şube Tipi </label>
          <input type="text" v-model="branchType" class="form-control" />
        </div>
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <!--begin::Col-->
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Şube Tipi 2</label>
          <select class="form-control" v-model="selectedBranchType">
            <option value="Satış">Satış</option>
            <option value="Teknik">Teknik</option>
            <option value="Cep">Cep</option>
            <option value="Std">Std</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Asansör Sayısı</label>
          <input type="text" v-model="numberOfElevators" class="form-control" />
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Yürüyen Merdiven Sayısı</label>
          <input
            type="text"
            v-model="numberOfEscalators"
            class="form-control"
          />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Aydınlatma Tipi</label>
          <input type="text" v-model="lightingType" class="form-control" />
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Isıtma Tipi</label>
          <input type="text" v-model="heatingType" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Soğutma Tipi</label>
          <input type="text" v-model="coolingType" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">İklim Referans</label>
          <input type="text" v-model="climateReference" class="form-control" />
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7 text-right">
        <div class="col-lg-11 btnSaveData">
          <button type="button" class="btn btn-primary" @click="submit">
            Veri Gir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import cities from "@/core/data/cities";
import axios from "axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default {
  name: "account-overview",
  components: {},
  data() {
    return {
      selectedCity: null,
      citiesAndDistricts: [],
      branchList: null,
      loading: null,
      latitude: null,
      longitude: null,
      selectedBranch: null,
      selectedBranchType: null,
      selectedType: null,
      coolingType: null,
      numberOfElevators: null,
      numberOfEscalators: null,
      climateReference: null,
      heatingType: null,
      branchType: null,
      lightingType: null,
    };
  },
  created() {
    this.getCities();
    this.getAllBranches();
  },
  methods: {
    getAllBranches() {
      this.branchList = JSON.parse(
        window.localStorage.getItem("AllBranches") || "{}"
      );
    },
    getCities() {
      this.citiesAndDistricts = cities;
    },
    checkAllFields() {
      if (
        this?.selectedBranch &&
        this?.branchType &&
        this?.selectedBranchType &&
        this?.numberOfElevators &&
        this?.numberOfEscalators &&
        this?.climateReference &&
        this?.heatingType &&
        this?.branchType &&
        this?.lightingType
      ) {
        return true;
      } else return false;
    },
    submit() {
      let data = {
        branch_id: this.selectedBranch,
        branct_type_two: this.selectedBranchType,
        cooling_type: this.coolingType,
        number_of_elevators: this.numberOfElevators,
        number_of_escalators: this.numberOfEscalators,
        climate_reference: this.climateReference,
        heating_type: this.heatingType,
        branch_type: this.branchType,
        lighting_type: this.lightingType,
      };
      if (this.checkAllFields()) {
        this.loading = true;
        axios
          .post("carbons", data, {
            headers: {
              Authorization: `Bearer ${JwtService.getToken()}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response?.data) {
              this.loading = false;
              Swal.fire({
                title: "İşlem Başarılı",
                text: "Veriler başarılı bir şekilde kaydedilmiştir.",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-light-primary",
                },
              }).then(function () {
                window.location.reload();
              });
            }
          });
      } else {
        Swal.fire({
          title: "Dikkat",
          text: "İşleme devam edebilmeniz için tüm alanları doldurmanız gerekmektedir.",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Tamam",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    },
  },
  mounted() {
    setCurrentPageBreadcrumbs("Şube Tanımlama", ["Karbon Ayak İzi"]);
  },
};
</script>

<style scoped>
@media only screen and (max-width: 991px) {
  .subBlock,
  .innerBlock {
    margin-top: 5%;
  }
  .btnSaveData {
    margin-top: 3%;
  }
}
@media only screen and (min-width: 992px) {
  .btnSaveData {
    margin-top: 3%;
  }
}
@media only screen and (min-width: 1500px) {
  .btnSaveData {
    margin-top: 2%;
  }
}
</style>
