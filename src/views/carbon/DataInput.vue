<template>
  <div class="card mb-4 mb-xl-9" id="kt_carbon_data_input">
    <vue-element-loading
      :active="loading"
      spinner="ring"
      color="#FF6700"
      text="Lütfen bekleyiniz..."
    />
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Veri Girişi</h3>
      </div>
    </div>
    <div class="card-body p-9">
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label
            class="fw-bold text-muted"
            style="cursor: pointer"
            @click="startDateMode = !startDateMode"
            >Fatura Başlangıç Tarihi</label
          >
          <DatePicker
            v-show="startDateMode"
            class="datePicker"
            v-model="billBeginDate"
            mode="date"
            is24hr
          >
          </DatePicker>
        </div>
        <div class="col-lg-5 innerBlock">
          <label
            class="fw-bold text-muted"
            style="cursor: pointer"
            @click="endDateMode = !endDateMode"
            >Fatura Bitiş Tarihi</label
          >
          <DatePicker
            v-show="endDateMode"
            class="datePicker"
            v-model="billEndDate"
            mode="date"
            is24hr
          >
          </DatePicker>
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Şube</label>
          <select class="form-control" v-model="selectedBranch">
            <option v-for="i in branchList.data" :key="i._id" :value="i._id">
              {{ i.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-5 innerBlock">
          <label class="fw-bold text-muted">Fatura Tüketim (kwh)</label>
          <input type="text" class="form-control" v-model="billKwh" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">EnYS Tüketim (kwh)</label>
          <input type="text" class="form-control" v-model="billEnys" />
        </div>
        <div class="col-lg-5 innerBlock">
          <label class="fw-bold text-muted">Fatura Tüketim (TL)</label>
          <input type="text" class="form-control" v-model="billTl" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted"> Kapasitif Tüketim </label>
          <input
            type="text"
            class="form-control"
            v-model="capacitiveConsumption"
          />
        </div>
        <div class="col-lg-5 innerBlock">
          <label class="fw-bold text-muted">Fatura T1 Tüketim (kwh)</label>
          <input type="text" class="form-control" v-model="billT1" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted"> Endüktif Tüketim </label>
          <input
            type="text"
            class="form-control"
            v-model="inductiveConsumption"
          />
        </div>
        <div class="col-lg-5 innerBlock">
          <label class="fw-bold text-muted">Fatura T2 Tüketim (kwh)</label>
          <input type="text" class="form-control" v-model="billT2" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Soğutma Gün Derece</label>
          <input type="text" class="form-control" v-model="coldDegree" />
        </div>
        <div class="col-lg-5 innerBlock">
          <label class="fw-bold text-muted">Fatura T3 Tüketim (kwh)</label>
          <input type="text" class="form-control" v-model="billT3" />
        </div>
      </div>
      <div class="row mb-7 justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Isıtma Gün Derece</label>
          <input type="text" class="form-control" v-model="heatingDegree" />
        </div>
      </div>
      <div class="row mb-7 text-right">
        <div class="btnSaveData col-lg-11">
          <button type="button" class="btn btn-primary" @click="saveData">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import moment from "moment";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import axios from "axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import VueElementLoading from "vue-element-loading";

export default {
  name: "account-overview",
  components: { VueElementLoading },
  data() {
    return {
      startDateMode: false,
      endDateMode: false,
      branchList: null,
      selectedBranch: null,
      billBeginDate: null,
      billEndDate: null,
      billKwh: null,
      billTl: null,
      billEnys: null,
      capacitiveConsumption: null,
      inductiveConsumption: null,
      billT1: null,
      billT2: null,
      billT3: null,
      heatingDegree: null,
      coldDegree: null,
      workingScenario: null,
      loading: false,
      scenarioList: null,
    };
  },
  created() {
    this.getAllBranches();
  },
  methods: {
    getAllBranches() {
      this.branchList = JSON.parse(
        window.localStorage.getItem("AllBranches") || "{}"
      );
    },
    // getWorkingScenariosFromSelectedBranch() {
    //   axios
    //     .get("branches/" + this.selectedBranch, {
    //       headers: {
    //         Authorization: `Bearer ${JwtService.getToken()}`,
    //         Accept: "application/json",
    //       },
    //     })
    //     .then((response) => {
    //       console.log("ResponseFromScenarios", response);
    //       this.scenarioList = response.data.data.working_scenarios;
    //     });
    // },
    checkAllFields() {
      if (
        this?.selectedBranch &&
        this?.billBeginDate &&
        this?.billEndDate &&
        this?.billKwh &&
        this?.billTl &&
        this?.billEnys &&
        this?.capacitiveConsumption &&
        this?.inductiveConsumption &&
        this?.billT1 &&
        this?.billT2 &&
        this?.billT3 &&
        this?.heatingDegree &&
        this?.coldDegree
      ) {
        return true;
      } else return false;
    },
    saveData() {
      this.billBeginDate = moment(this.billBeginDate).format("YYYY/MM/DD");
      this.billEndDate = moment(this.billEndDate).format("YYYY/MM/DD");
      // console.log(this.billBeginDate, this.billEndDate);
      let data = {
        branch_id: this.selectedBranch,
        bill_begin_date: this.billBeginDate,
        bill_end_date: this.billEndDate,
        bill_kwh: this.billKwh,
        bill_tl: this.billTl,
        bill_enys: this.billEnys,
        capacitive_consumption: this.capacitiveConsumption,
        inductive_consumption: this.inductiveConsumption,
        bill_t1: this.billT1,
        bill_t2: this.billT2,
        bill_t3: this.billT3,
        heating_degree: this.heatingDegree,
        cold_degree: this.coldDegree,
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
        }).then();
      }
    },
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Veri Girişi", ["Karbon Ayak İzi"]);
    });
  },
};
</script>

<style scoped>
.datePicker {
  width: 100%;
}
.startDateSelector,
.endDateSelector {
  width: 100%;
  height: 41px;
}
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
