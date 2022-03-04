<template>
  <div class="body">
    <div data-aos="fade-down" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="title">
      <h1>추천 브라 리뷰</h1>
      <p>
        추천된 브라는 만족스러웠나요? <br />
        <span>총 <strong>11</strong>개 문항으로, 약 5분 소요됩니다.</span>
      </p>
    </div>
    <div class="container">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="comment">
        <p
          v-if="
            isCompleted1 == true &&
            isCompleted2 == true &&
            isCompleted3 == true &&
            ((questionData[3] != null && isCompleted4 == true) || (questionData[3] == null && isCompleted4 == false))
          "
          class="complete-review"
        >
          리뷰를 모두 작성했어요&nbsp;<i class="far fa-laugh-squint"></i>&nbsp;&nbsp;
          <span @click="this.emitter.emit('DeliveryModal', true)">반송 신청하기</span>
        </p>
        <p v-else><i class="fas fa-angle-double-down"></i>&nbsp;리뷰할 브라를 클릭해 주세요!&nbsp;<i class="fas fa-angle-double-down"></i></p>
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="selection">
        <!-- click하면 step = 1 -->
        <div @click="step = 0" class="option">
          <span @click="step = 0">1</span>
          <img @click="step = 0" :class="{ mouseOn: isCompleted1 == false }" src="@/assets/bras/bra1.png" alt="" />
          <p @click="step = 0" v-if="isCompleted1 == false">리뷰하기<br /><i @click="step = 0" class="fas fa-edit"></i></p>
          <p class="completed" v-if="isCompleted1 == true">작성완료</p>
        </div>
        <div @click="step = 1" class="option">
          <span @click="step = 1">2</span>
          <img @click="step = 1" :class="{ mouseOn: isCompleted2 == false }" src="@/assets/bras/bra2.png" alt="" />
          <p @click="step = 1" v-if="isCompleted2 == false">리뷰하기<br /><i @click="step = 1" class="fas fa-edit"></i></p>
          <p class="completed" v-if="isCompleted2 == true">작성완료</p>
        </div>
        <div @click="step = 2" class="option">
          <span @click="step = 2">3</span>
          <img @click="step = 2" :class="{ mouseOn: isCompleted3 == false }" src="@/assets/bras/bra3.png" alt="" />
          <p @click="step = 2" v-if="isCompleted3 == false">리뷰하기<br /><i @click="step = 2" class="fas fa-edit"></i></p>
          <p class="completed" v-if="isCompleted3 == true">작성완료</p>
        </div>
        <div @click="step = 3" class="option">
          <span @click="step = 3" v-if="questionData[3] != null">4</span>
          <img @click="step = 3" :class="{ mouseOn: isCompleted4 == false }" v-if="questionData[3] != null" src="@/assets/bras/bra4.png" alt="" />
          <p @click="step = 3" v-if="questionData[3] != null && isCompleted4 == false">리뷰하기<br /><i @click="step = 3" class="fas fa-edit"></i></p>
          <p class="completed" v-if="questionData[3] != null && isCompleted4 == true">작성완료</p>
          <!-- when no 4th Image -->
          <!-- <img v-if="questionData[3] == null" src="@/assets/bras/bra4_none.png" alt=""> -->
        </div>
      </div>
      <div class="review">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="review-title">
          <h2>
            <span>{{ step + 1 }}</span
            >{{ questionData[step].brandName }} {{ questionData[step].braName }}
          </h2>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step === 0 && questionData[0]" class="braimage-box">
          <img src="braRecommend/getImg/bra/1" alt="" />
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step === 1 && questionData[1]" class="braimage-box">
          <img src="braRecommend/getImg/bra/2" alt="" />
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step === 2 && questionData[2]" class="braimage-box">
          <img src="braRecommend/getImg/bra/3" alt="" />
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="step === 3 && questionData[3]" class="braimage-box">
          <img src="braRecommend/getImg/bra/4" alt="" />
        </div>
        <div class="survey-container">
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q0" class="question-container one">
            <div class="question-title">
              <h3><span>1.</span>&nbsp;배송된 사이즈 중 어떤 것이 가장 괜찮았나요?</h3>
            </div>
            <div class="answer-box">
              <ul>
                <li>
                  <input id="size1" type="radio" name="size" v-model="answers_save[step].q1" value="1" />
                  <label for="size1">{{ questionData[step].recommendSize[0] }}</label>
                </li>
                <li>
                  <input id="size2" type="radio" name="size" v-model="answers_save[step].q1" value="2" />
                  <label for="size2">{{ questionData[step].recommendSize[1] }}</label>
                </li>
                <li v-if="questionData[step].sizeNum >= 3">
                  <input id="size3" type="radio" name="size" v-model="answers_save[step].q1" value="3" />
                  <label for="size3">{{ questionData[step].recommendSize[2] }}</label>
                </li>
                <li v-if="questionData[step].sizeNum === 4">
                  <input id="size4" type="radio" name="size" v-model="answers_save[step].q1" value="4" />
                  <label for="size4">{{ questionData[step].recommendSize[3] }}</label>
                </li>
                <li v-else-if="questionData[step].sizeNum === 2">
                  <input id="size3" type="radio" name="size" v-model="answers_save[step].q1" value="0" />
                  <label for="size3">{{ "없음" }}</label>
                </li>
              </ul>
            </div>
            <div class="message">
              <p v-if="questionData[step].sizeNum === 3"><i class="far fa-check-square"></i>&nbsp;앞으로 모든 질문은 방금 응답한 사이즈를 기준으로 답변해 주세요!&nbsp;</p>
              <p v-if="questionData[step].sizeNum === 2"><i class="far fa-check-square"></i>&nbsp;'없음'을 선택했다면, 앞으로 모든 질문은 그나마 가장 나았던 사이즈를 기준으로 답변해 주세요!&nbsp;</p>
              <!--<p><i class="far fa-check-square"></i>&nbsp;없음 답변 있는 경우만 보이게 - questionData[step].sizeNum === 2일 때만 없음 선택한 경우 그나마 나은걸 기준으로 답변하라고 하기 - 멘트정해야함&nbsp;</p>-->
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q1" class="question-container two">
            <div class="question-title">
              <h3><span>2.</span>&nbsp;전체적인 착용감은 어땠나요?</h3>
            </div>
            <div class="answer-box">
              <ul>
                <li>
                  <input id="wearing1" type="radio" name="wearing" v-model="answers[step].FIT" value="1" />
                  <label for="wearing1">만족스러움</label>
                </li>
                <li>
                  <input id="wearing2" type="radio" name="wearing" v-model="answers[step].FIT" value="0" />
                  <label for="wearing2">불만족스러움</label>
                </li>
              </ul>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q2" class="question-container three">
            <div class="question-title">
              <h3><span>3.</span>&nbsp;몇 번째 후크를 채우셨나요?</h3>
            </div>
            <div v-if="questionData[step].hookNum === null" class="sub-msg">
              <p><i class="fas fa-exclamation-circle"></i>&nbsp;다음 질문으로 이동해 주세요.</p>
            </div>
            <div v-if="questionData[step].hookNum !== null" class="question-image hook-image">
              <!-- 후크 개수에 따라 다른 이미지 -->
              <img v-if="questionData[step].hookNum == 3" src="@/assets/hookImages/hook_3.png" alt="" />
              <img v-if="questionData[step].hookNum == 4" src="@/assets/hookImages/hook_4.png" alt="" />
            </div>
            <div v-if="questionData[step].hookNum !== null" class="answer-box horizon-hook">
              <ul>
                <li v-for="i in questionData[step].hookNum" :key="i">
                  <input :id="`hook${i}`" type="radio" name="hook" v-model="answers[step].HOOK" :value="i" />
                  <label :for="`hook${i}`">{{ i }}</label>
                </li>
              </ul>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q3" class="question-container four">
            <div class="question-title">
              <h3><span>4.</span>&nbsp;밑둘레는 어떤 느낌이었나요?</h3>
            </div>
            <div class="answer-box horizontal">
              <ul>
                <li v-for="i in 11" :key="i">
                  <label :for="`bandpressure${i}`">{{ i - 1 }}</label>
                  <input :id="`bandpressure${i}`" type="radio" name="bandpressure" v-model="answers[step].BAND_PRESSURE" :value="i - 1" />
                </li>
              </ul>
              <p><span class="start">안입은 듯</span><span class="end">꽉 잡아주는</span></p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q4" class="question-container five">
            <div class="question-title">
              <h3><span>5.</span>&nbsp;밑둘레의 착용감은 만족스러운가요?</h3>
            </div>
            <div class="answer-box">
              <ul>
                <li>
                  <input id="under-wearing1" type="radio" name="under-wearing" v-model="answers[step].BAND_FIT" value="0" />
                  <label for="under-wearing1">불편함</label>
                </li>
                <li>
                  <input id="under-wearing2" type="radio" name="under-wearing" v-model="answers[step].BAND_FIT" value="1" />
                  <label for="under-wearing2">불편하지만 참을 수 있음</label>
                </li>
                <li>
                  <input id="under-wearing3" type="radio" name="under-wearing" v-model="answers[step].BAND_FIT" value="2" />
                  <label for="under-wearing3">좋음</label>
                </li>
              </ul>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q5" class="question-container six">
            <div class="question-title">
              <h3><span>6.</span>&nbsp;불편 사항이 있었던 것에 모두 체크해 주세요.</h3>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options cup">
              <div class="image-box">
                <img src="@/assets/review6_1.png" alt="" />
              </div>
              <div class="answer-box">
                <h4>컵 관련</h4>
                <ul>
                  <li>
                    <input id="cup-complain1" type="checkbox" value="1" v-model="answers_save[step].q6" />
                    <label for="cup-complain1">컵 넘침</label>
                  </li>
                  <li>
                    <input id="cup-complain2" type="checkbox" value="2" v-model="answers_save[step].q6" />
                    <label for="cup-complain2">윗컵 들뜸</label>
                  </li>
                  <li>
                    <input id="cup-complain3" type="checkbox" value="3" v-model="answers_save[step].q6" />
                    <label for="cup-complain3">아래컵 들뜸</label>
                  </li>
                  <li>
                    <input id="cup-complain4" type="checkbox" value="4" v-model="answers_save[step].q6" />
                    <label for="cup-complain4">컵 밀착이 안됨</label>
                  </li>
                  <li>
                    <input id="cup-complain5" type="checkbox" value="5" v-model="answers_save[step].q6" />
                    <label for="cup-complain5">컵 모양 부적합</label>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options wire">
              <div class="image-box">
                <img src="@/assets/review6_2.png" alt="" />
              </div>
              <div class="answer-box">
                <h4>와이어 관련</h4>
                <ul>
                  <li>
                    <input id="wire-complain1" type="checkbox" value="6" v-model="answers_save[step].q6" />
                    <label for="wire-complain1">와이어 압박감</label>
                  </li>
                  <li>
                    <input id="wire-complain2" type="checkbox" value="7" v-model="answers_save[step].q6" />
                    <label for="wire-complain2">와이어가 살을 찌름</label>
                  </li>
                  <li>
                    <input id="wire-complain3" type="checkbox" value="8" v-model="answers_save[step].q6" />
                    <label for="wire-complain3">와이어가 들뜸</label>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options under">
              <div class="image-box">
                <img src="@/assets/review6_3.png" alt="" />
              </div>
              <div class="answer-box">
                <h4>밑둘레 관련</h4>
                <ul>
                  <li>
                    <input id="under-complain1" type="checkbox" value="9" v-model="answers_save[step].q6" />
                    <label for="under-complain1">와이어 압박감</label>
                  </li>
                  <li>
                    <input id="under-complain2" type="checkbox" value="10" v-model="answers_save[step].q6" />
                    <label for="under-complain2">와이어가 살을 찌름</label>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options shoulder">
              <div class="image-box">
                <img src="@/assets/review6_4.png" alt="" />
              </div>
              <div class="answer-box">
                <h4>어깨끈 관련</h4>
                <ul>
                  <li>
                    <input id="shoulder-complain1" type="checkbox" value="11" v-model="answers_save[step].q6" />
                    <label for="shoulder-complain1">어깨끈이 너무 좁음</label>
                  </li>
                  <li>
                    <input id="shoulder-complain2" type="checkbox" value="12" v-model="answers_save[step].q6" />
                    <label for="shoulder-complain2">어깨끈이 너무 넓음</label>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options others">
              <div class="image-box">
                <img src="@/assets/review6_5.png" alt="" />
              </div>
              <div class="answer-box">
                <h4>기타</h4>
                <ul>
                  <li>
                    <input id="others-complain1" type="checkbox" value="13" v-model="answers_save[step].q6" />
                    <label for="others-complain1">부유방이 삐져나옴</label>
                  </li>
                  <li>
                    <input id="others-complain2" type="checkbox" value="14" v-model="answers_save[step].q6" />
                    <label for="others-complain2">겨드랑이 살이 쓸림</label>
                  </li>
                  <li>
                    <input id="others-complain3" type="checkbox" value="15" v-model="answers_save[step].q6" />
                    <label for="others-complain3">날개 너비가 좁아 살이 파고듦</label>
                  </li>
                </ul>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" class="options nothing">
              <input id="nothing" type="checkbox" value="0" v-model="answers_save[step].q6" />
              <label for="nothing">전체 해당사항 없음</label>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q10" class="question-container seven">
            <div class="question-title">
              <h3><span>7.</span>&nbsp;원하는 기능을 만족시켰나요?</h3>
            </div>
            <div v-if="!yesFunc" class="sub-msg">
              <p><i class="fas fa-exclamation-circle"></i>&nbsp;원하는 기능을 선택하지 않으셨습니다.</p>
            </div>
            <div class="answerboxs">
              <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="braFunc[0]" class="answer-box">
                <h4>모아주기</h4>
                <ul>
                  <li>
                    <input id="gather1" type="radio" name="gather" v-model="answers[step].SATIS_GATHER" value="0" />
                    <label for="gather1">부족함</label>
                  </li>
                  <li>
                    <input id="gather2" type="radio" name="gather" v-model="answers[step].SATIS_GATHER" value="1" />
                    <label for="gather2">딱 좋음</label>
                  </li>
                  <li>
                    <input id="gather3" type="radio" name="gather" v-model="answers[step].SATIS_GATHER" value="2" />
                    <label for="gather3">너무 과함</label>
                  </li>
                </ul>
              </div>
              <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="braFunc[1]" class="answer-box">
                <h4>올려주기</h4>
                <ul>
                  <li>
                    <input id="pushup1" type="radio" name="pushup" v-model="answers[step].SATIS_PUSHUP" value="0" />
                    <label for="pushup1">부족함</label>
                  </li>
                  <li>
                    <input id="pushup2" type="radio" name="pushup" v-model="answers[step].SATIS_PUSHUP" value="1" />
                    <label for="pushup2">딱 좋음</label>
                  </li>
                  <li>
                    <input id="pushup3" type="radio" name="pushup" v-model="answers[step].SATIS_PUSHUP" value="2" />
                    <label for="pushup3">너무 과함</label>
                  </li>
                </ul>
              </div>
              <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="braFunc[2]" class="answer-box">
                <h4>받쳐주기</h4>
                <ul>
                  <li>
                    <input id="under1" type="radio" name="underup" v-model="answers[step].SATIS_SURGE" value="0" />
                    <label for="under1">부족함</label>
                  </li>
                  <li>
                    <input id="under2" type="radio" name="underup" v-model="answers[step].SATIS_SURGE" value="1" />
                    <label for="under2">딱 좋음</label>
                  </li>
                </ul>
              </div>
              <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="braFunc[3]" class="answer-box">
                <h4>부유방 보정</h4>
                <ul>
                  <li>
                    <input id="accBreast1" type="radio" name="accBreast" v-model="answers[step].SATIS_ACCBREAST" value="0" />
                    <label for="accBreast1">부족함</label>
                  </li>
                  <li>
                    <input id="accBreast2" type="radio" name="accBreast" v-model="answers[step].SATIS_ACCBREAST" value="1" />
                    <label for="accBreast2">딱 좋음</label>
                  </li>
                </ul>
              </div>
              <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" v-if="braFunc[4]" class="answer-box">
                <h4>등살 보정</h4>
                <ul>
                  <li>
                    <input id="accBack1" type="radio" name="accBack" v-model="answers[step].SATIS_ACCBACK" value="0" />
                    <label for="accBack1">부족함</label>
                  </li>
                  <li>
                    <input id="accBack2" type="radio" name="accBack" v-model="answers[step].SATIS_ACCBACK" value="1" />
                    <label for="accBack2">딱 좋음</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q6" class="question-container eight">
            <div class="question-title">
              <h3><span>8.</span>&nbsp;퀄리티는 어땠나요?</h3>
            </div>
            <div class="answer-box">
              <ul>
                <li>
                  <input id="quality1" type="radio" name="quality" v-model="answers[step].QUALITY" value="2" />
                  <label for="quality1">만족스러움</label>
                </li>
                <li>
                  <input id="quality2" type="radio" name="quality" v-model="answers[step].QUALITY" value="1" />
                  <label for="quality2">보통</label>
                </li>
                <li>
                  <input id="quality3" type="radio" name="quality" v-model="answers[step].QUALITY" value="0" />
                  <label for="quality3">불만족스러움</label>
                </li>
              </ul>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q7" class="question-container nine">
            <div class="question-title">
              <h3><span>9.</span>&nbsp;전반적인 만족도는 몇 점인가요?</h3>
            </div>
            <div class="answer-box horizontal">
              <ul>
                <li v-for="i in 11" :key="i">
                  <label :for="`total${i}`">{{ i - 1 }}</label>
                  <input :id="`total${i}`" type="radio" name="total" v-model="answers[step].TOTAL_SCORE" :value="i - 1" />
                </li>
              </ul>
              <p><span class="start">불만족</span><span class="end">만족</span></p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q8" class="question-container ten">
            <div class="question-title">
              <h3><span>10.</span>&nbsp;이 제품을 구매하시나요?</h3>
            </div>
            <div class="answer-box">
              <ul>
                <li>
                  <input id="purchase1" type="radio" name="purchase" v-model="answers[step].PURCHASE" value="1" />
                  <label for="purchase1">네</label>
                </li>
                <li>
                  <input id="purchase2" type="radio" name="purchase" v-model="answers[step].PURCHASE" value="0" />
                  <label for="purchase2">아니오</label>
                </li>
              </ul>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000" id="q9" class="question-container eleven">
            <div class="question-title">
              <h3><span>11.</span>&nbsp;구매한다면, 혹은 하지 않는다면 그 이유를 자유롭게 적어주세요.</h3>
            </div>
            <div class="answer-box">
              <div class="input-group">
                <input v-model="answers[step].PURCHASE_REASON" type="text" class="form-input" placeholder="" />
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <div class="button">
            <button @click="submit" type="button" class="btn-primary btn-55">완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      step: 0,
      deliverTousDate: "",
      isMouseOver1: false,
      isMouseOver2: false,
      isMouseOver3: false,
      isMouseOver4: false,
      isCompleted1: false,
      isCompleted2: false,
      isCompleted3: false,
      isCompleted4: false,

      // 앞에서 부터 '모아주기-올려주기-받쳐주기-부유방-등살'
      braFunc: [false, false, false, false, false],
      yesFunc: false,

      questionData: [
        {
          pkItem: "",
          oldKey: "",
          brandName: "",
          braName: "",
          recommendSize: [],
          sizeNum: 0,
          hookNum: 0,
        },
        { pkItem: "", oldKey: "", brandName: "", braName: "", recommendSize: [], sizeNum: 0, hookNum: 0 },
        { pkItem: "", oldKey: "", brandName: "", braName: "", recommendSize: [], sizeNum: 0, hookNum: 0 },
        null,
      ],
      answers_save: [
        {
          q1: null, // 0~2중에서
          q6: [], // 6번은 16개 복수선택이므로 아래 배열로
        },
        { q1: null, q6: [] },
        { q1: null, q6: [] },
        { q1: null, q6: [] },
      ],
      answers: [
        {
          PK_ID: this.$store.state.PK_ID, //PK_ID

          PK_ITEM: "",
          OLD_KEY: "",
          PK_SIZE: "",

          FIT: null, // 0~1
          HOOK: null, // 후크 개수 범위 1~n
          BAND_PRESSURE: null, // 0~10
          BAND_FIT: null, // 0~2

          UNCOM_DETAIL: "",

          //아래 기능 중 선택한 것만 답변 있고 선택 안한 경우 null
          SATIS_GATHER: null, // 0~2
          SATIS_PUSHUP: null, // 0~2
          SATIS_SURGE: null, // 0~1
          SATIS_ACCBREAST: null, // 0~1
          SATIS_ACCBACK: null, // 0~1

          QUALITY: null, // 0~2
          TOTAL_SCORE: null, // 0~10
          PURCHASE: null, // 0~1
          PURCHASE_REASON: null,
        },
        {
          PK_ID: this.$store.state.PK_ID,
          PK_ITEM: "",
          OLD_KEY: "",
          PK_SIZE: "",
          FIT: null,
          HOOK: null,
          BAND_PRESSURE: null,
          BAND_FIT: null,
          UNCOM_DETAIL: "",
          SATIS_GATHER: null,
          SATIS_PUSHUP: null,
          SATIS_SURGE: null,
          SATIS_ACCBREAST: null,
          SATIS_ACCBACK: null,
          QUALITY: null,
          TOTAL_SCORE: null,
          PURCHASE: null,
          PURCHASE_REASON: null,
        },
        {
          PK_ID: this.$store.state.PK_ID,
          PK_ITEM: "",
          OLD_KEY: "",
          PK_SIZE: "",
          FIT: null,
          HOOK: null,
          BAND_PRESSURE: null,
          BAND_FIT: null,
          UNCOM_DETAIL: "",
          SATIS_GATHER: null,
          SATIS_PUSHUP: null,
          SATIS_SURGE: null,
          SATIS_ACCBREAST: null,
          SATIS_ACCBACK: null,
          QUALITY: null,
          TOTAL_SCORE: null,
          PURCHASE: null,
          PURCHASE_REASON: null,
        },
        {
          PK_ID: this.$store.state.PK_ID,
          PK_ITEM: "",
          OLD_KEY: "",
          PK_SIZE: "",
          FIT: null,
          HOOK: null,
          BAND_PRESSURE: null,
          BAND_FIT: null,
          UNCOM_DETAIL: "",
          SATIS_GATHER: null,
          SATIS_PUSHUP: null,
          SATIS_SURGE: null,
          SATIS_ACCBREAST: null,
          SATIS_ACCBACK: null,
          QUALITY: null,
          TOTAL_SCORE: null,
          PURCHASE: null,
          PURCHASE_REASON: null,
        },
      ],
    };
  },
  watch: {
    answers_save: {
      deep: true,
      handler(newVal) {
        //q1
        console.log("step", this.step);
        // console.log(newVal);
        console.log(newVal[this.step]);
        console.log(this.questionData[this.step].recommendSize[Number(newVal[this.step].q1)-1]);
        this.answers[this.step].PK_SIZE = this.questionData[this.step] && this.questionData[this.step].pkItem.slice(0,2) + this.questionData[this.step].recommendSize[Number(newVal[this.step].q1)-1];
        if (Number(newVal[this.step].q1) === 0) {
          this.answers[this.step].PK_SIZE = null;
        }
        console.log(this.answers[this.step].PK_SIZE);
        //q6
        // console.log("-------q6 start--------");
        this.answers[this.step].UNCOM_DETAIL = "";
        let q6 = Object.values(newVal[this.step].q6);
        q6 = q6.map((col) => Number(col));
        // console.log(q6);
        // console.log(q6[q6.length-1]);
        if (q6.length > 1 && q6[q6.length - 1] === 0) {
          return (this.answers_save[this.step].q6 = ["0"]);
        }
        if (q6.length > 1 && q6[0] === 0) {
          q6.splice(0, 1);
          q6 = q6.map((col) => String(col));
          return (this.answers_save[this.step].q6 = q6);
        }
        // console.log(q6);
        q6.sort((a, b) => {
          return a - b;
        });
        q6.forEach((col) => {
          this.answers[this.step].UNCOM_DETAIL += col + ",";
        });
        // console.log(this.answers[this.step].UNCOM_DETAIL);
        // console.log("-------q6 end--------");
      },
    },
    answers: {
      deep: true,
      handler(newVal) {
        newVal.forEach((element) => {
          if (element.FIT !== null) element.FIT = Number(element.FIT);
          if (element.BAND_FIT !== null) element.BAND_FIT = Number(element.BAND_FIT);
          if (element.SATIS_GATHER !== null) element.SATIS_GATHER = Number(element.SATIS_GATHER);
          if (element.SATIS_PUSHUP !== null) element.SATIS_PUSHUP = Number(element.SATIS_PUSHUP);
          if (element.SATIS_SURGE !== null) element.SATIS_SURGE = Number(element.SATIS_SURGE);
          if (element.SATIS_ACCBREAST !== null) element.SATIS_ACCBREAST = Number(element.SATIS_ACCBREAST);
          if (element.SATIS_ACCBACK !== null) element.SATIS_ACCBACK = Number(element.SATIS_ACCBACK);
          if (element.QUALITY !== null) element.QUALITY = Number(element.QUALITY);
          if (element.PURCHASE !== null) element.PURCHASE = Number(element.PURCHASE);
        });
      },
    },
  },
  methods: {
    fetchQuestionData() {
      axios
        .get("/review/getQuestionData")
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.braFunc = result.data.braFunc;
            this.yesFunc = result.data.yesFunc;
            this.questionData = result.data.questionData;
            for (const idx in result.data.questionData) {
              this.answers[idx].PK_ITEM = result.data.questionData[Number(idx)].pkItem;
              this.answers[idx].OLD_KEY = result.data.questionData[Number(idx)].oldKey;
            }
            this.fetchReviewData();
          }
        })
        .catch(console.log);
    },
    fetchReviewData() {
      axios
        .get("/review/getReviewData")
        .then((result) => {
          console.log(result.data);
          const reviews = result.data.review;
          if (!result.data.success) {
            return;
          }
          for (const review of reviews) {
            if (review.RANKING === 1) {
              console.log(this.questionData[0].recommendSize);
              console.log(review);
              this.answers[0] = review;
              // q1
              let q1 = this.questionData[0].recommendSize.indexOf(review.PK_ITEM.substring(2));
              this.answers_save[0].q1 = `${q1}`;
              // q6
              let q6 = review.UNCOM_DETAIL.slice(0, -1).split(",");
              this.answers_save[0].q6 = q6;
              this.isCompleted1 = true;
            }
            if (review.RANKING === 2) {
              this.answers[1] = review;
              // q1
              let q1 = this.questionData[1].recommendSize.indexOf(review.PK_ITEM.substring(2));
              this.answers_save[1].q1 = `${q1}`;
              // q6
              let q6 = review.UNCOM_DETAIL.slice(0, -1).split(",");
              this.answers_save[1].q6 = q6;
              this.isCompleted2 = true;
            }
            if (review.RANKING === 3) {
              this.answers[2] = review;
              // q1
              let q1 = this.questionData[2].recommendSize.indexOf(review.PK_ITEM.substring(2));
              this.answers_save[2].q1 = `${q1}`;
              // q6
              let q6 = review.UNCOM_DETAIL.slice(0, -1).split(",");
              this.answers_save[2].q6 = q6;
              this.isCompleted3 = true;
            }
            if (review.RANKING === 4) {
              this.answers[3] = review;
              // q1
              let q1 = this.questionData[3].recommendSize.indexOf(review.PK_ITEM.substring(2));
              this.answers_save[3].q1 = `${q1}`;
              // q6
              let q6 = review.UNCOM_DETAIL.slice(0, -1).split(",");
              this.answers_save[3].q6 = q6;
              this.isCompleted4 = true;
            }
          }
        })
        .catch(console.log);
    },
    submit() {
      const answer = this.answers[this.step];
      console.log(answer);
      if (
        answer.BAND_FIT === null ||
        answer.BAND_PRESSURE === null ||
        answer.FIT === null ||
        answer.HOOK === null ||
        answer.PK_SIZE === "" ||
        answer.PURCHASE === null ||
        answer.UNCOM_DETAIL === "" ||
        answer.QUALITY === null ||
        answer.TOTAL_SCORE === null ||
        answer.PURCHASE_REASON === null
      ) {
        const questions = [ answer.PK_SIZE, answer.FIT, answer.HOOK, answer.BAND_PRESSURE, answer.BAND_FIT, answer.UNCOM_DETAIL, answer.QUALITY, answer.TOTAL_SCORE, answer.PURCHASE, answer.PURCHASE_REASON]
        for (let i=0; i<questions.length; i++) {
          if (i !== 4 && questions[i] === null) {
            document.getElementById(`q${i}`).scrollIntoView(false)
            window.scrollBy(0,120)
            break
          }
          if (i === 4 && questions[i] === "") {
            document.getElementById(`q${i}`).scrollIntoView(false)
            window.scrollBy(0,120)
            break
          }
          if (i === 5 && questions[i] === "") {
            document.getElementById(`q${i}`).scrollIntoView(false)
            window.scrollBy(0,120)
            break
          }
        }
        return this.emitter.emit("showRedToast", "입력하지 않은 항목이 있습니다.");
      }
      console.log(this.braFunc);
      if (
        (this.braFunc[0] && answer.SATIS_GATHER === null) ||
        (this.braFunc[1] && answer.SATIS_PUSHUP === null) ||
        (this.braFunc[2] && answer.SATIS_SURGE === null) ||
        (this.braFunc[3] && answer.SATIS_ACCBREAST === null) ||
        (this.braFunc[4] && answer.SATIS_ACCBACK === null)
      ) {
        document.getElementById(`q1`).scrollIntoView(false)
        return this.emitter.emit("showRedToast", "7번 문항에 입력하지 않은 항목이 있습니다.");
      }
      axios
        .post(`/review/save/${this.step + 1}`, answer)
        .then((result) => {
          console.log(result.data);
          if (result.data.success) {
            console.log(result.data.message);
            window.scrollTo(0, 0);
            this.fetchReviewData();
            this.emitter.emit("showToast", result.data.message);
            return;
          } else {
            window.scrollTo(0, 0);
            return this.emitter.emit("showRedToast", result.data.message);
          }
        })
        .catch(console.log);

      window.scrollTo(0, 0);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.fetchQuestionData();
  },
};
</script>

