<template>
  <div class="start">
    <h1>Кем быть?</h1>
    <div class="start__content">
      <div class="start__text">
        Профессиональная ориентация дает возможность ответить на один из важных жизненных вопросов — в каком карьерном направлении развиваться.
        <br><br>
        Тесты на профессию – один из главных методов профориентации, определения профессиональных склонностей.
      </div>
    </div>
    <div class="start__actions">
      <router-link :to="{name: 'Registration', query: {next: 'ProfessionTest'}}"><button class="start__actions-btn">Тест выбор професии</button></router-link>
      <router-link :to="{name: 'Registration', query: {next: 'PersonType'}}"><button class="start__actions-btn">Тест на тип личности</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Start",
}
</script>

<style scoped lang="scss">
.start {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  flex-direction: column;


  h1 {
    font-size: 48px;
    font-weight: 500;
    margin: 30px 0 78px;
    @media (max-width: 400px) {
      font-size: 30px;
    }
  }
  &__content {
    position: relative;
    background: url("../assets/start_back.png");
    background-size: 100% auto;
    min-height: 450px;
    width: 100%;
    max-width: 910px;
    display: flex;
    align-items: center;
    justify-content: center;


    .start__text {
      background: rgba(255, 255, 255, 0.57);
      width: 451px;
      max-width: 90%;
      padding: 27px 25px 40px;
      font-size: 20px;
    }
  }
  &__actions {
    margin-top: 91px;
    padding-bottom: 40px;
    display: flex;

    @media (max-width: 1000px) {
      flex-direction: column;
    }

    a:first-child {
      .start__actions-btn {
        margin-left: 0;
        margin-top: 0;
      }
    }


    a &-btn {
      background: #2F7DF2;
      border-radius: 10px;
      color: white;
      font-weight: 700;
      font-size: 36px;
      width: 471px;
      height: 114px;
      cursor: pointer;
      border: none;
      white-space: nowrap;
      margin-left: 53px;

      @media (max-width: 1000px) {
        margin-top: 30px;
        margin-left: 0;
      }

      @media (max-width: 500px) {
        font-size: 26px;
        width: 300px;
        height: 70px;
      }

      &:hover {
        background: #246ad0;
      }
    }
  }
}
</style>