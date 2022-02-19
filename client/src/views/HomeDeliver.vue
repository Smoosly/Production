<template>
  <div class="body">
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="title">
      <p>
          입어보기 전에 잠깐!<br />
        <span>홈 피팅</span>에 대해 자세히 설명드릴게요.
      </p>
    </div>
    <div class="container">
      <div class="descript">
        <div class="descript-title">
          <h2>
            * 각 단계 별 주의사항입니다.
          </h2>
        </div>
        <div class="descript-contents">
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="content">
            <h3>1. 피팅</h3>
            <div class="image-box">
              <img src="@/assets/homedeliver/1_fitting.png" alt="">
            </div>
        
            <p>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;택을 제거하지 마세요. <br>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;오염에 주의해 주세요. <br>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;심한 오염/손상을 가할 시, 제품에 대한 가격을 보상해야 합니다. 
            </p>
          
          </div>
          <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="content">
            <h3>2. 가장 잘 맞는 사이즈 선택</h3>
            <div class="image-box">
              <img src="@/assets/homedeliver/2_sizepick.png" alt="">
            </div>
            <p>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;아래의 [올바른 브라 착용법]을 숙지하여 입어본 후 결정해주세요. 
            </p>
            <div class="button-box">
              <button type="button" class="btn-primary btn-40"><a target="_blank" href="https://discreet-puck-4be.notion.site/f9672e96846d460c82aa48a6cb273b25">올바른 브라 착용법</a></button>
            </div>
          
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="content">
            <h3>3. 리뷰 작성</h3>
            <div class="image-box">
              <img src="@/assets/homedeliver/3_review.png" alt="">
            </div>
            <p>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;한 제품의 여러 사이즈를 모두 입었다면 리뷰 작성을 마친 후, 다음 제품을 입어 주세요.
            </p>
          </div>
          <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="content">
            <h3>4. 구매</h3>
            <div class="image-box">
              <img src="@/assets/homedeliver/4_purchase.png" alt="">
            </div>
            <p>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;추천 브라의 상세페이지에 있는 링크를 통해 구매하시면 됩니다. 
            </p>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="content">
            <h3>5. 반송</h3>
            <div class="image-box">
              <img src="@/assets/homedeliver/5_sendback.png" alt="">
            </div>
            <p>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;예약한 반송일자에 맞춰 내놓아주세요.<br>
              <i class="fas fa-check-circle"></i>&nbsp;&nbsp;재포장을 하실 때, 원래 배송이 온 상태처럼 하여 부피를 최소화 해주세요.
            </p>
          </div>                                        
        </div>
        <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  class="msg">
          <p>
            위의 사항이 모두 숙지되었다면, <br>
            추천된 제품 중 하나를 선택해 여러 사이즈를 입어본 후 <br>
            리뷰를 작성해주세요!
          </p>
        </div>
        <div class="button-box">
          <div class="button">
            <button @click="this.$router.push('/review')" type="button" class="btn-primary btn-48">리뷰 쓰기</button>
          </div>
        </div>          
      </div>
    
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    }
  },
 
  mounted() {
    window.scrollTo(0, 0)
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
}
.body {
  /* height: 550vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 96px 8px;
    /* height: 4300px; */
    height: auto;
  }

  .title {
    margin-bottom: 32px;

    p {
      @include text-style(16, $primary);
      text-align: center;
      font-weight: bold;
      margin-top: 8px;

      span {
        font-weight: bolder;
        color: $blue;
      }
    }
  }

  .container {
    width: 65%;
    /* background-color: $white; */
    border-radius: 8px;

    @media screen and (max-width: 540px) {
      width: 95%;
    }


    .descript {
      background-color: $white;
      border-radius: 8px;
      padding: 30px 100px;
      @media screen and (max-width: 1031px) {
        padding: 30px 16px;
      }

      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .descript-title {
        width: 100%;
        display: flex;
        justify-content: center;
        h2 {
          @include text-style(16, $red);
          font-weight: bold;
          margin-bottom: 8px;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $red);
          }
          span {
            @include text-style(14);
            background-color: $blue;
            color: $white;
            width: 22px;
            padding: 2px 6px;
            border-radius: 50%;
            /* position: absolute;
												right: 1; */
            margin: 4px;
            /* bottom: ; */

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14);
              width: 20px;
              padding: 2px 6px;
              /* padding-bottom: 16px; */
              height: 22px;
            }
          }
        }
      }

      .descript-contents {
        display: flex;
        justify-content: center;
        flex-direction: column;

        .content {
          display:flex;
          align-items: center;
          flex-direction: column;
          background-color: $white;
          border: 2px solid $blue-light;
          border-radius: 8px;
          box-shadow: 1px 4px 4px 1px $border;
          width: 100%;
          padding: 16px;
          margin: 16px auto;

          @media screen and (max-width: 360px) {
            padding: 16px 20px;
          }

          h3 {
            @include text-style(18, $primary);
            font-weight: bold;
            margin-bottom: 16px;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(16, $primary);
            }
          }   

          .image-box {
            margin-bottom: 16px;
            img {
              width: 96px;

              @media screen and (max-width: $md-breakpoint) {
                width: 72px;
              }
            }
          }

          /* .how {
            display: flex;
            flex-direction: column;
            margin-left: 32px;
            @media screen and (max-width: $md-breakpoint) {
              margin-left: 8px;
            } */

          p {
            @include text-style(16, $primary);
            line-height: 195%;
            /* font-weight: bold; */
            text-align: center;
            
            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);

            }

            i {
              color: $blue-light;
            }
          }



          .button-box {
            margin-top: 16px;
            display: flex;
            justify-content: center;
          }
          /* } */

        }
      }

      .msg {
        margin: 40px auto;
        p {
          @include text-style(16, $primary);
          line-height: 200%;
          text-align: center;
          font-weight: bold;
          /* font-weight: bold; */

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $primary);
          }
        }
      }

      .button-box {
        width: 100%;
        margin-top: 32px;

        .button {
          display: flex;
          margin: 8px;
          justify-content: center;

          button {
            width: 256px;
          }
        }
      }
    }
  }

}
</style>
