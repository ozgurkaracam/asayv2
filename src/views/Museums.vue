<template>
  <!--begin::details View-->
  <div class="card mb-4 mb-xl-9" id="kt_carbon_data_input">
    <vue-element-loading
      :active="loadingg"
      spinner="ring"
      color="#FF6700"
      text="Lütfen bekleyiniz..."
    />
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0 d-flex">
        <h3 class="fw-bolder m-0">{{ data.title }}</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th>Bağlantı Durumu</th>
            <td>{{ data.muze?.connection ? "VAR" : "YOK" }}</td>
          </tr>
          <tr v-if="!data.muze?.connection">
            <th>Son Bağlantı Tarihi</th>
            <td>{{ data.muze?.connection_down_time }}</td>
          </tr>
          <tr v-for="(counter, i) in data.counters" v-bind:key="i">
            <th>
              {{
                counter.description
                  .replace("KapakAlarm", "Alarm Durumu")
                  .replace("Connection", "Bağlantı Durumu")
              }}
            </th>
            <td>{{ counter.dataval }}</td>
          </tr>
          <tr v-if="data.counters && data.counters.length > 0">
            <th>Genel Toplam</th>
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
import requestt from "@/core/data/requestt";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let loadingg = ref(true);
let data = ref({ title: "" });

let route = useRoute();

onMounted(() => {
  requestt.get("/harita/" + route.params.id).then((res) => {
    data.value.title = res.data.data.name;
    data.value.muze = res.data.data;
    setCurrentPageBreadcrumbs(data.value.title);
    loadingg.value = false;
    data.value.counters = res.data.counters.filter(
      (c) =>
        c.description.includes("KapakAlarm") ||
        c.description.includes("Counter")
    );
  });
});
</script>
