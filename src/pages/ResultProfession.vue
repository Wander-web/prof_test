<template>
  <div class="result">
    <h2>Результат тестирования</h2>
    <div class="result__content content">
      <div class="content__diagram">
        <BarChart :chartData="testData"/>
      </div>
      <div class="content__actions">
          <img src="../assets/education.png">
        <router-link :to="{name: 'Start'}"><custom-button>На главную</custom-button></router-link>
      </div>
    </div>
    <div class="result__description description">
      <div class="description__text">
        <span>Вам больше всего подходит</span> <b>{{sphere}} СФЕРА</b> деятельности. Для вас оптимальны {{mainProfession}}
        <div class="description__text__more" v-if="moreProfessions.length>0">
          <h4>Также вам подходят:</h4>
          <ul>
            <li v-for="(prof, index) in moreProfessions" :key="index">{{prof.label}} сфера ({{prof.text}})</li>
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
import {professions} from "../text/professions";
import UniversityCard from "@/components/UniversityCard";
import {getUniversitySpec} from "@/services/api";
import UniversityModal from "@/components/UniversityModal";

Chart.register(...registerables);
export default {
  name: "ResultProfession",
  components: {CustomButton, BarChart, UniversityCard, UniversityModal},
  data() {
    return {
      result: null,
      total: null,
      specializations: [],
      types: ["real", "intellect", "social", "conventional", "initiative", "art"],
      openModal: false
    }
  },
  computed: {
    testData() {
      if (this.result==null) return null
      return {
        labels: ['РЕАЛИСТИЧНАЯ', 'ИНТЕЛЛЕКТУАЛЬНАЯ', 'СОЦИАЛЬНАЯ', 'КОНВЕНЦИАЛЬНАЯ', 'ПРЕДПРИНИМАТЕЛЬСКАЯ', 'ТВОРЧЕСКАЯ'],
        datasets: [
          {
            label: "Подходящая сфера деятельности (%)",
            data: [Math.round(this.result["real"] / this.total["real"] * 100),
              Math.round(this.result["intellect"] / this.total["intellect"] * 100),
              Math.round(this.result["social"] / this.total["social"] * 100),
              Math.round(this.result["conventional"] / this.total["conventional"] * 100),
              Math.round(this.result["initiative"] / this.total["initiative"] * 100),
              Math.round(this.result["art"] / this.total["art"] * 100)
            ],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#477dcb'],
          },
        ]
      }
    },
    mainProfession() {
      let max = Math.max(...this.testData.datasets[0].data)
      let index = this.testData.datasets[0].data.indexOf(max)
      return professions[index]
    },
    sphere() {
      let max = Math.max(...this.testData.datasets[0].data)
      let index = this.testData.datasets[0].data.indexOf(max)
      return this.testData.labels[index]
    },
    moreProfessions() {
      let profs = []
      let ind = this.testData.labels.indexOf(this.sphere)
      this.testData.datasets[0].data.forEach((data, index) => {
        if (data > 50 && index !== ind) {
          profs.push({label: this.testData.labels[index], text: professions[index]})
        }
      })
      console.log(profs)
      return profs
    },
  },
  methods: {
    getSpecializations() {
      let max = Math.max(...this.testData.datasets[0].data)
      let index = this.testData.datasets[0].data.indexOf(max)
      getUniversitySpec(this.types[index]).then(res => {
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
    this.result = JSON.parse(sessionStorage.getItem("results"))
    if (this.result===null || this.result===undefined) {
      window.location.pathname="/"
    }
    this.total = JSON.parse(sessionStorage.getItem("totalCount"))
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

      img {
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

        img {
          width: 200px;
          max-width: 40%;
          margin-right: 40px;
          margin-bottom: 0;
        }
      }
    }
  }
  .description {
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    @media (max-width: 900px) {
      flex-direction: column;
    }

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

      @media (max-width: 900px) {
        width: 100%;
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