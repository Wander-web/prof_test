<template>
  <div class="test" v-if="currentQuestion">
    <h2>Выберете подходящие для вас утверждения со степенью отношения к вам</h2>
    <img src="../assets/professions.png">
    <div class="test__quest">[{{currentQuestion.text}}] Вопрос {{num}} из {{questions_size}}</div>
    <div class="test__answers">
      <div v-for="(answer, index) in answers" :key="index" class="test__answer-ans answer">
        <input type="radio" :value="answer.score" :id="index" v-model="currentScore">
        <label :for="index">{{answer.text}}</label>
      </div>
    </div>
    <div class="test__actions">
      <custom-button @click="next()">Далее</custom-button>
    </div>
  </div>
</template>

<script>
import {questions, normal_answers, diff_answers} from "../text/personality_type_test";
import CustomButton from "../components/CustomButton";
export default {
  name: "PersonTypeTest",
  components: {CustomButton},
  data() {
    return {
      questions_size: questions.length,
      num: 0,
      currentQuestion: null,
      answers: null,
      score: {
        "organization": 0,
        "thinking": 0,
        "outlook": 0,
        "teamwork": 0,
        "communications": 0
      },
      totalScore: {
        "organization": 0,
        "thinking": 0,
        "outlook": 0,
        "teamwork": 0,
        "communications": 0
      },
      currentScore: 0,
    }
  },
  methods: {
    next() {
      if (this.num===questions.length - 1) {
        const res = JSON.stringify(this.score);
        sessionStorage.setItem("score", res);
        questions.forEach((q) => {
          this.totalScore[q.type]+=q.normal? 4 : 5;
        })
        const total = JSON.stringify(this.totalScore);
        sessionStorage.setItem("totalScore", total)
        this.$router.push({name: 'Loading', query: {name: 'ResultPerson'}})
        return
      }
      if (this.num!==0) {
        this.score[this.currentQuestion.type]+=this.currentScore
        this.currentQuestion = null
        this.answers = null
        this.currentScore=0
      }
      setTimeout(() => {
            this.currentQuestion = questions[this.num]
            this.answers = this.currentQuestion.normal ? normal_answers : diff_answers
            this.num++
          }, 100
      )
    },
  },
  mounted() {
    this.next()
  }
}
</script>

<style scoped lang="scss">
  .test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: 0.7s fade-in;

    h2 {
      font-weight: 400;
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 38px;
      max-width: 90%;

      @media (max-width: 500px) {
        font-size: 30px;
        line-height: 36px;
      }
      @media (max-width: 400px) {
        font-size: 26px;
        line-height: 32px;
      }
    }

    img {
      width: 1014px;
      height: auto;
      max-width: 90%;
      object-fit: cover;
    }

    &__quest {
      margin-top: 11px;
      margin-bottom: 50px;
      font-size: 20px;
      line-height: 24px;
      max-width: 90%;

      @media (max-width: 500px) {
        margin-bottom: 70px;
      }

      @media (max-width: 400px) {
        margin-bottom: 50px;
      }
    }

    &__answers {
      display: flex;
      font-size: 20px;
      line-height: 24px;
      max-width: 90%;
      label {
        margin-left: 10px;
        margin-right: 20px;
      }
    }
    &__actions {
      width: 80%;
      margin-top: 30px;
      display: flex;
      margin-bottom: 55px;
      justify-content: flex-end;

      .button {
        width: 252px;
        height: 81px;
      }
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>