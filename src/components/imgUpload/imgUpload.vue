<template>
  <el-upload
    :action="action"
    list-type="picture-card"
    :accept="accept"
    :disabled="disabled"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-success="successFun"
    :on-change="changeFun"
    :on-remove="removeFun"
    :limit="limit"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>


<script>
export default {
  name: "imgUpload",
  props: {
    accept: String,
    action: {
      type: String,
      default: "v1/upload"//"http://i.froala.com/upload"
    },
    beforeUpload: Function,
    successFun: Function,
    changeFun: Function,
    removeFun: Function,
    limit: {
      type: Number,
      default: 3
    },
    fileList: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>