<style lang="scss" scoped>
*:not(i):not(button) {
  font-family: $font-main, sans-serif !important;
  scroll-behavior: smooth;
}
.body {
  /* height: 550vh; */
  height: auto;
  background-color: $gray;
  display: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 180px;

  @media screen and (max-width: $md-breakpoint) {
    padding: 80px 8px;
    /* height: 4300px; */
    height: auto;
  }

  .title {
    margin-bottom: 32px;
    h1 {
      @include text-style(24, $primary);
      font-weight: bold;
      text-align: center;
    }

    p {
      @include text-style(16, $primary);
      text-align: center;
      margin-top: 8px;

      span {
        strong {
          color: $blue-dark;
          font-weight: 600;
        }
      }
    }
  }

  .container {
    width: 95%;
    /* background-color: $white; */
    border-radius: 8px;

    .comment {
      p {
        @include text-style(16, $red);
        text-align: center;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;

        span {
          @include text-style(16, $secondary);
          font-weight: 500;
          text-decoration: underline;

          &:hover {
            color: $tertiary;
          }
        }
      }
      .complete-review {
        color: $green;
        span {
          cursor: pointer;
        }

        @media screen and (max-width: 280px) {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .selection {
      display: flex;
      justify-content: center;
      background-color: $white;
      border-radius: 8px;
      padding: 8px;
      align-items: center;

      .option {
        /* flex-grow: 1; */
        margin: 8px;
        display: flex;
        flex-direction: column;
        position: relative;
        cursor: pointer;

        @media screen and (max-width: $md-breakpoint) {
          margin: 2px;
        }

        p {
          @include text-style(18, $blue);
          font-weight: bolder;
          position: absolute;
          text-align: center;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(13, $blue);
          }
        }

        .completed {
          @include text-style(16);
          color: $blue-dark;
          // color: $red;
          font-weight: bold;
          opacity: 0.8;

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14);
          }
        }

        .mouseOn {
          opacity: 0.5;
        }

        .clicked {
          opacity: 0.5;
        }

        span {
          @include text-style(16);
          background-color: $blue;
          color: $white;
          width: 22px;
          padding: 0px 6px;
          border-radius: 50%;
          position: absolute;
          right: 1;
          margin: 4px;
          /* bottom: ; */

          @media screen and (max-width: $md-breakpoint) {
            @include text-style(14);
            width: 20px;
            padding: 0px 6px;
            padding-bottom: 16px;
            height: 22px;
          }
        }

        img {
          /* width: 150px; */
          width: 100%;
          border-radius: 8px;
          box-shadow: 1px 4px 4px 1px $border;
          /* @media screen and (max-width: $md-breakpoint) {
												/* width: 72px; */
          /* width: 100%;
										} */
        }
      }
    }

    .review {
      background-color: $white;
      border-radius: 8px;
      margin-top: 16px;
      padding: 30px 100px;
      @media screen and (max-width: 1031px) {
        padding: 30px 8px;
      }

      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .review-title {
        width: 100%;
        display: flex;
        justify-content: center;
        h2 {
          @include text-style(18, $primary);
          font-weight: bold;
          margin-bottom: 8px;

          @media screen and (min-width: 281px) {
            padding: 0 24px;
            text-align: center;
          }

          span {
            @include text-style(16);
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

      .braimage-box {
        width: 100%;
        display: flex;
        justify-content: center;
        img {
          width: 300px;
          border-radius: 8px;
          box-shadow: 1px 2px 2px 1px $border;

          @media screen and (max-width: $md-breakpoint) {
            width: 256px;
          }

          @media screen and (max-width: 280px) {
            width: 200px;
          }
        }
      }

      .survey-container {
        width: 100%;

        .question-container {
          margin: 64px 0;
          padding-left: 32px;
          padding-right: 32px;
          @media screen and (max-width: 768px) {
            padding-left: 4px;
            padding-right: 4px;
          }

          .question-title {
            @include text-style(16, $primary);
            margin-bottom: 16px;

            @media screen and (max-width: $md-breakpoint) {
              @include text-style(14, $primary);
            }
          }

          .hook-image {
            display: flex;
            justify-content: center;

            img {
              width: 300px;
              @media screen and (max-width: $md-breakpoint) {
                width: 256px;
                margin-bottom: 16px;
              }

              @media screen and (max-width: 280px) {
                width: 216px;
              }
            }
          }

          .answer-box {
            margin-bottom: 16px;

            ul {
              li {
                display: flex;
                margin: 8px;
                flex-wrap: wrap;
                @media screen and (max-width: $md-breakpoint) {
                  margin: 2px;
                }

                @media screen and (max-width: 320px) {
                  margin: 1px;
                }

                label {
                  @include text-style(16, $primary);

                  @media screen and (max-width: $md-breakpoint) {
                    @include text-style(14, $primary);
                  }
                }
              }
            }
          }

          .options {
            display: flex;
            align-items: center;

            @media screen and (max-width: $md-breakpoint) {
              margin-bottom: 16px;
            }
            // @media screen and (max-width: 280px) {
            //   flex-direction: column;
            // }

            .image-box {
              img {
                width: 200px;
              }
            }
          }

          .nothing {
            margin-left: 32px;
          }

          .cup,
          .wire,
          .under,
          .shoulder,
          .others {
            /* @media screen and (max-width: $md-breakpoint) {
														margin-bottom: 8px;
												} */

            .image-box {
              img {
                width: 100px;
                margin-right: 16px;
                @media screen and (max-width: $md-breakpoint) {
                  margin-right: 4px;
                }
                @media screen and (max-width: 280px) {
                  width: 64px;
                }
              }
            }
          }
        }

        .one,
        .two,
        .three,
        .five,
        .six,
        .seven,
        .eight,
        .ten,
        .eleven {
          @media screen and (max-width: $md-breakpoint) {
            margin: 64px 0;
            margin-left: 8px;
          }
        }

        .three,
        .seven {
          .sub-msg {
            @include text-style(14, $red);
            margin: 16px;
          }
        }

        .one {
          .message {
            @include text-style(14, $red);
            margin-left: 8px;
            margin-right: 8px;
          }
        }

        /* .three {
										.horizon-hook {
												display: flex;                   
                        display: flex;                   
												display: flex;                   
										}
								} */

        .six {
          .answer-box {
            h4 {
              @include text-style(16, $blue-dark);
              font-weight: bold;
              margin-bottom: 4px;
              margin-left: 4px;
            }
          }
        }

        .seven {
          .answerboxs {
            width: 100%;
            display: flex;

            justify-content: flex-start;
            flex-wrap: wrap;
            .answer-box {
              margin-bottom: 16px;
              margin-right: 8px;
              background-color: $background;
              padding: 8px 24px;
              border-radius: 8px;
              width: 152px;

              @media screen and (max-width: $md-breakpoint) {
                width: 136px;
              }

              h4 {
                @include text-style(16, $blue-dark);
                font-weight: bold;
                margin-bottom: 8px;
                margin-left: 8px;
              }
            }
          }
        }

        .horizontal {
          display: flex;
          align-items: center;
          flex-direction: column;

          margin: 0 0px;

          p {
            position: relative;
            width: 400px;

            @media screen and (max-width: 1000px) {
              width: 270px;
            }

            @media screen and (max-width: 280px) {
              width: 224px;
            }

            .start {
              @include text-style(14, $blue-dark);
              font-weight: bolder;
              position: absolute;
              left: 0;
            }

            .end {
              @include text-style(14, $blue-dark);
              font-weight: bolder;
              position: absolute;
              right: 0;
            }
          }

          ul {
            list-style: none;
            /* margin-right: 4px; */
          }
          li {
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            label {
              @include text-style(13, $primary);
              text-align: center;
              /* height: 24px; */
            }
          }
        }
      }

      .button-box {
        width: 100%;

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

  /* checkbox, radiobutton custom */
  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type="checkbox"],
    input[type="radio"] {
      --active: #feba27;
      --active-inner: #fff;
      --focus: 2px rgba(221, 139, 16, 0.3);
      --border: #bbc1e1;
      --border-hover: #e49825;
      --background: #fff;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      &:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }
      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }
      &:not(.switch) {
        width: 21px;
        &:after {
          opacity: var(--o, 0);
        }
        &:checked {
          --o: 1;
        }
      }
      & + label {
        font-size: 14px;
        line-height: 21px;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4px;
      }
    }
    input[type="checkbox"] {
      &:not(.switch) {
        border-radius: 7px;
        &:after {
          width: 5px;
          height: 9px;
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 7px;
          top: 4px;
          transform: rotate(var(--r, 20deg));
        }
        &:checked {
          --r: 43deg;
        }
      }
      &.switch {
        width: 38px;
        border-radius: 11px;
        &:after {
          left: 2px;
          top: 2px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: var(--ab, var(--border));
          transform: translateX(var(--x, 0));
        }
        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }
        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: 0.6;
            }
          }
        }
      }
    }
    input[type="radio"] {
      border-radius: 50%;
      &:after {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: var(--active-inner);
        opacity: 0;
        transform: scale(var(--s, 0.7));
      }
      &:checked {
        --s: 0.5;
      }
    }
  }

  /* 
		ul {
		margin: 12px;
		padding: 0;
		list-style: none;
		width: 100%;
		max-width: 320px;
		li {
				margin: 16px 0;
				position: relative;
		}
		} */

  * {
    box-sizing: inherit;
    &:before,
    &:after {
      box-sizing: inherit;
    }
  }
  /* checkbox, radiobutton custom end */

  input[type="checkbox"],
  input[type="radio"] {
    & + label {
      @include text-style(16, $primary);

      @media screen and (max-width: $md-breakpoint) {
        @include text-style(14, $primary);
      }
    }
  }
}
</style>
