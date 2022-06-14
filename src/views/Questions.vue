<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-body">
        <div class="container">
          <div
            v-if="resulttable.length > 0"
            class="table-responsive"
            style="margin-top: 14rem"
          >
            <table class="table">
              <tr>
                <th colspan="3">Teklif No : {{ teklifNo }}</th>
              </tr>

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

            <div class="card-header">Teklifler</div>

            <div class="card-body">
              <div id="start-box" onLoad="start();"></div>

              <div id="question-box">
                <p id="question" class="lead">
                  {{ i + 1 }}) {{ questions[i].questionText }}
                </p>

                <input
                  type="hidden"
                  value="<?php echo $a; ?>"
                  id="user_id"
                  ref="userId"
                />

                <div
                  v-for="(answer, key) in questions[i].answers"
                  v-bind:key="key"
                >
                  <input
                    v-if="questions[i].type == 'multiple'"
                    type="checkbox"
                    :checked="questions[i].selectedAnswer.includes(answer)"
                    :name="i"
                    @click="selectAnswer(answer)"
                  />
                  {{ answer.text }}

                  <input
                    v-if="questions[i].type != 'multiple'"
                    type="radio"
                    :checked="questions[i].selectedAnswer.includes(answer)"
                    :name="i"
                    @click="selectAnswer(answer)"
                  />

                  <div
                    v-if="
                      answer.hasOwnProperty('nestedQuestion') &&
                      questions[i].selectedAnswer.includes(answer)
                    "
                  >
                    <div class="row mb-2">
                      <div class="col-md-9">
                        {{ answer.nestedQuestion.question }}
                      </div>

                      <div class="col-md-3">
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

                <div id="buttons-box">
                  <!--   :disabled="questions[i].selectedAnswer.length<1 "             -->

                  <button
                    class="btn btn-success btn-lg"
                    @click="i == questions.length - 1 ? finish() : next()"
                  >
                    <span class="glyphicon glyphicon-ok"></span>
                    {{ i == questions.length - 1 ? "Bitir" : "İleri" }}
                  </button>

                  <button
                    class="btn btn-danger btn-lg"
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
</template>

<script>
import { questions } from "@/core/data/questions";
import axios from "axios";
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

      this.isFinished = 1;

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
      axios
        .post("https://pregnancytesthome.com/api/service", { data: data })
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

          this.teklifNo = data.data.teklifNo;
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

.col-md-9 {
  margin-top: 4%;
}

.col-md-3 {
  margin-top: 4%;
}
</style>
