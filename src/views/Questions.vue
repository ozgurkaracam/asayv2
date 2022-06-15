<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-body">
        <div class="container">
          <div v-if="resulttable.length > 0" class="table-responsive">
            <table class="table" v-if="isFinished">
              <tr>
                <th colspan="3">Teklif No : {{ teklifNo }}</th>
              </tr>
            </table>
            <table class="table">
              <tr>
                <th>Soru Numarası</th>

                <th class="d-flex justify-content-between">
                  <div>Ürünler</div>

                  <div>Adet</div>
                </th>
              </tr>

              <tr v-for="(row, key) in resulttable" v-bind:key="key">
                <td v-text="row.id"></td>

                <td>
                  <div v-if="row.answers.length > 0">
                    <div v-if="row.id == 5">
                      <div class="d-flex justify-content-between">
                        <div>{{ row.answers[0].tabletext }}</div>

                        <div>
                          <b>{{ reduced(row.answers) }} </b>
                        </div>
                      </div>
                    </div>

                    <div v-else>
                      <div
                        v-for="(answer, key) in row.answers"
                        v-bind:key="key"
                      >
                        <div class="d-flex justify-content-between">
                          <div>{{ answer.tabletext }}</div>

                          <div>
                            <b>{{ answer.answer }}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <h4>seçim yapılmadı</h4>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div class="card" style="display: block">
            <div class="alert alert-success" v-if="isFinished">
              {{ finishMessage }}
            </div>

            <div class="card-body">
              <div id="start-box" onLoad="start();"></div>

              <div id="question-box" v-if="!isFinished">
                <p id="question" class="header-text">
                  {{ i + 1 }}) {{ questions[i].questionText }}
                </p>

                <div v-if="!isFinished">
                  <div
                    v-for="(answer, key) in questions[i].answers"
                    v-bind:key="key"
                    class="question-text"
                  >
                    <input
                      v-if="questions[i].type == 'multiple'"
                      type="checkbox"
                      class="checkbox"
                      :checked="questions[i].selectedAnswer.includes(answer)"
                      :name="i"
                      @click="selectAnswer(answer)"
                    />
                    <input
                      v-if="questions[i].type != 'multiple'"
                      type="radio"
                      class="radio"
                      :checked="questions[i].selectedAnswer.includes(answer)"
                      :name="i"
                      @click="selectAnswer(answer)"
                    />
                    {{ answer.text }}
                    <div
                      v-if="
                        answer.hasOwnProperty('nestedQuestion') &&
                        questions[i].selectedAnswer.includes(answer)
                      "
                    >
                      <div class="row mt-4 ml-3 mobil">
                        <div class="col-md-6">
                          {{ answer.nestedQuestion.question }}
                        </div>
                        <div class="col-md-3 form-group mobil-opt">
                          <div class="mobil">
                            <input
                              type="number"
                              required
                              step="1"
                              min="1"
                              :placeholder="answer.nestedQuestion.question"
                              v-model="answer.nestedQuestion.answer"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="buttons-box">
                    <!--   :disabled="questions[i].selectedAnswer.length<1 "             -->

                    <button
                      class="btn btn-success btn-lg py-2 mt-5"
                      :disabled="loading"
                      @click="i == questions.length - 1 ? finish() : next()"
                    >
                      <span class="glyphicon glyphicon-ok"></span>
                      {{ i == questions.length - 1 ? "Bitir" : "İleri" }}
                    </button>

                    <button
                      class="btn btn-danger btn-lg py-2 ml-2 mt-5"
                      :disabled="i == 0"
                      @click="i = i - 1"
                    >
                      <span class="glyphicon glyphicon-remove"></span> Geri
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { questions } from "@/core/data/questions";
import axios from "axios";
import JwtService from "@/core/services/JwtService";
export default {
  methods: {
    reduced(arr) {
      return arr.reduce(function (total, answer) {
        total = total + parseInt(answer.answer);

        return total;
      }, 0);
    },

    requiredd() {
      if (this.questions[this.i].type == "multiple")
        this.questions[this.i].selectedAnswer.some(
          (ans) =>
            Object.prototype.hasOwnProperty.call(ans, "nestedQuestion") &&
            parseInt(ans.nestedQuestion.answer) < 1
        );
      else return false;
    },

    finish() {
      this.parseData();

      const cevap13 = this.questions[12].selectedAnswer[0].text;

      const finishPuan = this.finishPoint;

      if (cevap13 == "Evet") {
        console.log(this.finishPoint);

        if (this.finishPoint < 3) {
          this.finishMessage =
            "Red Enerji 2'si 1 Arada Paketi (Sürdürülebilirlik Paketi Dahil)";
        } else if (this.finishPoint < 6) {
          this.finishMessage =
            "Red Enerji Yönetim 5'li Paket (Sürdürülebilirlik Paketi Dahil)";
        } else {
          if (this.finishPoint > 10) {
            let count = parseInt(this.finishPoint % 10);

            this.finishMessage =
              count +
              "Red Enerji Yönetim 10'li Paket (Sürdürülebilirlik Paketi Dahil)";
          } else {
            this.finishMessage =
              "Red Enerji Yönetim 10'li Paket (Sürdürülebilirlik Paketi Dahil)";
          }
        }
      } else {
        if (this.finishPoint < 3) {
          this.finishMessage = "Red Enerji 2'si 1 Arada Paketi";
        } else if (this.finishPoint < 6) {
          this.finishMessage = "Red Enerji Yönetim 5'li Paket";
        } else {
          let count = parseInt(this.finishPoint % 10);
          if (this.finishPoint > 10) {
            this.finishMessage = count + "Red Enerji Yönetim 10'lu Paket";
          } else {
            this.finishMessage = count + "Red Enerji Yönetim 10'lu Paket";
          }
        }
      }
    },

    postData(data) {
      this.loading = true;
      axios
        .post(
          "questions",
          { data: data },
          {
            headers: {
              Authorization: `Bearer ${JwtService.getToken()}`,
            },
          }
        )
        .then((data) => {
          this.resulttable = this.questions
            .filter((question) => {
              return [4, 5, 9, 10, 11, 12].includes(question.id);
            })
            .map((question) => {
              return {
                id: question.id,

                answers: question.answers
                  .filter((answer) =>
                    Object.prototype.hasOwnProperty.call(answer, "tableText")
                  )
                  .map((ans) => ({
                    tabletext: ans.tableText,

                    answer: question.selectedAnswer.includes(ans)
                      ? ans.nestedQuestion
                        ? ans.nestedQuestion.answer
                        : 1
                      : 0,
                  })),
              };
            });

          this.teklifNo = data.data.teklif._id;
        })
        .finally((r) => {
          this.isFinished = 1;
          this.loading = false;
        });
    },

    parseData() {
      let total = this.questions.reduce(
        (total, item) =>
          (total +=
            item.selectedAnswer.reduce(
              (subTotal, answer) => (subTotal += answer.point || 0),
              0
            ) || 0),
        0
      );

      let NestedTotal = 0;

      this.questions.forEach((q) => {
        q.selectedAnswer.forEach((answer) => {
          if (Object.prototype.hasOwnProperty.call(answer, "nestedQuestion")) {
            NestedTotal += parseInt(answer.nestedQuestion.answer);
          }
        });
      });

      total += NestedTotal;

      const postdata = {
        questions: this.questions.map((question) => {
          return {
            text: question.questionText,

            id: question.id,
            answers: question.selectedAnswer.map((ans) => {
              return {
                id: ans.id,

                nestedAnswer: Object.prototype.hasOwnProperty.call(
                  ans,
                  "nestedQuestion"
                )
                  ? parseInt(ans.nestedQuestion.answer)
                  : null,
              };
            }),
          };
        }),
        totalPoint: total,
        user_id: this.user_id,
      };

      this.finishPoint = total;

      this.postData(postdata);

      return postdata;
    },

    changeCheckbox(e, answer) {
      console.log("event", e);
    },

    changeNestedQuestion(a, b) {
      console.log(a, b);
    },

    selectAnswer(answer) {
      let question = this.questions[this.i];

      this.selectedAnswer = answer;

      let findItem = this.resultData.find(
        (item) => item.id == this.questions[this.i].id
      );

      if (findItem) {
        findItem.answer = answer.text;

        this.totalPoint -= findItem.selectedAnswer.point || 0;

        findItem.answerPoint = answer.point;

        findItem.selectedAnswer = answer;

        this.totalPoint += this.selectedAnswer.point || 0;
      } else {
        this.totalPoint += this.selectedAnswer.point || 0;

        this.resultData = [
          ...this.resultData,
          {
            id: this.questions[this.i].id,

            question: this.questions[this.i].questionText,

            answer: answer.text,

            answerid: answer.id,

            selectedAnswer: answer,
          },
        ];
      }

      if (Object.prototype.hasOwnProperty.call(answer, "nestedQuestion"))
        this.dialog = true;
      else this.dialog = false;

      if (!question.selectedAnswer.includes(answer))
        if (question.type == "multiple")
          question.selectedAnswer = [...question.selectedAnswer, answer];
        else question.selectedAnswer = [answer];
      else {
        if (question.type == "multiple") {
          let index = question.selectedAnswer.findIndex((e) => {
            return e.id == answer.id;
          });

          if (index !== -1) {
            question.selectedAnswer.splice(index, 1);
          }
        }
      }

      this.requiredd();
    },

    next() {
      this.dialog = false;

      this.i = this.i + 1;
    },
  },

  data() {
    return {
      resulttable: [],

      isFinished: 0,

      finishMessage: "TEST",

      finishPoint: 0,

      dialog: false,

      i: 0,

      selectedAnswer: null,

      resultData: [],

      questions: questions,
      loading: false,
      test: "test",

      teklifNo: 0,
    };
  },

  computed() {
    alert("test");
  },
};
</script>

