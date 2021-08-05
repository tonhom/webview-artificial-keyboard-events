<template>
  <div class="home">
    <div>version 1.8</div>
    <WebviewCustomInput
      :text.sync="name1"
      @onInput="onInput"
      @onChange="onChange"
      :interval="100"
      :debounce="750"
    />
    <button @click="resetDefault">Reset</button>
    <hr />
    onChange: {{ changeCounter }}, value: {{ name1 }}
    <hr />
    onInput: {{ latestInput }}
  </div>
</template>

<script>
// @ is an alias to /src
import WebviewCustomInput from "@/components/WebviewCustomInput.vue";

export default {
  name: "Home",
  components: {
    WebviewCustomInput,
  },
  data: () => ({
    listKey: [],
    name1: null,
    changeCounter: 0,
    latestInput: null,
  }),
  methods: {
    onInput(val) {
      this.latestInput = val;
      // this.listKey.push(e.data)
    },
    onChange(value) {
      this.changeCounter++;
      console.log("change", this.name1);
      // alert(this.name1);
    },
    resetDefault() {
      this.name1 = "Tonhom Buu";
    },
  },
};
</script>
