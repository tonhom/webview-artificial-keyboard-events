<template>
  <div>
    <input
      :class="classes"
      :type="inputType"
      v-input-automon="interval"
      @myinput="onMyInput"
      :value="textValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    classes: {
      type: [Object, String],
    },
    interval: {
      type: Number,
      default: 500,
    },
    debounce: {
      type: Number,
      default: 750,
    },
    text: {
      required: true,
    },
  },
  watch: {
    text(val) {
      if (val != null) {
        this.textValue = val;
        this.$emit("onChange", val);
      }
    },
  },
  data: () => ({
    textValue: null,
    lastChar: null,
    lastCharPos: -1,
    timeoutId: null,
  }),
  methods: {
    onChange(value) {
      //#region emit onChange
      if (this.textValue != value.text) {
        clearTimeout(this.timeoutId);
        this.textValue = value.text;

        this.timeoutId = setTimeout(() => {
          this.$emit("update:text", this.textValue);
        }, this.debounce);
      }
      //#endregion
    },
    onInput(value) {
      //#region emit onInput
      // console.log(this.lastChar, value.lastChar)
      // if text length is decrese them mean user press backspace
        // console.log(this.textValue, value.text)
      if (
        value.text != null &&
        this.textValue != null
        
      ) {
        // do nothing
        if(value.text.length < this.textValue.length){
            this.$emit("onInput", "Backspace");
        }
        if(value.text.length <= this.textValue.length) return;
      }

      if (this.lastChar != value.lastChar) {
        // last char is not match
        this.lastChar = value.lastChar;
        this.lastCharPos = value.lastCharPos;
        this.$emit("onInput", value.lastChar);
      } else {
        // last char is match then check position
        if (this.lastCharPos != value.lastCharPos) {
          this.lastChar = value.lastChar;
          this.lastCharPos = value.lastCharPos;
          this.$emit("onInput", value.lastChar);
        }
      }

      //#endregion
    },
    onMyInput(value) {
      this.onInput(value);
      this.onChange(value);
    },
  },
};
</script>