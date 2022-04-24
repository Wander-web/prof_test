<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__content-title">
        <slot name="title"></slot>
      </div>
      <div class="modal__content-text">
        <slot name="text"></slot>
      </div>
      <div class="modal__content-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;

  &__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    max-width: 50%;

    @media (max-width: 400px) {
      max-width: 80%;
    }

    &-title {
      font-weight: 600;
      font-size: 30px;
      padding: 20px;
      border-bottom: 1px solid gray;
    }

    &-text {
      max-height: 50vh;
      overflow: auto;
      padding: 20px;
    }
    &-actions {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>