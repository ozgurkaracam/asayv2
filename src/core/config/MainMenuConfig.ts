const DocMenuConfig = [
  {
    pages: [
      {
        heading: "Analiz",
        route: "/analysis",
        svgIcon: "media/icons/duotune/graphs/gra001.svg",
      },
      {
        heading: "Kontrol",
        route: "/control",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "Harita",
        route: "/maps",
        svgIcon: "media/icons/duotune/maps/map002.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "Senaryolar",
        route: "/scenarios",
        svgIcon: "media/icons/duotune/text/txt009.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "Alarmlar",
        route: "/alarms",
        svgIcon: "media/icons/duotune/general/gen007.svg",
        fontIcon: "bi-layers",
      },
      {
        heading: "Raporlar",
        route: "/reports",
        svgIcon: "media/icons/duotune/general/gen005.svg",
        fontIcon: "bi-layers",
      },
      {
        sectionTitle: "test menu 1",
        route: "/settings",
        svgIcon: "media/icons/duotune/coding/cod001.svg",
        fontIcon: "bi-archive",
        sub: [
          {
            heading: "Kullanıcılar",
            route: "/user/users",
          },
          {
            heading: "Dosya Yükleme",
            route: "/settings/fileupload",
          },
          {
            heading: "Kredi",
            route: "/settings/credit",
          },
        ],
      },
      {
        sectionTitle: "Faturalar",
        route: "/invoices",
        svgIcon: "media/icons/duotune/communication/com010.svg",
        fontIcon: "bi-person",
        sub: [
          {
            heading: "SKTT",
            route: "/invoices/sktt",
          },
        ],
      },
      {
        sectionTitle: "Servisler",
        svgIcon: "media/icons/duotune/coding/cod009.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "Kurulum",
            route: "/settings/users",
          },
          {
            heading: "Bakım",
            route: "/settings/fileupload",
          },
          {
            heading: "Arıza",
            route: "/settings/credit",
          },
          {
            heading: "Talep",
            route: "/404",
          },
        ],
      },
      {
        heading: "Önleyici Bakım",
        route: "/preventivemaintenance",
        svgIcon: "media/icons/duotune/medicine/med008.svg",
      },
      {
        heading: "Enerji Trendleri",
        route: "/trendsofenergy",
        svgIcon: "media/icons/duotune/graphs/gra012.svg",
      },
      {
        heading: "xxxx",
        route: "/savinganalysis",
        svgIcon: "media/icons/duotune/general/gen004.svg",
      },
      {
        heading: "test menu 2",
        route: "/inventory",
        svgIcon: "media/icons/duotune/abstract/abs027.svg",
      },
      {
        sectionTitle: "test menu 3",
        svgIcon: "media/icons/duotone/home/tree.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            heading: "Veri Giriş",
            route: "/carbonfootprint/dataInput",
          },
          {
            heading: "Şube Tanımlama",
            route: "/carbonfootprint/setBranch",
          },
          {
            heading: "Parametre Tanımlama",
            route: "/carbonfootprint/setParameter",
          },
          {
            heading: "Raporlama",
            route: "/carbonfootprint/reporting",
          },
          {
            heading: "Şubeler",
            route: "/carbonfootprint/branches",
          },
        ],
      },
    ],
  },
];

export default DocMenuConfig;
