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
        <h3 class="fw-bolder m-0">Şube Ekleme</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Şube Adı</label>
          <input type="text" v-model="branchName" class="form-control" />
        </div>

        <div class="d-flex flex-column col-lg-5">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-2">
            <span class="required">Bölge</span>

            <i
              class="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              title="Lütfen Bölge Giriniz"
            ></i>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-select v-model="region_id" placeholder="Lütfen seçim yapınız">
            <el-option
              v-for="item in regions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!--end::Input-->
        </div>
      </div>
      <div class="row mb-7 justify-content-center">
        <!--begin::Label-->
        <div class="d-flex flex-column col-lg-5">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-2">
            <span class="required">İl</span>

            <i
              class="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              title="Lütfen İl Giriniz"
            ></i>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-select v-model="city_id" placeholder="Lütfen seçim yapınız">
            <el-option
              v-for="item in cities"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
          <!--end::Input-->
        </div>
        <div class="d-flex flex-column col-lg-5">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-2">
            <span class="required">İlçe</span>

            <i
              class="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              title="Lütfen İlçe Giriniz"
            ></i>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-select v-model="state_id" placeholder="Lütfen seçim yapınız">
            <el-option
              v-for="item in states"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
          <!--end::Input-->
        </div>
      </div>
      <!--end::Input group-->

      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Enlem</label>
          <input type="text" v-model="latitude" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Boylam</label>
          <input type="text" v-model="longitude" class="form-control" />
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
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store";
import regions from "@/core/data/regions";

export default {
  name: "account-overview",
  components: {},
  data() {
    return {
      region_id: null,
      branchName: "",
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
      cities: [],
      states: [],
      city_id: null,
      state_id: null,
      regions: regions,
    };
  },
  created() {
    this.getCities();
    this.getAllBranches();
  },
  watch: {
    city_id() {
      this.loading = true;
      store
        .dispatch(Actions.GET_DISTRICTS, {
          id: this.city_id,
        })
        .then((districts) => {
          this.states = districts;
          this.loading = false;
        });
    },
  },
  methods: {
    getAllBranches() {
      this.branchList = JSON.parse(
        window.localStorage.getItem("AllBranches") || "{}"
      );
    },
    getCities() {
      this.loading = true;
      useStore()
        .dispatch(Actions.GET_CITIES)
        .then((cities) => {
          this.cities = cities;
          this.loading = false;
        });
    },
    checkAllFields() {
      if (
        this?.branchName &&
        this?.region_id &&
        this?.city_id &&
        this?.state_id &&
        this?.latitude &&
        this?.longitude
      ) {
        return true;
      } else return false;
    },
    submit() {
      let data = {
        name: this.branchName,
        region_id: this.region_id,
        city_id: this.city_id,
        district_id: this.state_id,
        latitude: this.latitude,
        longitude: this.longitude,
      };
      if (this.checkAllFields()) {
        this.loading = true;
        axios
          .post("branches", data, {
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
    setCurrentPageBreadcrumbs("Şube Ekleme");
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
