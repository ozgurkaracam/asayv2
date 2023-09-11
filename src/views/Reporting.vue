<template>
  <vue-element-loading
    :active="loading"
    spinner="ring"
    color="#FF6700"
    text="Lütfen bekleyiniz..."
  />
  <div class="card">
    <div class="container">
      <div class="row justify-content-center my-5">
        <div class="col-lg-6 col-md-6 col-sm-12 text-center">
          <label for="" class="row justify-content-center fw-bold fs-4">{{
            startDateTitle
          }}</label>
          <DatePicker
            v-show="startDateMode"
            class="datePicker"
            v-model="billBeginDate"
            mode="datetime"
            is24hr
          ></DatePicker>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 text-center">
          <label for="" class="row justify-content-center fw-bold fs-4">
            {{ endDateTitle }}
          </label>
          <DatePicker
            v-show="endDateMode"
            class="datePicker"
            v-model="billEndDate"
            mode="datetime"
            is24hr
          ></DatePicker>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-4 col-sm-12 text-center my-5">
          <a
            class="btn btn-light-info col-lg-6 col-md-6 col-sm-12 font-weight-bold"
            @click="getTable"
            >Tabloya Dök<i class="fa fa-eye" aria-hidden="true"></i
          ></a>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 text-center my-5">
          <a
            class="btn btn-light-success col-lg-6 col-md-6 col-sm-12 font-weight-bold"
            @click="getDataExcel"
            >Bütün veriler <i class="fa fa-download" aria-hidden="true"></i
          ></a>
        </div>
        <div
          class="col-lg-4 col-md-4 col-sm-12 text-center my-5"
          v-if="billEndDate && billBeginDate"
        >
          <a
            class="btn btn-light-primary col-lg-6 col-md-6 col-sm-12 font-weight-bold"
            @click="getFilterData"
            >Filtreli Veriler <i class="fa fa-download" aria-hidden="true"></i
          ></a>
        </div>
      </div>
      <div class="row">
        <label for="" class="fw-bold fs-2">Müzeler</label>
        <select class="form-select" v-model="muze">
          <option
            v-for="item in muzes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <div v-if="datas.length > 0">
        <div class="total text-right font-weight-bold" style="font-size: 21px">
          Total: {{ total }}
        </div>

        <input
          type="text"
          placeholder="Ara.."
          class="form-control mb-3"
          v-model="searchValue"
        />
        <EasyDataTable
          :headers="headers"
          :items="datas"
          :search-field="searchField"
          :search-value="searchValue"
        />
        <!-- <div class="table-responsive">
          <table
            class="table table-hover table-rounded table-striped border gy-7 gs-7"
          >
            <thead>
              <tr>
                <th>Kayıt Sayısı</th>
                <th>Kayıt Zamanı</th>
                <th>Müze Adı</th>
                <th>Etiket Adı</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, k) in datas" v-bind:key="k">
                <td>{{ d.KayitSayisi }}</td>

                <td>{{ d.KayitZamani }}</td>
                <td>{{ d.MüzeAdi }}</td>
                <td>{{ d.EtiketAdi }}</td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
      <div v-else>
        <h2>Kayıt Bulunamadı..</h2>
      </div>

      <!-- <div class="table-responsive"> -->

      <!-- </div> -->
      <!-- <div class="table-responsive">
        <table
          class="table table-hover table-rounded table-striped border gy-7 gs-7"
        >
          <thead>
            <tr
              class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200"
            >
              <th>raport Title1</th>
              <th>raport Title2</th>
            </tr>
          </thead>
          <tbody>
            <td>Rapor data 1</td>
            <td>Rapor data 2</td>
          </tbody>
        </table>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import JwtService from "@/core/services/JwtService";
