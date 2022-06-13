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
        <h3 class="fw-bolder m-0">Parametre Tanımlama</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7 justify-content-center">
        <!--begin::Label-->

        <!--begin::Col-->
        <div class="col-lg-6">
          <label class="fw-bold required text-muted">Tarih seçimi:</label>
          <select name="" v-model="selectedDay" id="" class="form-control">
            <option v-for="(day, key) in days" v-bind:key="key" :value="day.id">
              {{ day.dayTR }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-7 justify-content-center">
        <div class="col-lg-3">
          <label class="fw-bold required text-muted">Başlangıç saati:</label>
          <el-time-select
            v-model="startTime"
            start="07:00"
            step="00:15"
            end="20:00"
            placeholder="Başlangıç saatini seçiniz"
            :getTime="getSelectedStartTime"
          />
        </div>
        <div class="col-lg-3 subBlock">
          <label class="fw-bold required text-muted">Bitiş saati:</label>
          <el-time-select
            v-model="endTime"
            start="07:00"
            step="00:15"
            end="20:00"
            placeholder="Bitiş saatini seçiniz"
            :getTime="getSelectedEndTime"
          />
        </div>
      </div>
      <div class="row mb-7 justify-content-center">
        <div class="col-lg-3">
          <label class="fw-bold required text-muted">Senaryo İsmi</label>
          <el-input v-model="scenarioName" type="text" placeholder="" />
        </div>
        <div class="col-lg-3 subBlock">
          <label class="fw-bold required text-muted">Şube Seçimi</label>
          <el-select v-model="selectedBranch" placeholder="Lütfen şube seçiniz">
            <el-option
              v-for="item in branchList.data"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </div>
      </div>
      <div class="col-lg-12 text-right">
        <button
          type="button"
          class="btn btn-success"
          @click="saveDataInTheTable"
        >
          Tabloya Ekle
        </button>
      </div>
      <div class="row mb-7" v-if="datesToBeAdded.length > 0">
        <div class="col-lg-12 text-center">
          <label class="fw-bold text-muted">Kaydedilecek Tarihler</label>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Gün</th>
                <th scope="col">Başlangıç Saati</th>
                <th scope="col">Bitiş Saati</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in datesToBeAdded" :key="item.id">
                <th>{{ item.dayIndex }}</th>
                <td>{{ item.dayText }}</td>
                <td>{{ item.start_at }}</td>
                <td>{{ item.finish_at }}</td>
                <td>
                  <button
                    class="btn-danger btn"
                    @click="deleteDay(item.dayIndex)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="datesToBeAdded.length > 0" class="col-lg-12 text-right">
          <button
            type="button"
            class="btn btn-success"
            @click="saveDataInTheDB"
          >
            Verileri Kaydet
          </button>
        </div>
      </div>
      <!--end::Row-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import JwtService from '@/core/services/JwtService';
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import axios from "axios";
import VueElementLoading from "vue-element-loading";
import {useStore} from "vuex";
import {Actions, Mutations} from "@/store/enums/StoreEnums";

export default {
  name: "account-overview",
  components: {VueElementLoading},
  data() {
    return {
      dayss: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
      selectedDay: 0,
      selectedDate: null,
      minSelectableDate: null,
      maxSelectableDate: null,
      scenarioName: null,
      branchList: null,
      loading: false,
      datesToBeAdded: [],
      scenarioDetails: [],
      startTime: null,
      endTime: null,
      selectedBranch: null,
      store: useStore(),
      days: [
        {id: 0, dayTR: "Pazartesi", dayEN: "Monday"},
        {id: 1, dayTR: "Salı", dayEN: "Tuesday"},
        {id: 2, dayTR: "Çarşamba", dayEN: "Wednesday"},
        {id: 3, dayTR: "Perşembe", dayEN: "Thursday"},
        {id: 4, dayTR: "Cuma", dayEN: "Friday"},
        {id: 5, dayTR: "Cumartesi", dayEN: "Saturday"},
        {id: 6, dayTR: "Pazar", dayEN: "Sunday"},
      ],
    };
  },
  created() {
    this.branchList = JSON.parse(window.localStorage.getItem("AllBranches") || "{}");
  },
  computed: {
    getMinSelectableDate() {
      let date = new Date();
      //   y = date.getFullYear(),
      //   m = date.getMonth();
      // var firstDay = new Date(y, m, 1);
      // var result = moment(firstDay).format("YYYY/MM/DD");
      let today = date.getDate();
      let dayOfTheWeek = date.getDay();
      let firstDayOfWeek = date.setDate(today - dayOfTheWeek + 1);
      return new Date(firstDayOfWeek);
    },
    getSelectedStartTime() {
      if (this?.startTime)
        console.log("Başlangıç Saati", this.startTime);
    },
    getSelectedEndTime() {
      if (this?.endTime)
        console.log("Bitiş Saati", this.endTime);
    },
    getMaxSelectableDate() {
      let date = new Date();
      //   y = date.getFullYear(),
      //   m = date.getMonth();
      // var lastDay = new Date(y, m + 1, 0);
      // var result = moment(lastDay).format("YYYY/MM/DD");
      let today = date.getDate();
      let dayOfTheWeek = date.getDay();
      let lastDayOfWeek = date.setDate(today - dayOfTheWeek + 7);
      return new Date(lastDayOfWeek);
    },
  },
  mounted() {
    setCurrentPageBreadcrumbs("Parametre Tanımlama", ["Karbon Ayak İzi"]);
  },
  methods: {
    deleteDay(i) {
      let index = this.datesToBeAdded.findIndex(v => v.dayIndex == i);
      if (index != -1) {
        this.datesToBeAdded.splice(index, 1);
      }
    },
    saveDataInTheTable() {
      if (!this.startTime || !this.endTime || !this.scenarioName || !this.selectedBranch) {

        Swal.fire({
          icon: "error",
          title: "Boş alan bırakmayınız!"
        })
        return;
      }
      let index = this.datesToBeAdded.findIndex(val => val.dayIndex == this.days[this.selectedDay].id)
      if (index == -1)
        this.datesToBeAdded.push({
          dayIndex: this.days[this.selectedDay].id,
          dayText: this.days[this.selectedDay].dayTR,
          start_at: this.startTime,
          finish_at: this.endTime
        })
      else {
        this.datesToBeAdded[index] = {
          dayIndex: this.days[this.selectedDay].id,
          dayText: this.days[this.selectedDay].dayTR,
          start_at: this.startTime,
          finish_at: this.endTime
        };
      }
      this.selectedDay = 0;
      this.endTime = null;
      this.startTime = null;

      this.datesToBeAdded.sort( function( a, b ) {
        if ( a.dayIndex < b.dayIndex ){
          return -1;
        }
        if ( a.dayIndex > b.dayIndex ){
          return 1;
        }
        return 0;
      } );

    },
    saveDataInTheDB() {
      this.datesToBeAdded.forEach((value) => {
        delete value.dayText;
      });
      let data = {
        name: this.scenarioName,
        branch_id: this.selectedBranch,
        scenario_details: this.datesToBeAdded
      };
      if (data?.name && data?.branch_id && data?.scenario_details) {
        this.datesToBeAdded = [];
        this.loading = true;
        axios.post("workingscenarios", data, {
          headers: {
            Authorization: `Bearer ${JwtService.getToken()}`,
            Accept: "application/json"
          }
        })
            .then((response) => {
              if (response?.data) {
                this.loading = false;
                Swal.fire({
                  title: "İşlem Başarılı",
                  text: "Çalışma Senaryoları başarılı bir şekilde kaydedilmiştir.",
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
            })
      } else {
        Swal.fire({
          title: "İşlem Başarısız",
          text: "Çalışma Senaryolarını kaydedebilmek için tüm alanları doldurmanız gerekmektedir.",
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
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}

.dateSelector {
  width: 100%;
  height: 40px;
}

@media only screen and (max-width: 991px) {
  .subBlock {
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
