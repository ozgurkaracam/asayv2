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
        <h3 class="fw-bolder m-0">Harita</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">test</div>
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
import requestt from "@/core/data/requestt";
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
      locations: [],
    };
  },
  created() {
    this.getCities();
    this.getAllBranches();
  },
  watch: {},
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
    setCurrentPageBreadcrumbs("Harita");
    this.loading = true;
    requestt
      .get("harita")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log("hata var.");
      });
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
