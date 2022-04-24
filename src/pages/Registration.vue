<template>
  <div class="user">
    <div class="user__form">
      <h2>Заполните информацию о себе</h2>
      <form @submit.prevent="submit" :class="{'invalid': pass_err}">
        <input type="number" placeholder="Возраст" v-model="age" min="1" max="120" required>
        <select v-model="educationType">
          <option v-for="(type, index) in educationTypes" :key="index" :value="type" :selected="index===0" :disabled="index===0">{{type}}</option>
        </select>
        <input v-model="currentCity" type="text" placeholder="Ваше текущее место проживания" required>
        <input v-model="wantedCity" type="text" placeholder="Ваше желаемое место проживания" required>
        <div class="user__form__actions actions">
          <button type="button" @click="clean" class="actions__clean">Очистить</button>
          <button type="submit" class="actions__submit">Отправить</button>
        </div>
      </form>
    </div>
    <div class="user__image">
      <img src="../assets/learning.png" alt="Тест на профориентацию">
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      educationType: "Выберите уровень образования",
      educationTypes: ["Выберите уровень образования", "Школьник", "Бакалавр", "Магистрат"],
      age: null,
      currentCity: null,
      wantedCity: null

    }
  },
  methods: {
    clean() {
      this.educationType = "Выберите уровень образования";
      this.age = null;
      this.currentCity = null;
      this.wantedCity = null
    },
    submit() {
      let next = 'Start'
      if(this.$route.query.next !== undefined) next = this.$route.query.next
      this.$router.push({ name: next})
    },
  },
}
</script>

<style scoped lang="scss">
.user {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  padding: 24px 0;
  justify-content: center;
  @media (max-width: 900px) {
    flex-direction: column;
  }

  @media (max-height: 750px) {
    height: auto;
    padding-bottom: 70px;
  }

  &__form {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: center;
    flex-direction: column;
    animation: moveInput 1s ease-out;
    
    @media (max-width: 900px) {
      width: 100%;
    }
    
    h2 {
      font-size: 36px;
      line-height: 44px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      margin-top: 40px;

      .invalid > .actions .actions__submit {
       visibility: hidden !important;
      }

      &:invalid > .actions .actions__submit {
        visibility: hidden;
      }

      &:valid > .actions .actions__submit {
        animation: disableButton 1.5s ease-in-out;
      }

      input, select {
        background: #FFFFFF;
        border: 1px solid #000000;
        box-sizing: border-box;
        padding: 20px 10px;
        margin-bottom: 20px;
        font-size: 16px;
      }
      input:focus {
        outline: none !important;
        border: 2px solid #d9b429 !important;
      }

      .actions {
        display: flex;
        &__submit,
        &__clean {
          background: #2F7DF2;
          border-radius: 10px;
          color: white;
          padding: 20px 10px;
          font-size: 24px;
          width: 200px;
          cursor: pointer;
          border: none;
          white-space: nowrap;
          font-weight: 500;
          
          @media (max-width: 450px) {
            width: 150px;
          }

          @media (max-width: 350px) {
            width: 80%;
            align-self: center;
          }

        }

        @media (max-width: 350px) {
            flex-direction: column;
        }

        &__submit {
          margin-left: 53px;
          @media (max-width: 350px) {
            margin-left: 0;
            margin-top: 30px;
          }
        }
      }
    }
  }

  &__image {
    width: calc(50% - 40px);
    overflow-x: hidden;
    margin-left: 40px;
    img {

      @media (max-width: 900px) {
        display: none;
      }
    }
  }
}

@keyframes moveInput {
  from {
    transform: translateX(-300px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes disableButton {
  from {
    opacity: 0;
    transform: translateZ(100px);
  }
  to {
    opacity: 1;
    transform: none;
  }

}
</style>