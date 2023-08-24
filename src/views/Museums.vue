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
    <div class="card-header cursor-default">
      <!--begin::Card title-->
      <div class="card-title m-0 d-flex">
        <h3 class="fw-bolder m-0">{{ data.title }}</h3>
      </div>
      <div class="card-toolbar my-3">
        <div class="d-flex align-items-center">
          <span
            class="pulse pulse-success bullet bullet-dot bg-success me-2 h-10px w-10px"
          ></span>

          <!--begin::Label-->
          <span class="fw-bold text-gray-600 fs-6">{{
            data.connection_down_time
          }}</span>
          <!--end::Label-->
        </div>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <div class="table-responsive">
        <table class="table table-hover table-striped border gy-7 gs-7">
          <tr>
            <th class="fw-bolder fs-6 text-gray-700">Bağlantı Durumu</th>
            <td>
              <span
                v-if="data.muze?.connection == 1"
                class="label label-inline label-light-success font-weight-bold"
              >
                VAR <i class="fas fa-check text-success mx-3"></i>
              </span>
              <span
                v-else
                class="label label-inline label-light-danger font-weight-bold"
              >
                YOK
              </span>
            </td>
          </tr>
          <tr
            class="fw-bolder fs-6 text-gray-700"
            v-for="(counter, i) in data.counters"
            v-bind:key="i"
          >
            <th>
              {{
                counter.description
                  .replace("KapakAlarm", "Alarm Durumu")
                  .replace("Connection", "Bağlantı Durumu")
              }}
            </th>
            <td>{{ counter.dataval }}</td>
          </tr>
          <tr>
            <th class="fw-bolder fs-6 text-gray-700">Alarm Durumu</th>
            <td
              v-if="
                kapakAlarmlari[0]?.dataval && kapakAlarmlari[0].dataval != 0
              "
            >
              <span
                class="label label-inline label-light-success font-weight-bold"
              >
                <!-- {{ kapakAlarmlari[0].dataval }}  -->
                VAR
                <i class="fas fa-check text-success mx-3"></i>
              </span>
            </td>
            <td v-else>
              <span
                class="label label-inline label label-inline label-light-danger font-weight-bold font-weight-bold"
              >
                <!-- {{
                  kapakAlarmlari.length > 0 && kapakAlarmlari[0].dataval
                    ? kapakAlarmlari[0].dataval
                    : "N/A"
                }} -->
                YOK
              </span>
            </td>
          </tr>
          <tr
            class="fw-bolder fs-3 text-gray-800"
            v-if="data.counters && data.counters.length > 0"
          >
            <th>Günlük Toplam</th>
            <td>
              {{
                data.counters
                  .filter((c) => c.description.includes("Counter"))
                  .reduce((total, c) => {
                    total += parseInt(c.dataval);
                    return total;
                  }, 0)
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import request from "@/core/data/requestt";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let loading = ref(true);
let data = ref({ title: "" });

let route = useRoute();

const kapakAlarmlari = [];

onMounted(() => {
  request.get("/harita/" + route.params.id).then((res) => {
    data.value.title = res.data.data.name;
    data.value.muze = res.data.data;
    data.value.connection_down_time = res.data.data.connection_down_time;
    setCurrentPageBreadcrumbs(data.value.title);
    loading.value = false;
    data.value.counters = res.data.counters.filter((c) =>
      c.description.includes("Counter")
    );
    for (let i = 0; i < res.data.counters.length; i++) {
      const item = res.data.counters[i];
      if (item.description === "KapakAlarm") {
        kapakAlarmlari.push(item);
      }
    }
    console.log(kapakAlarmlari);
  });
});
</script>
