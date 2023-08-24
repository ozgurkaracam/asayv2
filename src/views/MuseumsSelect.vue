<template>
  <vue-element-loading
    :active="loading"
    spinner="ring"
    color="#FF6700"
    text="Lütfen bekleyiniz..."
  />
  <div class="card">
    <div class="d-flex w-100 m-5 justify-content-around">
      <h3 class="card-title w-75">
        <div class="input-icon input-icon-right">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Arama alanı"
          />
          <span><i class="flaticon2-search-1 icon-md"></i></span>
        </div>
      </h3>
      <div class="card-toolbar my-3">
        <div class="d-flex align-items-center">
          <span
            class="pulse pulse-success bullet bullet-dot bg-success me-2 h-10px w-10px"
          ></span>

          <!--begin::Label-->
          <span class="fw-bold text-gray-600 fs-6">{{ this.myDate }}</span>
          <!--end::Label-->
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table
          class="table table-hover table-rounded table-striped border gy-7 gs-7"
        >
          <thead>
            <tr
              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200"
            >
              <th>Müze İsimleri</th>
              <th>İl</th>
              <th>Bağlantı Durumu</th>
              <th>Enlem</th>
              <th>Boylam</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(l, index) in filteredLocations"
              :key="index"
              @click="goDetail(l._id)"
              class="cursor-pointer"
            >
              <td>
                <a
                  href="#"
                  class="btn btn-light-primary font-weight-bold mr-2"
                  >{{ l.name }}</a
                >
              </td>
              <td>{{ l.sehir }}</td>
              <td>
                <span
                  v-if="l.connection == 1"
                  class="label label-inline label-light-success font-weight-bold"
                >
                  VAR
                  <i class="fas fa-check text-success mx-3"></i>
                </span>
                <span
                  v-else
                  class="label label-inline label-light-danger font-weight-bold"
                >
                  YOK
                </span>
              </td>
              <td>{{ l.latitude }}</td>
              <td>{{ l.longitude }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import axios from "axios";
import requestt from "@/core/data/requestt";
export default {
  name: "account-overview",
  components: {},
  data() {
    return {
      searchQuery: "",
      selectedCity: null,
      branchList: null,
      loading: null,
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
      locations: [],
      myDate: "",
    };
  },
  computed: {
    filteredLocations() {
      const query = this.searchQuery.toLowerCase();
      return this.locations.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.sehir.toLowerCase().includes(query)
      );
    },
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
  },
  mounted() {
    setCurrentPageBreadcrumbs("Harita");
    this.loading = true;
    requestt
      .get("harita")
      .then((res) => {
        this.myDate = res.data.data[0].connection_down_time;
        this.locations = res.data.data.map((re) => {
          let te = {
            ...re,
            opened: false,
          };
          return te;
        });
        this.loading = false;
      })
      .catch((e) => {
        console.log("hata var.", e);
      });
  },
};
</script>
