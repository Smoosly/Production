<template>
  <div class="body">
    <h3>접근 권한이 없습니다&nbsp;<i class="far fa-frown"></i></h3>
    
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.body {
  /* z-index: 110; */
  /* margin: 20px; */
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    @include text-style(18, $secondary);
    margin-bottom: 8px;

  }

  .input-group {
    margin: 8px 0;
    width: 300px;
  }

  button {
    margin-top: 8px;
    width: 300px;
  }

  p {
    @include text-style(14, $red);
  }
}
</style>
