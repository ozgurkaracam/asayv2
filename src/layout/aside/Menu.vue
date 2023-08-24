<template>
  <!--begin::Menu wrapper-->
  <div
    id="kt_aside_menu_wrapper"
    ref="scrollElRef"
    class="hover-scroll-overlay-y my-5 my-lg-5"
    data-kt-scroll="true"
    data-kt-scroll-activate="{default: false, lg: true}"
    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-height="auto"
    data-kt-scroll-offset="0"
    data-kt-scroll-wrappers="#kt_aside_menu"
  >
    <!--begin::Menu-->
    <div
      id="#kt_header_menu"
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
      data-kt-menu="true"
    >
      <template v-for="(menuItem, j) in ChangedMenus" :key="j">
        <template
          v-if="
            menuItem.name &&
            !menuItem.parent_id &&
            (!menuItem.submenus || menuItem.submenus.length == 0)
          "
        >
          <div class="menu-item">
            <router-link
              class="menu-link"
              active-class="active"
              :to="'/' + menuItem.slug"
            >
              <span
                v-if="menuItem.svgIcon || menuItem.fontIcon"
                class="menu-icon"
              >
                <i
                  v-if="asideMenuIcons === 'font'"
                  :class="menuItem.fontIcon"
                  class="bi fs-3"
                ></i>
                <span
                  v-else-if="asideMenuIcons === 'svg'"
                  class="svg-icon svg-icon-2"
                >
                  <inline-svg :src="menuItem.svgIcon" />
                </span>
              </span>
              <span class="menu-title">{{ menuItem.name }}</span>
            </router-link>
          </div>
        </template>
        <div
          v-else-if="
            menuItem.name &&
            !menuItem.parent_id &&
            menuItem.submenus &&
            menuItem.submenus.length > 0
          "
          :class="{ show: hasActiveChildren(menuItem.route) }"
          class="menu-item menu-accordion"
          data-kt-menu-sub="accordion"
          data-kt-menu-trigger="click"
        >
          <span class="menu-link">
            <span
              v-if="menuItem.svgIcon || menuItem.fontIcon"
              class="menu-icon"
            >
              <i
                v-if="asideMenuIcons === 'font'"
                :class="menuItem.fontIcon"
                class="bi fs-3"
              ></i>
              <span
                v-else-if="asideMenuIcons === 'svg'"
                class="svg-icon svg-icon-2"
              >
                <inline-svg :src="menuItem.svgIcon" />
              </span>
            </span>
            <span class="menu-title"> {{ menuItem.name }}</span>
            <span class="menu-arrow"></span>
          </span>
          <div :class="{ show: false }" class="menu-sub menu-sub-accordion">
            <template v-for="(item2, k) in menuItem.submenus" :key="k">
              <div v-if="!item2.submenus" class="menu-item">
                <router-link
                  class="menu-link"
                  active-class="active"
                  :to="'/' + item2.slug"
                >
                  <span class="menu-bullet">
                    <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">{{ item2.name }}</span>
                </router-link>
              </div>
              <div
                v-if="item2.submenus"
                :class="{ show: item2.submenus }"
                class="menu-item menu-accordion"
                data-kt-menu-sub="accordion"
                data-kt-menu-trigger="click"
              >
                <span class="menu-link">
                  <span class="menu-bullet">
                    <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">{{ item2.name }}</span>
                  <span class="menu-arrow"></span>
                </span>
                <div
                  :class="{ show: item2.submenus }"
                  class="menu-sub menu-sub-accordion"
                >
                  <template v-for="(item3, k) in item2.submenus" :key="k">
                    <div v-if="item3.heading" class="menu-item">
                      <router-link
                        class="menu-link"
                        active-class="active"
                        :to="item3.route"
                      >
                        <span class="menu-bullet">
                          <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title">{{ item3.name }}</span>
                      </router-link>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <!-- <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4"></div>
        </div>
      </div> -->
      <!-- <div class="menu-item">
        <a
          class="menu-link"
          href="https://preview.keenthemes.com/metronic8/vue/docs/#/changelog"
        >
          <span class="menu-icon">
            <i
              v-if="asideMenuIcons === 'font'"
              class="bi bi-card-text fs-3"
            ></i>
            <span
              v-else-if="asideMenuIcons === 'svg'"
              class="svg-icon svg-icon-2"
            >
              <inline-svg src="media/icons/duotune/general/gen005.svg" />
            </span>
          </span>
          <span class="menu-title"
            >{{ translate("changelog") }} v{{ version }}</span
          >
        </a>
      </div> -->
    </div>
    <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n/index";
import { useRoute } from "vue-router";
import HtmlClass from "@/core/services/LayoutService";
import { version } from "@/core/helpers/documentation";
import { asideMenuIcons } from "@/core/helpers/config";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import axios from "axios";

export default defineComponent({
  name: "kt-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const store = useStore();
    // show page loading
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
    // initialize html element classes
    HtmlClass.init();
    const scrollElRef = ref<null | HTMLElement>(null);
    const ChangedMenus: any[] = [];
    const all: any[] = [];
    const AllMenus = JSON.parse(localStorage.getItem("AllMenus") || "{}");
    for (var i = 0; i < AllMenus.length; i++) {
      ChangedMenus.push(AllMenus[i]);
    }
    for (var j = 0; j < all.length; j++) {
      for (var k = 0; k < MainMenuConfig[0].pages.length; k++) {
        // if (
        //   all[j] ==
        //   (MainMenuConfig[0].pages[k].heading ||
        //     MainMenuConfig[0].pages[k].sectionTitle)
        // ) {
        // ChangedMenus.push(MainMenuConfig[0].pages[k]);
        // }
      }
    }
    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };
    nextTick(() => {
      reinitializeComponents();
    });

    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
    }, 500);
    return {
      hasActiveChildren,
      ChangedMenus,
      asideMenuIcons,
      MainMenuConfig,
      version,
      translate,
    };
  },
});
</script>
