<template>
  <div class="addArticle">
    <baseForm :formItems="formItems" :modelForm="modelForm" formRef="formAdd" :isRules="isRules" />
    <div class="btn_box">
      <el-button @click="back">返回</el-button>
      <el-button type="primary" class="deep" @click="sure">确定</el-button>
    </div>
  </div>
</template>

<script>
import baseForm from "@/components/baseForm";
export default {
  name: "addArticle",
  components: {
    baseForm
  },
  data() {
    let _this = this;
    return {
      formItems: [
        [
          {
            label: "标题：",
            type: "input",
            prop: "title",
            span: 8,
            inRule: true,
            message: "必填项不能为空"
          },
          {
            label: "关键字：",
            type: "input",
            prop: "keyWords",
            span: 8,
            inRule: true,
            message: "必填项不能为空"
          }
        ],
        [
          {
            label: "标签：",
            type: "select",
            prop: "tagName",
            options: [
              {
                label: "标签1",
                value: "标签1"
              },
              {
                label: "标签2",
                value: "标签2"
              },
              {
                label: "标签3",
                value: "标签3"
              },
              {
                label: "标签4",
                value: "标签4"
              }
            ],
            span: 8,
            inRule: true,
            message: "必填项不能为空"
          }
        ],
        [
          {
            label: "作者：",
            type: "input",
            prop: "userName",
            disabled: true,
            inRule: true,
            message: "必填项不能为空"
          }
        ],
        [
          {
            label: "缩略图：",
            type: "upload",
            prop: "img",
            fileList: [],
            successFun: res => {
              this.modelForm["img"] = res.link;
            },
            removeFun: (file, fileList) => {
              this.formItems[3][0].fileList = [];
              this.modelForm["img"] = "";
            }
          }
        ],
        [
          {
            label: "正文：",
            type: "editor",
            prop: "content",
            inRule: true,
            message: "必填项不能为空"
          }
        ]
      ],
      modelForm: {
        userName: "" || this.$store.state.user.userName
      },
      isRules: true
    };
  },
  methods: {
    back() {
      this.$router.push("articleManage");
    },
    sure() {
      this.$children[0].$refs["formAdd"].validate(validate => {
        if (validate) {
          this.$api.articleAPI
            .insertArticle(this.modelForm)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加成功！");
                this.$router.push("articleManage");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("请求错误！");
            });
        } else {
          this.$message.error("必填项不能为空！");
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>