<style scoped>
.btn-success {
  margin-top: 10%;
}

.btn-danger {
  margin-top: 10%;
}
.header-text {
  font-size: 25px;
}

.question-text {
  font-size: 20px;
  display: flex;
}

/*radion & checkbox button*/
.main--checkbox {
  position: relative;
  margin: 1rem;
}

.radio {
  position: relative;
  margin: 0.7rem 1rem 0 0;
  cursor: pointer;
}

.radio:before {
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -webkit-transform: scale(0, 0);
  -moz-transform: scale(0, 0);
  -ms-transform: scale(0, 0);
  -o-transform: scale(0, 0);
  transform: scale(0, 0);
  content: "";
  bottom: 0.15rem;
  position: absolute;
  z-index: 1;
  width: 0.75rem;
  height: 0.75rem;
  background: #1bc5bd;
  border-radius: 50%;
}

.radio:checked:before {
  -webkit-transform: scale(1, 1);
  -moz-transform: scale(1, 1);
  -ms-transform: scale(1, 1);
  -o-transform: scale(1, 1);
  transform: scale(1, 1);
}

.radio:after {
  content: "";
  position: absolute;
  top: -0.05rem;
  left: -0.1rem;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border: 1px solid #000000;
  border-radius: 50%;
}

.checkbox {
  position: relative;
  top: -0.2rem;
  margin: 0.7rem 1rem 0 0;
  cursor: pointer;
}

