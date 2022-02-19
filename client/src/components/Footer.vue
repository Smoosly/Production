<template>
  <footer>
    <div class="container">
      <div class="columns">
        <div class="column company-name">스무슬리</div>
        <div class="column has-text-right">
          <a href="https://www.instagram.com/" target="_blank" class="icon"><i class="fab fa-instagram"></i></a>
          <a href="#" target="_blank" class="icon"><i class="fas fa-comments"></i></a>
          <a href="mailto:smoosly23@gmail.com" class="icon"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <p>
        서울특별시 종로구 혜화동 창경궁로35길 38 킹고 스타트업 스페이스 3층
        <br />
        대표: 류승혜 | 사업자등록번호: 759-07-02074 | 고객센터: smoosly23@gmail.com
      </p>
      <br />
      <p class="others">
        <a href="https://discreet-puck-4be.notion.site/0d96757d00884e02987f1a021f532c87" target="_blank" >이용약관 | </a>
        <a href="https://discreet-puck-4be.notion.site/4e2a2e6c1ae740c0b6da1e88d141c8c8" target="_blank" >개인정보처리방침 | </a>
        <a href="http://pf.kakao.com/_idaxjb" target="_blank">카톡채널을 통해 문의하기 </a>
      </p>
      <br />
      <span class="copyrights"> 2022 Smoosly. All rights reserved</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
*:not(i) {
  font-family: "Noto Sans KR", sans-serif !important;
}
footer {
  font-size: 12px;
  color: rgb(85, 85, 85);
  background-color: $footer;

  .container {
    position: relative;
    padding: 30px;
    .columns {
      display: flex;
      flex-direction: row;
      transition: 0.5s ease all;
      margin: 0 auto;
      @media (min-width: 1140px) {
        max-width: 1140px;
      }
    }

    .column {
      margin-right: 16px;
    }

    .company-name {
      @include flexbox(flex-start);
      font-size: 12px;
      font-weight: bold;
    }

    .has-text-right {
      @include flexbox(flex-end);
      margin-left: auto;
    }
  }

  .icon {
    position: relative;
    right: 0;
    color: rgb(85, 85, 85);
    margin-left: 16px;
    font-size: 24px;

    &:hover {
      color: $tertiary;
    }
  }

  .others {
    a:hover {
      color: $tertiary;
    }
  }
}
</style>
