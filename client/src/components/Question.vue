<template>
  <div class="box">

        <div class="question-title">
            <p>Q. {{question.question_txt}}</p>
            <!-- <p>{{clicked}}</p> -->
        </div>
        <div v-if="hasImage != ''" class="question-image">
            <!-- <img v-bind:src="question.url" alt=""> -->
        </div>
        <!-- qType: multiSelect -->
        <div v-if="question.answer_type == 'multi-select'" class="multi-select">
            <div class="answer-box" v-for="(ans, i) in question.answer_example" :key="i">
                <button @click="clicked[i] = !clicked[i]" :class="{'selected': clicked[i] == true}" type="button" class="btn-primary-answer btn-50-ans">{{ans.answer_txt}}</button>
            </div>
        </div>
        <!-- qType: singleSelect -->
        <div v-else-if="question.answer_type == 'single-select'" class="single-select">
            <div class="answer-box" v-for="(ans, i) in question.answer_example" :key="i">
                <button @click="clicked[i] = !clicked[i]" :class="{'selected': clicked[i] == true}" type="button" class="btn-primary-answer btn-50-ans">{{ans.answer_txt}}</button>
            </div>
        </div>
        <!-- qType: shortAnswer -->
        <div v-else-if="question.answer_type == 'short-answer'" class="short-answer">
            <div class="input-group">
                <input type="text" class="form-input" v-bind:placeholder="question.placeholder">
            </div>
        </div>        
  </div>
</template>

<script>

export default {
    props: {
        question: Object,
    },
    data() {
        return {
            // qType: this.question.answer_type,
            hasImage: '',
            // answers: this.question.answer_example || '',
            clicked: new Array(this.question.answer_example.length).fill(false),
            // inputMessage: this.question.placeholder || ''
        }
    },

}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 28px;

    .question-title {
        @include text-style(18, $primary);
        display: flex;
        justify-content: flex-start;
        align-items: center; 

        @media screen and (max-width: $md-breakpoint) {
            @include text-style(14, $primary);
        }

        p {
            text-align: center;
        }
    }

    .selected {
        /* border: 2px solid $secondary; */
        background-color: $blue-dark;
    }

    .answer-box {
        display: inline-flex;

        margin: 4px;

        @media screen and (max-width: $md-breakpoint) {
            
        }

    }

    .short-answer {
        margin: 8px;
    }

    .multi-select,
    .single-select {

        /* width: 80%; */
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
    }
}
</style>