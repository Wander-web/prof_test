<template>
  <div class="page_not_found">
    <img src="../assets/error-404.png" alt="error">
    <h2>Страница не найдена</h2>
    <router-link :to="{name: 'Start'}"><custom-button>На главную</custom-button></router-link>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton";
export default {
  name: "PageNotFound",
  components: {CustomButton}
}
</script>

<style lang="scss" scoped>
  .page_not_found {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 150px;
      height: 150px;
    }

    h2 {
      width: 250px;
      text-align: center;
      font-size: 20px;
    }
    .button {
      margin-top: 20px;
    }
  }
</style>