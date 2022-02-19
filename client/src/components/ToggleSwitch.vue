<template>
  <div class="panel panel-default ">
    <div class="panel-body">  
      <!--Only code you need is this label-->
      <label class="switch">
        <input type="checkbox" @click="toggleCheckbox">
        <div class="slider round"></div>
      </label>
    </div>
  </div>  
</template>

<script>
export default {
    data() {
        return {
            checkbox: false,
        }
    },
    methods: {
        toggleCheckbox() {
            this.checkbox = !this.checkbox
        this.emitter.emit('setCheckboxVal', this.checkbox)
        }
    },
}
</script>

<style lang="scss" scoped>
.panel-body {
    display: flex;
    align-items: center;
}
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 21px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $tertiary;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 0.73px;
  bottom: 2.1px;
  background-color: $white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $blue;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(23px);
  -ms-transform: translateX(23px);
  transform: translateX(23px);
}

.slider.round {
  border-radius: 32px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>