import moment from "moment";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import requestt from "@/core/data/requestt";
export default {
  name: "Reporting",
  components: {
    EasyDataTable,
  },
  data() {
    return {
      searchField: ["KayitSayisi", "KayitZamani", "MüzeAdi", "EtiketAdi"],
      searchValue: "",
      total: 0,
      items: [
        { name: "Curry", height: 178, weight: 77, age: 20 },
        { name: "James", height: 180, weight: 75, age: 21 },
        { name: "Jordan", height: 181, weight: 73, age: 22 },
      ],

      headers: [
        {
          text: "Kayıt Sayısı",
          value: "KayitSayisi",
          sortable: true,
        },
        {
          text: "Kayıt Zamanı",
          value: "KayitZamani",
          sortable: true,
        },
        // {
        //   name: "Payment Method",
        //   key: "paymentMethod",
        //   sortingField: "payment.label",
        //   sortable: true,
        // },
        {
          text: "Müze Adı",
          value: "MüzeAdi",
          sortable: true,
        },
        {
          text: "Etiket Adı",
          value: "EtiketAdi",
          sortable: true,
        },
        // {
        //   name: "Actions",
        //   key: "actions",
        // },
      ],
      datas: [
        {
          KayitSayisi: "107",
          KayitZamani: "2023-08-13 13:12:56+03",
          Qualifier: null,
          KanalIsmi: "ALN-turnike_sayac_104",
          MüzeAdi: "Alanya Kalesi\r\r\n",
          EtiketAdi: "ALN01T04",
        },
        {
          KayitSayisi: "108",
          KayitZamani: "2023-08-13 13:13:01+03",
          Qualifier: null,
          KanalIsmi: "ALN-turnike_sayac_104",
          MüzeAdi: "Alanya Kalesi\r\r\n",
          EtiketAdi: "ALN01T04",
        },
        {
          KayitSayisi: "109",
          KayitZamani: "2023-08-13 13:13:05+03",
          Qualifier: null,
          KanalIsmi: "ALN-turnike_sayac_104",
          MüzeAdi: "Alanya Kalesi\r\r\n",
          EtiketAdi: "ALN01T04",
        },
        {
          KayitSayisi: "110",
          KayitZamani: "2023-08-13 13:13:54+03",
          Qualifier: null,
          KanalIsmi: "ALN-turnike_sayac_104",
          MüzeAdi: "Alanya Kalesi\r\r\n",
          EtiketAdi: "ALN01T04",
        },
        {
          KayitSayisi: "111",
          KayitZamani: "2023-08-13 13:20:41+03",
          Qualifier: null,
          KanalIsmi: "ALN-turnike_sayac_104",
          MüzeAdi: "Alanya Kalesi\r\r\n",
          EtiketAdi: "ALN01T04",
        },
      ],
      tableHeader: [
        // {
        //   key: "checkbox",
        //   sortable: false,
        // },
        {
          name: "Kayıt Sayısı",
          key: "KayitSayisi",
          sortable: true,
        },
        {
          name: "Kayıt Zamanı",
          key: "KayitZamani",
          sortable: true,
        },
        // {
        //   name: "Payment Method",
        //   key: "paymentMethod",
        //   sortingField: "payment.label",
        //   sortable: true,
        // },
        {
          name: "Müze Adı",
          key: "MüzeAdi",
          sortable: true,
        },
        {
          name: "Etiket Adı",
          key: "EtiketAdi",
          sortable: true,
        },
        // {
        //   name: "Actions",
        //   key: "actions",
        // },
      ],

      startDateTitle: "Başlangıç günü",
      endDateTitle: "Bitiş günü",
      startDateMode: true,
      endDateMode: true,
      billBeginDate: "",
      billEndDate: "",
      loading: false,
      excel: [],
      muzes: [],
      muze: "",
    };
  },
  // created() {},
  watch: {},
  methods: {
    getDataExcel() {
      this.billBeginDate = moment(this.billBeginDate).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      let muzee = this.muzes.find((m) => m.id == this.muze);

      if (!muzee) {
        alert("LÜTFEN MÜZE SEÇİNİZ!");
        return;
      }
      this.billEndDate = moment(this.billEndDate).format("YYYY-MM-DDTHH:mm:ss");

      console.log(muzee, muzee["location"]);
      requestt
        .get(`excelReport/${muzee.location}`)
        .then((res) => {
          let link = "https://elwiot.com/publicreport.xlsx";
          location.href = link;
          console.log(link);
        })
        .catch((err) => {
          alert("HATA VAR!");
        });
    },
    getTable() {
      let muzee = this.muzes.find((m) => m.id == this.muze);
      if (!muzee) {
        alert("LÜTFEN MÜZE SEÇİNİZ!");
        return;
      }
      this.loading = true;

      if (this.billBeginDate)
        this.billBeginDate = moment(this.billBeginDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      if (this.billEndDate)
        this.billEndDate = moment(this.billEndDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );

      console.log(muzee, muzee["location"]);
      requestt
        .get(
          `excelReport/${muzee.location}?startDate=${
            this.billBeginDate || ""
          }&endDate=${this.billEndDate || ""}`
        )
        .then((res) => {
          this.datas = res.data.data;
          this.total = res.data.total;
          // this.$refs.table.tableData
          console.log(this.datas);
        })
        .catch((err) => {
          alert("HATA VAR!");
        })
        .finally((e) => {
          this.loading = false;
        });
    },
    getFilterData() {
      let muzee = this.muzes.find((m) => m.id == this.muze);
      if (!muzee) {
        alert("LÜTFEN MÜZE SEÇİNİZ!");
        return;
      }
      this.billBeginDate = moment(this.billBeginDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      this.billEndDate = moment(this.billEndDate).format("YYYY-MM-DD HH:mm:ss");

      console.log(muzee, muzee["location"]);
      requestt
        .get(
          `excelReport/${muzee.location}?startDate=${this.billBeginDate}&endDate=${this.billEndDate}`
        )
        .then((res) => {
          let link = "https://elwiot.com/publicreport.xlsx";
          location.href = link;
          console.log(link);
        })
        .catch((err) => {
          alert("HATA VAR!");
        });
    },
  },

  mounted() {
    setCurrentPageBreadcrumbs("Harita");
    this.loading = true;
    requestt
      .get("harita")
      .then((res) => {
        this.loading = false;
        this.muzes = res.data.data.map((item) => {
          const name = item.name;
          const id = item._id;
          const location = item.location;
          return { name, id, location };
        });
        for (const muze of this.muzes) {
          const name = muze.name;
          const id = muze.id;
        }
        this.loading = false;
      })
      .catch((e) => {
        console.log("hata var.");
      });
  },
};
</script>
<style>
th .header {
  position: static !important;
}
</style>
