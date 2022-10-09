export const questionsFR = [
  {
    id: 1,

    questionText:
      "Elektrik tüketimini nasıl takip ediyorsunuz? ( Fransızca.. )",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "Sayaç üzerinden okuma yaparak",

        point: 0,
      },

      {
        id: 2,

        text: "Fatura ile",

        point: 0,
      },

      {
        id: 3,

        text: "Enerji analizörü ya da reaktif röle ile",

        point: 0,
      },

      {
        id: 4,

        text: "Takip etmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 2,

    questionText: "Reaktif ceza ödüyor musunuz?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "Evet",

        point: 0,
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },

      {
        id: 3,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 3,

    questionText:
      "Yakın zamanda ödediğiniz elektrik fatura tutarı aralığınız nedir?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "500-1000 TL",

        point: 0,
      },

      {
        id: 2,

        text: "1000-2000 TL",

        point: 0,
      },

      {
        id: 3,

        text: "2000-5000 TL",

        point: 0,
      },

      {
        id: 4,

        text: "5000- 10.000 TL",

        point: 0,
      },

      {
        id: 5,

        text: "10.000-20.000 TL",

        point: 0,
      },

      {
        id: 6,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 4,

    questionText: "Ana giriş sigortasının akım değeri nedir?",

    selectedAnswer: [],

    answers: [
      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 1,

        text: "0-100 Amper",

        point: 1,
      },

      {
        tableText:
          "Enerji Analizörü (300A) - 100 ile 300 arası anlamına gelmektedir.",

        id: 2,

        text: "100-300 Amper",

        point: 2,
      },

      {
        tableText:
          "Enerji Analizörü (1000A) - 300 ile 1000 arası anlamına gelmektedir.",

        id: 3,

        text: "300-1000 Amper",

        point: 3,
      },

      {
        id: 4,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 5,

    questionText:
      "Enerji tüketim alt kırılımlarının ölçülmesi talep edilmekte midir? ",

    selectedAnswer: [],

    type: "multiple",

    answers: [
      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 1,

        text: "Aydınlatma enerji tüketimini ölçmek istiyorum",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },

      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 2,

        text: "Klima enerji tüketimini ölçmek istiyorum",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },

      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 3,

        text: "Priz enerji tüketimini ölçmek istiyorum",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },

      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 4,

        text: "Hava Perdesi enerji tüketimini ölçmek istiyorum",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },

      {
        tableText:
          "Enerji Analizörü (100A) - 0 ile 100 arası anlamına gelmektedir",

        id: 5,

        text: "Diğer",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },
    ],
  },

  {
    id: 6,

    questionText:
      "Alt kırılım ölçümü yapılması istenen cihazların hepsi tek bir elektrik panosuna mı bağlı bulunmaktadır?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "Evet",

        point: 0,
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },

      {
        id: 3,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 7,

    questionText: "Elektrik faturasında yer alan tesisat sözleşme gücü nedir?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "50 KVA üstü",

        point: 0,
      },

      {
        id: 2,

        text: "50 KVA altı",

        point: 0,
      },

      {
        id: 3,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 8,

    questionText:
      "Elektrik faturasında yer alan Akım Trafo Oranı ya da Çarpan değeri nedir?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "Değeri belirtiniz.",

        point: 0,

        nestedQuestion: {
          question: "Adet",

          answer: 1,
        },
      },

      {
        id: 2,

        text: "Faturamda belirtilmemiş",

        point: 0,
      },

      {
        id: 3,

        text: "Bilmiyorum",

        point: 0,
      },
    ],
  },

  {
    id: 9,

    questionText:
      "Kapalı alanlardaki hava kalitenizi ölçerek müşteri/çalışan sağlığını etkileyebilecek çevresel faktörleri takip etmek ister misiniz?",

    selectedAnswer: [],

    answers: [
      {
        tableText: "Hava Kalitesi, Sıcaklık, Nem",

        id: 1,

        text: "Evet",

        point: 0,

        nestedQuestion: {
          question:
            "Aynı lokasyonda kullanılmak üzere kaç adet talep edilmektedir?",

          answer: 1,
        },
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },
    ],
  },

  {
    id: 10,

    questionText:
      "Kapalı alanlardaki sıcaklık/nem değerlerini ölçerek müşteri/çalışan konforunu etkileyecek ya da gereksiz enerji tüketimine sebep olabilecek faktörleri takip etmek ister misiniz?",

    selectedAnswer: [],

    answers: [
      {
        tableText: "Sıcaklık / Nem Sensörü",

        id: 1,

        text: "Evet",

        point: 0,

        nestedQuestion: {
          question:
            "Aynı lokasyonda kullanılmak üzere kaç adet talep edilmektedir?",

          answer: 1,
        },
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },
    ],
  },

  {
    id: 11,

    questionText:
      "Kapalı alanlardaki Split klima yönetimi yaparak enerji tasarruf sağlamak ve müşteri/çalışan konforunu belirli bir standart çerçevesinde yönetmek ister misiniz?",

    selectedAnswer: [],

    answers: [
      {
        tableText: "İklimlendirme Yönetimi, Sıcaklık / Nem",

        id: 1,

        text: "Evet",

        point: 0,

        nestedQuestion: {
          question:
            "Aynı lokasyonda kullanılmak üzere kaç adet talep edilmektedir? ",

          answer: 1,
        },
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },
    ],
  },

  {
    id: 12,

    questionText:
      "İstediğiniz enerji tüketim noktalarını belirli zamanlarda açarak/kapatarak yönetmek ister misiniz?",

    selectedAnswer: [],

    answers: [
      {
        tableText: "Aç/Kapa Yönetim",

        id: 1,

        text: "Evet",

        point: 0,

        nestedQuestion: {
          question:
            "Aynı panoda kullanılmak üzere kaç adet talep edilmektedir?",

          answer: 1,
        },
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },
    ],
  },

  {
    id: 13,

    questionText:
      "Enerji tüketim yapan cihazlarınıza göre tüketimlerinizin olması gereken ideal değerlerini öğrenmek, karbon ayak izinizin elektrik enerjisi bazında ne kadar olduğunu tespit ederek gelecek nesillere daha temiz bir dünya bırakmak için yapmanız gerekenleri belirlemenizde yardımcı olmamızı ister misiniz?",

    selectedAnswer: [],

    answers: [
      {
        id: 1,

        text: "Evet",

        point: 0,
      },

      {
        id: 2,

        text: "Hayır",

        point: 0,
      },
    ],
  },
];
