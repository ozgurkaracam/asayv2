<template>
  <div class="dropdown">
    <button
      class="btn btn-primary btn-lg dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span :class="`flag-icon flag-icon-${selectedLanguage.code} me-1`"></span>
      <span>{{ selectedLanguage.value }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-for="language in languages" v-bind:key="language.code">
        <a
          :class="`dropdown-item ${language.active ? 'active' : ''}`"
          @click="storeStorage(language)"
          ><span :class="`flag-icon flag-icon-${language.code} me-1`"></span>
          <span>{{ language.value }}</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    storeStorage(language) {
      localStorage.setItem("questionLanguage", JSON.stringify(language));
      window.location.reload();
    },
  },
  mounted() {
    if (localStorage.getItem("questionLanguage")) {
      let activeLanguage = JSON.parse(localStorage.getItem("questionLanguage"));
      this.languages.forEach((lang) => (lang.active = false));
      let sI = this.languages.find((ln) => ln.code == activeLanguage.code);
      sI.active = true;
    }
    this.selectedLanguage = this.languages.find((lang) => lang.active);
  },
  data() {
    return {
      selectedLanguage: {},
      languages: [
        {
          code: "tr",
          value: "Türkçe",
          active: true,
        },
        {
          code: "us",
          value: "English",
          active: false,
        },
        {
          code: "fr",
          value: "French",
          active: false,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
