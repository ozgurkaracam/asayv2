<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
    ref="addUserModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <vue-element-loading
          :active="loading"
          spinner="ring"
          color="#FF6700"
          text="Lütfen bekleyiniz..."
        />
        <!--begin::Modal header-->
        <template v-if="!loading">
          <div class="modal-header" id="kt_modal_add_customer_header">
            <!--begin::Modal title-->
            <h2 class="fw-bolder">#{{ selectedForm._id }} Teklif Formu</h2>
            <!--end::Modal title-->

            <!--begin::Close-->
            <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
            <!--end::Close-->
          </div>

          <div class="modal-body">
            <h5>Önerilen Paket: {{ selectedForm.packet }}</h5>
            <br />
            <h5>Toplam Puan: {{ selectedForm.totalPoint }}</h5>
            <br />
            <hr />
            <template
              v-for="(question, key) in selectedForm.questions"
              v-bind:key="key"
            >
              <div>
                <h6>#{{ question.questionid }}. {{ question.questiontext }}</h6>
                <span>{{ question.answertext }}</span> <br />
                <h6>{{ question.nestedquestion }}</h6>
                <span>{{ question.nestedanswer }}</span>
              </div>
              <hr />
            </template>
          </div>
        </template>

        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JwtService from "@/core/services/JwtService";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import VueElementLoading from "vue-element-loading";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import cryptoJs from "crypto-js";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import store from "@/store";
import router from "@/router";

export default {
  name: "add-customer-modal",
  components: {
    VueElementLoading,
  },
  props: ["selectedFormId", "selectedForm", "loading"],
  data() {
    return {
      selectedMenu: [],
      menuList: [],
      selectedBranches: [],
      userData: {
        image: null,
        email: "",
        password: "",
        name: "",
        userType: 0,
      },
      branchList: [],
      userTypes: [
        {
          id: 0,
          label: "Bireysel",
        },
        {
          id: 1,
          label: "Kurumsal",
        },
      ],
      cities: [],
      states: [],
      city_id: null,
      state_id: null,
    };
  },
  created() {
    this.getMenuList();

    useStore()
      .dispatch(Actions.GET_CITIES)
      .then((cities) => {
        this.cities = cities;
      });
  },
  computed: {
    getSelectedMenus() {
      if (this?.selectedMenu) {
        console.log("Seçilen Menüler", this.selectedMenu);
        console.log("Seçilen Menüler", typeof this.selectedMenu);
      }
      return this.selectedMenu;
    },
  },
  watch: {
    city_id() {
      store
        .dispatch(Actions.GET_DISTRICTS, {
          id: this.city_id,
        })
        .then((districts) => {
          this.states = districts;
        });
    },
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.userData.image = files[0];
      console.log(files[0].size);
    },
    getMenuList() {
      this.menuList = JSON.parse(
        window.localStorage.getItem("AllMenus") || "{}"
      );

      this.branchList = JSON.parse(
        window.localStorage.getItem("AllBranches")
      ).data;
    },
  },
};
</script>