.checkbox:before {
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -moz-transition: -moz-transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  -webkit-transform: rotate(-45deg) scale(0, 0);
  -moz-transform: rotate(-45deg) scale(0, 0);
  -ms-transform: rotate(-45deg) scale(0, 0);
  -o-transform: rotate(-45deg) scale(0, 0);
  transform: rotate(-45deg) scale(0, 0);
  content: "";
  position: absolute;
  left: 0.1875rem;
  top: 0.125rem;
  z-index: 1;
  width: 0.75rem;
  height: 0.375rem;
  border: 2px solid #1bc5bd;
  border-top-style: none;
  border-right-style: none;
}

.checkbox:checked:before {
  -webkit-transform: rotate(-45deg) scale(1, 1);
  -moz-transform: rotate(-45deg) scale(1, 1);
  -ms-transform: rotate(-45deg) scale(1, 1);
  -o-transform: rotate(-45deg) scale(1, 1);
  transform: rotate(-45deg) scale(1, 1);
}

.checkbox:after {
  content: "";
  position: absolute;
  top: -0.125rem;
  left: 0;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border: 1px solid #000000;
  cursor: pointer;
}

/*İnput-CSS*/
input[type="number"],
textarea {
  outline: none;
  box-shadow: none !important;
  border: 0;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  width: 100%;
}

label {
  opacity: 0;
  position: absolute;
  top: -20px;
  left: 0;
}

.form-control:focus + label {
  opacity: 1;
  left: 12px;
  transition: 0.3s ease;
}

.form-control:valid + label {
  opacity: 1;
  left: 10px;
  transition: 0.3s ease;
  color: #00bdaa;
}

.form-control:valid {
  border-bottom: 2px solid #00bdaa;
  transition: 0.3s ease;
}

@media only screen and (max-width: 600px) {
  .form-control {
    border: 1px solid #000;
    width: 5rem;
    font-size: 20px;
  }

  .mobil-opt {
    height: 5rem;
  }

  .mobil {
    margin: 2rem 0 0 0;
  }
}

@media only screen and (max-width: 900px) {
  .form-control {
    border: 1px solid #000;
    width: 5rem;
    font-size: 20px;
  }

  .mobil-opt {
    height: 5rem;
  }

  .mobil {
    margin: 5rem auto;
  }
}
</style>
