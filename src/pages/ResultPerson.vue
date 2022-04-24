<template>
  <div class="result">
    <h2>Результат тестирования</h2>
    <div class="result__content content">
      <div class="content__diagram">
        <BarChart :chartData="testData"/>
      </div>
      <div class="content__actions">
        <ResultsTable :labels="testData.labels" :values="current" :model-values="model"/>
        <router-link :to="{name: 'Start'}"><custom-button>На главную</custom-button></router-link>
      </div>
    </div>
    <div class="result__description description">
      <div class="description__text">
        <b>Ваша самая сильная сторона - {{sphere}}</b>
        <div class="description__text__more">
          <h4 v-if="right_count===model.length">Вам подходят все сферы!</h4>
          <h4 v-else-if="right_count>=3">Вам подходят все сферы, кроме</h4>
          <h4 v-else>Подходящие для вас сферы</h4>
          <ul v-if="right_count!==model.length">
            <li v-for="(profession, index) in professions" :key="index">{{profession.text}}</li>
          </ul>
        </div>
      </div>
      <div class="description__specializations specializations">
        <h3>Подходящие специальности:</h3>
        <div class="specializations__wrapper" v-if="specializations.length > 0">
          <university-card class="card" v-for="spec in specializations" :key="spec.id" :university_spec="spec" @click="selectUniversity(spec.id)"/>
        </div>
      </div>
    </div>
    <university-modal v-model:open-modal="openModal" :university="selectedUniversity"/>
  </div>
</template>

<script>
import CustomButton from "../components/CustomButton";
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import ResultsTable from "../components/ResultsTable";
import {questions} from "../text/personality_type_test";
import {spheres} from "../text/spheres";
import UniversityCard from "@/components/UniversityCard";
import {getUniversitySpec} from "@/services/api";
import UniversityModal from "@/components/UniversityModal";

Chart.register(...registerables);
export default {
  name: "ResultPerson",
  components: {UniversityModal, ResultsTable, CustomButton, BarChart, UniversityCard},
  data() {
    return {
      result: null,
      total: null,
      model: [
          3,
          3,
          4,
          3,
          5
      ],
      right_count: 0,
      current: [],
      types: ["organization", "thinking", "outlook", "teamwork", "communications"],
      s_types: ["art", "intellect", "conventional", "initiative", "social"],
      wrong_types: [],
      specializations: [],
      openModal: false,
      selectedUniversity: null
    }
  },
  computed: {
    testData() {
      if (this.result == null) return null
      return {
        labels: ['Самоорганизация', 'Мышление', 'Мировозрение и ценности', 'Лидерство и работа в команде', 'Комумникации'],
        datasets: [
          {
            label: "Ваши сильные стороны (%)",
            data: [Math.round(this.result["organization"] / this.total["organization"] * 100),
              Math.round(this.result["thinking"] / this.total["thinking"] * 100),
              Math.round(this.result["outlook"] / this.total["outlook"] * 100),
              Math.round(this.result["teamwork"] / this.total["teamwork"] * 100),
              Math.round(this.result["communications"] / this.total["communications"] * 100),
            ],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
          },
        ]
      }
    },
    sphere() {
      let max = Math.max(...this.testData.datasets[0].data)
      let index = this.testData.datasets[0].data.indexOf(max)
      return this.testData.labels[index]
    },
    professions() {
      return this.right_count < 3 ? spheres.filter((e) => !this.wrong_types.find(t => t === e.type)) : spheres.filter((e) => this.wrong_types.find(t => t === e.type))
    },
  },
  methods: {
    calculateRightCount() {
      let count = 0
      this.current.forEach((c, index) => {
        if (c >= this.model[index]) {
          count++
        } else {
          this.wrong_types.push(this.types[index])
        }
      })
      return count
    },
    getSpecializations() {
      let max = Math.max(...this.testData.datasets[0].data)
      let index = this.testData.datasets[0].data.indexOf(max)
      getUniversitySpec(this.s_types[index]).then(res => {
        this.specializations = res.data
      }).catch(err => console.log(err))
    },
    selectUniversity(id) {
      this.specializations.forEach(specialization=> {
        if (specialization.id===id) {
          this.selectedUniversity = specialization.university
          this.openModal = true
        }
      })
    }
  },
  created() {
    this.result = JSON.parse(sessionStorage.getItem("score"))
    if (this.result===null || this.result===undefined) {
      window.location.pathname="/"
    }
    this.total = JSON.parse(sessionStorage.getItem("totalScore"))
    this.current.push( Math.round(this.result["organization"] / questions.filter(q => q.type==="organization").length))
    this.current.push(Math.round(this.result["thinking"] / questions.filter(q => q.type==="thinking").length))
    this.current.push(Math.round(this.result["outlook"] / questions.filter(q => q.type==="outlook").length))
    this.current.push(Math.round(this.result["teamwork"] / questions.filter(q => q.type==="teamwork").length))
    this.current.push(Math.round(this.result["communications"] / questions.filter(q => q.type==="communications").length))
    this.right_count = this.calculateRightCount()
    this.getSpecializations()
  }
}
</script>

<style scoped lang="scss">
.result {
  display: flex;
  flex-direction: column;
  padding: 39px 24px 30px 37px;

  h2 {
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 56px;

    @media (max-width: 500px) {
      font-size: 30px;
      margin-bottom: 40px;
    }
  }

  .content {
    display: flex;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    &__diagram {
      width: 70%;

      @media (max-width: 900px) {
        width: 100%;
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      flex: 1;

      table {
        width: 70%;
        height: auto;
        margin-bottom: 51px;
      }

      a {

        width: 60%;
        .button {
          width: 100%;
        }
      }

      @media (max-width: 900px) {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;

        table {
          width: 200px;
          max-width: 40%;
          margin-right: 40px;
          margin-bottom: 0;
        }
      }
      
      @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        .table {
          margin-right: 0;
          margin-bottom: 30px;
        }
      }
    }
  }
  .description {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    &__text {
      width: 50%;
      font-size: 18px;
      display: flex;
      flex-direction: column;
      padding-bottom: 40px;
      span {
        color: #1475ff;
        font-weight: 500;
        font-size: 22px;
      }

      b {
        padding: 10px 0;
        font-size: 26px;
      }
    }
    .specializations {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__wrapper {
        display: flex;
        max-width: 80%;
        overflow: scroll;
        padding-bottom: 20px;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          color: black;
        }
        &::-webkit-scrollbar-thumb {
          border: 5px solid transparent;
          border-radius: 100px;
          background-color: #dddddd;
          background-clip: content-box;
        }
        .card {
          margin-left: 20px;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    @media (max-width: 900px) {
      flex-direction: column;
      &__text {
        width: 100%;
      }
      .specializations {
        width: 100%;
      }
    }
  }
}
</style>