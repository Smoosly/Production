<template>
  <div class="toast-wrapper">
    <div class="toast">
      <i class="fas fa-exclamation-circle"></i>
      {{ showMessage }}
    </div>
  </div>
</template>

<script>
export default {
    props: {
        showMessage: String,
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
  .toast-wrapper {
    position: fixed;
    width: 100%;
    z-index: 150;
    bottom: 20px;
  }
  .toast {
    @include text-style(16);
    text-align: center;
    padding: 20px;
    color: white;
    background: $red;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
  }
</style>