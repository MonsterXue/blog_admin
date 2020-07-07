<template>
  <div class="froalaEditor">
    <froala
      ref="editor"
      :id="editorName"
      :tag="'textarea'"
      :config="options"
      :value="value"
      @input="updateVal($event)"
    />
  </div>
</template>

<script>
export default {
  name: "froalaEditor",
  props: {
    editorName: String,
    options: {
      type: Object,
      default: () => {
        return {
          language: "zh_cn",
          height: 300
        };
      }
    },
    value: String
  },
  data() {
    return {
      textarea: ""
    };
  },
  methods: {
    updateVal(val) {
      this.$emit("input", val);
    }
  },
  mounted() {},
  watch: {
    value(newVal, oldVal) {
      this.$refs.editor.setContent(this.value);
    }
  }
};
</script>

<style>
</style>