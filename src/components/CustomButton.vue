<template>
  <button type="button" class="button"><slot></slot></button>
</template>

<script>
export default {
  name: "CustomButton"
}
</script>

<style lang="scss" scoped>
.button {
  background: #2F7DF2;
  color: white;
  padding: 20px 10px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  font-weight: 500;

  &:hover {
    background: #2572e3;
  }
}
</style>