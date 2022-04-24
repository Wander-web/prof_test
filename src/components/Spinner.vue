<template>
<div class="spinner">
  <img src="../assets/gear.png">
</div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>
  .spinner img {
    animation: rotate 1s infinite;
    width: 100px;
    height: auto;
  }

  @keyframes rotate {
    from {
      transform: none;
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>