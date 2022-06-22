<template>
  <!--begin::details View-->
  <div class="card mb-4 mb-xl-9" id="kt_carbon_data_input">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Modem Ekleme</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <vue-element-loading
        :active="loading"
        spinner="ring"
        color="#FF6700"
        text="Lütfen bekleyiniz..."
      />
      <!--begin::Row-->
      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Modem Adı</label>
          <input type="text" v-model="name" class="form-control" />
        </div>

        <div class="d-flex flex-column col-lg-5">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-2">
            <span class="required">Şubeler</span>

            <i
              class="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              title="Lütfen Şubeleri Giriniz"
            ></i>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-select
            v-model="selectedBranch"
            placeholder="Lütfen seçim yapınız"
            multiple
          >
            <el-option
              v-for="item in branches"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
          <!--end::Input-->
        </div>
      </div>

      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Seri Numarası</label>
          <input type="text" v-model="serino" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">GSM</label>
          <input type="text" v-model="gsm" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">GSM No</label>
          <input type="text" v-model="gsmno" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">MSISDN</label>
          <input type="text" v-model="msisdn" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">IP No</label>
          <input type="text" v-model="ip" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Port</label>
          <input type="text" v-model="port" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">SIM Seri No</label>
          <input type="text" v-model="sim" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Modem IMEI</label>
          <input type="text" v-model="imei" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Modem Türü</label>
          <input type="text" v-model="type" class="form-control" />
        </div>
        <div class="col-lg-5 subBlock">
          <label class="fw-bold text-muted">Fatura Tarihi</label>
          <input type="date" v-model="date" class="form-control" />
        </div>
      </div>
      <div class="row mb-7 subBlock justify-content-center">
        <div class="col-lg-5">
          <label class="fw-bold text-muted">Açıklama</label>
          <textarea
            name=""
            v-model="description"
            id=""
            cols="30"
            rows="10"
            class="form-control"
          ></textarea>
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
      branches: [],
      name: "",
      branchList: null,
      loading: null,
      serino: null,
      gsm: null,
      selectedBranch: [],
      port: null,
      ip: null,
      imei: null,
      sim: null,
      gsmno: null,
      msisdn: null,
      type: null,
      date: null,
      description: null,
    };
  },
  created() {
    this.getAllBranches();
  },
  methods: {
    getAllBranches() {
      this.loading = true;
      axios
        .get("branches", {
          headers: {
            Authorization: `Bearer ${JwtService.getToken()}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.branches = res.data.data;
          this.loading = false;
        });
    },
    checkAllFields() {
      if (
        this.name &&
        this.serino &&
        this.gsm &&
        this.selectedBranch &&
        this.port &&
        this.ip &&
        this.imei &&
        this.sim &&
        this.gsmno &&
        this.msisdn &&
        this.type &&
        this.date &&
        this.description
      ) {
        return true;
      } else return false;
    },
    submit() {
      let data = {
        name: this.name,
        serino: this.serino,
        gsm: this.gsm,
        branches: this.selectedBranch,
        port: this.port,
        ip: this.ip,
        imei: this.imei,
        sim: this.sim,
        gsmno: this.gsmno,
        msisdn: this.msisdn,
        type: this.type,
        date: this.date,
        description: this.description,
      };
      if (true) {
        this.loading = true;
        axios
          .post("modems", data, {
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
    setCurrentPageBreadcrumbs("Modem Ekleme");
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
