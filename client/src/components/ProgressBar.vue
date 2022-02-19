<template>
  <div class="container">
      <!-- <p>{{ percent }}%</p> -->
      <div class="loading-bar">
          <div class="percentage" :style="{'width': percentage + '%'}"></div>
          <div class="stepper-one"></div>
          <div class="stepper-two"></div>
      </div>
        <div class="big-title">
            <h4 v-if="percentage < 6.66666666666666">
                키트 업로드&nbsp;<i class="fas fa-file-upload"></i>
            </h4>
            <h4 v-if="percentage < 66.66666666666666 && percentage >= 6.66666666666666">
                가슴 진단&nbsp;<i class="fas fa-magic"></i>
            </h4>
            <h4 v-if="percentage >= 66.66666666666666">
                취향 진단&nbsp;<i class="fas fa-hand-sparkles"></i>
            </h4>
        </div>      
  </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        w: Number,
        percentage: Number,
    },
    data() {
        return {
        }
    },
    computed: {
        // percent() {
        //     return this.percentage.toFixed()
        // },
 
        // percentage() {
        //     if (this.step === 1) return 3
        //     else return parseInt(100/(this.testSize+2), 10) * (this.currentStep + 1 + 2)
        // }
    },

}
</script>

<style lang="scss" scoped>
.container {
    @include text-style(12, $tertiary);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: right;
    font-size: 16px;
    color: $primary;
/* 
    p {
        margin: 4px;
    } */
}
.loading-bar {
    position: relative;
    width: 320px;
    height: 16px;
    border-radius: 15px;
    overflow: hidden;
    background-color: #FCECDD;
    /* background-color: #F7D3BA; */
    /* border-bottom: 1px solid ; */

    @media screen and (max-width: $md-breakpoint) {
        width: 280px;
        height: 12px;
    }

    .percentage {
        position: absolute;
        top: 1px; left: 1px; right: 1px;
        display: block;
        height: 100%;
        /* width: 50%; */
        border-radius: 15px;
        background-color: $blue;
        background-size: 30px 30px;
        background-image: linear-gradient(135deg, rgba($color: $white, $alpha: .15) 25%, transparent 25%,
                                transparent 50%, rgba($color: $white, $alpha: .15) 50%,
                                rgba($color: $white, $alpha: .15) 75%, transparent 75%,
                                transparent);
        animation: animate-stripes 3s linear infinite;
    }

    .stepper-one {
        position: absolute;
        height: 100%;
        left: 3.666666666666667%;
        // top: 0.5px; 
        display: block; 
        width: 16px;
        border-radius: 50%;
        // z-index: 2;
        background-color: $blue;  
        opacity: 30%; 
        @media screen and (max-width: $md-breakpoint) {
            width: 12px;
            // height: 10px;
        }   
    }

    .stepper-two {
        position: absolute;
        height: 100%;
        left: 63.6666666666667%;
        // top: 0.5px; 
        display: block; 
        width: 16px;
        border-radius: 50%;
        // z-index: 2;
        background-color: $blue;   
        opacity: 30%;
        @media screen and (max-width: $md-breakpoint) {
            width: 12px;
            // height: 10px;
        }   
    }    

}

.big-title {
    h4 {
        @include text-style(16);            
        color: $blue-dark;
        font-weight: bold;
        padding: 16px;

        @media screen and (max-width: 414px) {
            @include text-style(14);
            padding: 8px;
        }
    }
}

@keyframes animate-stripes {
    0% { background-position: 0 0; }
    100% { background-position: 60px 0;}
}

</style>