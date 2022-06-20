<!--<template>-->
<!--  &lt;!&ndash;begin::Dashboard&ndash;&gt;-->
<!--  <div class="d-flex flex-column-fluid">-->
<!--    &lt;!&ndash;begin::Container&ndash;&gt;-->
<!--    <div class="container">-->
<!--      &lt;!&ndash;begin::Dashboard&ndash;&gt;-->
<!--      &lt;!&ndash;begin::Row&ndash;&gt;-->
<!--      <div class="row">-->
<!--        <div class="col-lg-12 col-xxl-12 order-1 order-xxl-1">-->
<!--          &lt;!&ndash;begin::List Widget 1&ndash;&gt;-->
<!--          <div class="card card-custom card-stretch gutter-b">-->
<!--            &lt;!&ndash;begin::Header&ndash;&gt;-->
<!--            &lt;!&ndash;<div class="card-header border-0 pt-5">-->
<!--                                <h3 class="card-title align-items-start flex-column">-->
<!--                                    <span class="card-label font-weight-bolder text-dark">Veri Noktaları</span>-->
<!--                                </h3>-->
<!--                                <div class="card-toolbar">-->
<!--                                    <a data-toggle="modal" data-target="#veri_noktasi_ekle_modal" class="btn btn-info font-weight-bolder font-size-sm mr-3" id="veri_noktasi_ekle_modal_btn">Veri Noktası Ekle</a>-->
<!--                                </div>-->
<!--                            </div>&ndash;&gt;-->
<!--            &lt;!&ndash;end::Header&ndash;&gt;-->
<!--            &lt;!&ndash;-->
<!--                            <div class="card-body pt-8"><div id="anasayfa_harita" style="height:500px;"></div></div>-->
<!--                            &ndash;&gt;-->
<!--            <div class="card-body pt-8">-->
<!--              <div class="row gy-5 g-xl-8">-->
<!--                <div class="col-xxl-12">-->
<!--                  <MixedWidget2-->
<!--                    widget-classes="card-xl-stretch mb-xl-8"-->
<!--                    widget-color="danger"-->
<!--                    chart-height="200"-->
<!--                    stroke-color="#cb1e46"-->
<!--                  ></MixedWidget2>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="row gy-5 gx-xl-8">-->
<!--                <div class="col-xxl-6">-->
<!--                  <MixedWidget1-->
<!--                    widget-classes="card-xxl-stretch mb-xl-3"-->
<!--                  ></MixedWidget1>-->
<!--                </div>-->
<!--                <div class="col-xxl-6">-->
<!--                  <MixedWidget3-->
<!--                    widget-classes="card-xxl-stretch mb-5 mb-xl-8"-->
<!--                  ></MixedWidget3>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  &lt;!&ndash;end::Dashboard&ndash;&gt;-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent, onMounted } from "vue";-->
<!--import MixedWidget3 from "@/components/widgets/mixed/Widget3.vue";-->
<!--import MixedWidget1 from "@/components/widgets/mixed/Widget1.vue";-->
<!--import MixedWidget2 from "@/components/widgets/mixed/Widget2.vue";-->
<!--import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";-->
<!--import { useStore } from "vuex";-->
<!--import { Actions } from "@/store/enums/StoreEnums";-->

<!--export default defineComponent({-->
<!--  name: "dashboard",-->
<!--  components: {-->
<!--    MixedWidget3,-->
<!--    MixedWidget1,-->
<!--    MixedWidget2,-->
<!--  },-->
<!--  setup() {-->
<!--    const store = useStore();-->
<!--    //Oturum açıldığında dashboard sayfası açılıyor ve sidebar menülerinin listelenmesi için bu sayfa açılırken menüleri çağıran servis tetikleniyor.-->
<!--    store.dispatch(Actions.GET_ALL_MENUS);-->
<!--    onMounted(() => {-->
<!--      setCurrentPageTitle("Genel Bakış");-->
<!--    });-->
<!--  },-->
<!--});-->
<!--</script>-->
