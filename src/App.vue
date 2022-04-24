<template>
  <div class="heading"></div>
  <router-view class="main" @addUserData="addUser" ></router-view>
  <div class="footer heading"></div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    addUser(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
#app {
  font-family: "Inter",serif ;
  color: black;
  overflow-x: hidden;
}

body {
  margin: 0;
}

.heading {
  background: #F4CC66;
  width: 100%;
  height: 51px;
  position: fixed;
  top: 0;
  z-index: 100;
}

.main {
  margin-top: 51px;
  min-height: calc(100vh - 102px);
}

.footer {
  top: auto;
  bottom: 0;
}
</style>
