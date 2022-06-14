<template>
  <div class="card mb-4 mb-xl-9" id="kt_carbon_data_input">
    <vue-element-loading
      :active="loading"
      spinner="ring"
      color="#FF6700"
      text="Lütfen bekleyin..."
    />
    <div class="card-header cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Raporlama</h3>
      </div>
    </div>
    <div class="card-body p-9">
      <div class="row mb-7">
        <div class="col-lg-4 text-right">
          <label class="fw-bold text-muted">Rapor için Ay ve Yıl Seçimi:</label>
        </div>
        <div class="col-lg-6">
          <Datepicker
            v-model="selectedDate"
            :maxDate="getCurrentMonth"
            locale="tr"
            autoApply
            monthPicker
          ></Datepicker>
        </div>
      </div>
      <div class="row mb-7">
        <div class="col-lg-4 text-right">
          <label class="fw-bold text-muted"
            >Raporu Alınmak İstenen Kategorilerin Seçimi:</label
          >
        </div>
        <div class="col-lg-6">
          <el-select
            class="categoryForExcel"
            v-model="selectedCategory"
            multiple
            placeholder="Lütfen seçim yapınız"
          >
            <el-option
              v-for="item in CategoriesForExcelReports"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div class="row mb-7">
        <div class="text-right col-lg-10">
          <button
            :disabled="loading"
            type="button"
            class="btn btn-primary"
            @click="postForm"
          >
            Rapor Al
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
import CategoriesForExcelReports from "@/core/data/categoriesForExcelReport";

export default {
  name: "Raporlama",
  components: { VueElementLoading },
  data() {
    return {
      selectedDate: "",
      selectedCategory: null,
      loading: false,
    };
  },
  methods: {
    postForm() {
      this.loading = true;
      axios
        .post(
          "branches/export",
          {
            month: this.selectedDate.month,
            year: this.selectedDate.year,
            filters: this.selectedCategory,
          },
          {
            headers: {
              Authorization: `Bearer ${JwtService.getToken()}`,
            },
          }
        )
        .then((response) => {
          const link = document.createElement("a");
          link.href = response.data.url;
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
          });
        })
        .finally((x) => {
          this.loading = false;
        });
    },
  },
  computed: {
    getCurrentMonth() {
      const date = new Date();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let year = date.getFullYear();
      return new Date(new Date(year, month, 1) - 1);
    },
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Raporlama", ["Karbon Ayak İzi"]);
    });
    return { CategoriesForExcelReports };
  },
};
</script>

<style scoped>
.categoryForExcel {
  width: 100%;
}
</style>
