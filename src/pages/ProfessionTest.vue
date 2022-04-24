<template>
  <div class="test">
    <div class="test__content content">
      <div class="content__body">
        <h2>Какой вид деятельности
          нравится больше?</h2>
        <div class="content__body__question" v-if="question!==null">
          <div class="content__body__answer" v-for="(answer, index) in question" :key="index" @click="answerSelect(answer)" :class="{'selected': answer===selectedAnswer}">
            {{answer.text}}
          </div>
        </div>
        <div class="content__body__progress" v-else>
          <spinner />
        </div>
      </div>
      <div class="content__image">
        <img src="../assets/prof_image.png">
      </div>
    </div>
    <div class="test__actions actions">
      <p>Вопрос {{answers.length+1}} из {{questions_size}}</p>
      <custom-button @click="answerClick">Вперед</custom-button>
    </div>
    <modal v-if="showModal">
      <template v-slot:title>
        <div>Инструкция</div>
      </template>
      <template v-slot:text>
        <p>Пожалуйста, <b>ВНИМАТЕЛЬНО ПРОЧИТАЙ ЭТУ ИНСТРУКЦИЮ.</b></p>
        <p>В анкете нужно выбрать вид деятельности, который тебе подходит больше всего или нравится больше всего. Каждый раз ты выбираешь из двух вариантов.</p>
        <p>Возможно в какой-то из пар тебе оба вида деятельности не очень понравятся. Но и в этом случае необходимо сделать выбор в пользу чего-то одного. Пусть и по принципу "из двух зол выбираем меньшее".</p>
        <p>А если понравились оба вида деятельности, то выбираешь тот, что нравится больше всего. И только один из двух.</p>
        <p>Подойди к выбору вдумчиво и осознанно.</p>
        <p>Не думай о том, сколько зарабатывают в каждом из видов деятельности. Выбирай так, как-будто заработные платы в этой анкете у всех ОДИНАКОВЫЕ. Примеряй на себя именно ВИД ДЕЯТЕЛЬНОСТИ!</p>
      </template>
      <template v-slot:actions>
        <custom-button class="btn_ok" @click="showModal=false;">Ок</custom-button>
      </template>
    </modal>
    <modal v-if="showModalEnd">
      <template v-slot:title>Согласие на обработку персональных данных</template>
      <template v-slot:text>
        Отправляю ответы анкеты, даю согласие на обработку персональных данных
      </template>
      <template v-slot:actions>
        <input type="checkbox" id="check" v-model="accept">
        <label for="check">Согласен</label>
        <custom-button class="btn_ok" @click="showModalEnd=!accept; end() ">Ок</custom-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {profession_questions} from "../text/profession_questions";
import Spinner from "../components/Spinner";
import CustomButton from "../components/CustomButton";
import Modal from "../components/Modal";
export default {
  name: "ProfessionTest.vue",
  components: {Modal, CustomButton, Spinner},
  data() {
    return {
      questions_size: profession_questions.length,
      num: 0,
      question: null,
      selectedAnswer: null,
      showModal: true,
      showModalEnd: false,
      accept: false,
      answers: [],
      results: {
        "real": 0,
        "social": 0,
        "intellect": 0,
        "initiative": 0,
        "conventional": 0,
        "art": 0
      },
      totalCounts: {
        "real": 0,
        "social": 0,
        "intellect": 0,
        "initiative": 0,
        "conventional": 0,
        "art": 0
      }
    }
  },
  methods: {
    answerSelect(ans) {
      this.selectedAnswer = ans
    },
    answerClick() {
      if (this.selectedAnswer === null) return
        this.answers.push(this.selectedAnswer)
        this.num ++;
        if (this.num === profession_questions.length) {
          this.showModalEnd = true
          return;
        }
        this.question = null;
        this.selectedAnswer = null
        setTimeout(() => {
          this.question = profession_questions[this.num];
        }, 1000)
    },
    end() {
        profession_questions.forEach((ques) => {
          ques.forEach((ans) =>{
            this.totalCounts[ans.type]++
          })
        })
        this.answers.forEach((ans) => {
          this.results[ans.type]++
        })
        const res = JSON.stringify(this.results);
        sessionStorage.setItem("results", res)
        const total = JSON.stringify(this.totalCounts)
        sessionStorage.setItem("totalCount", total)
        this.$router.push({ name: "Loading", query: {name: "ResultProfession"} })
    }
  },
  mounted() {
    this.question = profession_questions[0];
  }
}
</script>

<style lang="scss" scoped>
  .test {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 102px);
    margin-bottom: 51px;

    @media (max-height: 750px) {
      height: auto;
    }
    .content {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: calc(100% - 125px);
      justify-content: center;
      &__body {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2 {
          font-size: 36px;
          line-height: 44px;
          margin-left: 20px;
          margin-bottom: 35px;
        }

        &__answer {
          background: #FFFFFF;
          border: 1px solid #000000;
          margin-top: 65px;
          width: 466px;
          max-width: 90%;
          font-size: 20px;
          cursor: pointer;
          max-height: 118px;
          min-height: 118px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          transition: 0.5s ease-in;
          animation: alpha 0.5s;

          &:hover {
            transform: translateX(30px);
            -webkit-box-shadow: -23px 7px 46px -1px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: -23px 7px 46px -1px rgba(34, 60, 80, 0.2);
            box-shadow: -23px 7px 46px -1px rgba(34, 60, 80, 0.2);
            border: 2px solid black;
          }
        }

        .selected {
          border: inset 3px #246ad0;
        }

        &__progress {
          min-height: 370px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      &__image {
        max-width: 50%;
        min-width: 50%;
        height: 100%;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      width: 50%;
      justify-content: center;
      .button:nth-child(2) {
        margin-left: 31px;
      }
      .button {
        width: 252px;
        height: 81px;
      }
    }
  }

  @media (max-width: 1074px) {
    .content__body {
      width: 100%;
    }
    .content__image {
      display: none;
    }

    .test .content {
      height: fit-content;
    }

    .content__body__answer {
      margin-top: 40px !important;
    }

    .actions {
      width: 100% !important;
      margin-top: 30px;
      margin-bottom: 10px;
      align-items: center;
    }
  }
  
  @media (max-width: 720px) {
    .button {
      width: 180px !important;
      height: 60px !important;
      font-size: 20px;
    }
  }
  
  @media (max-width: 510px) {
    .content__body__answer {
      width: 90vw !important;
    }
  }

  .btn_ok {
    margin-left: 30px;
    width: 100px;
  }

  @keyframes alpha {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

</style>