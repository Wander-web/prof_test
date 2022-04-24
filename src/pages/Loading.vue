<template>
  <div class="loading">
    <h2>Обрабатываем результат</h2>
    <div class="loading__progress progress">
      <div class="progress__content" :style="{ background: `linear-gradient(90deg, rgb(152, 182, 240), rgb(255, 208, 245) ${percent}%, rgb(255, 255, 255) ${percent}%)`}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      timer: null,
      percent: 1
    }
  },
  methods: {
    clear() {
      clearInterval(this.timer)
      this.$router.push({name: this.$route.query.name})
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.percent+=0.6;

      if (this.percent>100) {
        this.clear()
      }
    }, 50)
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 50px;
  }

  .progress {
    width: 80%;
    border: 1px solid black;
    border-radius: 40px;
    padding: 10px;
    height: 60px;

    &__content {
      width: 100%;
      height: 100%;
      border-radius: 30px;
    }
  }
}
</style>