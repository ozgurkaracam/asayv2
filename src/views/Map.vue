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
      <div class="card-title m-0 d-flex">
        <h3 class="fw-bolder m-0">Harita</h3>
        <button
          class="btn btn-primary btn-sm float-right ml-5"
          @click="
            allOpened = !allOpened;

            locations = locations.map((l) => {
              return { ...l, opened: allOpened };
            });
          "
        >
          İsimleri Göster/Gizle
        </button>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <GMapMap
        :center="{ lat: 39.925533, lng: 32.866287 }"
        :zoom="6"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <GMapMarker
          @click="m.opened = !m.opened"
          :position="m.position"
          :key="index"
          :scaledSize="{ height: 70, width: 70 }"
          :icon="{
            url: m.connection
              ? iconGreen
              : 'https://cdn2.iconfinder.com/data/icons/danger-problems-2/512/xxx013-512.png',
            scaledSize: {
              width: 25,
              height: m.connection ? 40 : 30,
            },
          }"
          v-for="(m, index) in locations"
        >
          <GMapInfoWindow :opened="m.opened" @click="goDetail(m._id)">
            <div style="cursor: pointer" class="text-primary">
              {{ m.name }} -
              {{
                !m.connection
                  ? `Bağlantı Yok - Son Tarih: ${moment(
                      m.connection_down_time
                    ).format("DD-MM-YYYY HH:mm:ss")}`
                  : "Bağlantı Var"
              }}
            </div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>
  </div>
</template>

<script>
import iconGreen from "@/assets/icon_green.svg";
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
import moment from "moment";
export default {
  name: "account-overview",
  components: {},
  data() {
    return {
      region_id: null,
      allOpened: false,
      branchName: "",
      selectedCity: null,
      iconGreen,
      citiesAndDistricts: [],
      branchList: null,
      loading: null,
      latitude: null,
      longitude: null,
      moment,
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
      markers: [],
    };
  },
  created() {
    this.getCities();
    this.getAllBranches();
  },
  watch: {},
  methods: {
    goDetail(id) {
      this.$router.push("/museums/" + id);
    },
    getAllBranches() {
      this.branchList = JSON.parse(
        window.localStorage.getItem("AllBranches") || "{}"
      );
    },
    getCities() {
      this.loading = true;
      axios.get("https://elwiot.com/api/cities").then((res) => {
        this.cities = res.data.cities;
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
        this.loading = false;
        this.locations = res.data.data.map((re) => {
          let te = {
            ...re,
            opened: false,
            position: {
              lat: parseFloat(re.latitude),
              lng: parseFloat(re.longitude),
            },
          };
          return te;
        });
        console.log(this.markers);
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
