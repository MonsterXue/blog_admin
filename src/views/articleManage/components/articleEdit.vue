<script>
import articleAdd from "./articleAdd.vue";
export default {
  name: "articleEdit",
  mixins: [articleAdd],
  data() {
    return {
      modelForm: {}
    };
  },
  methods: {
    getInfo(row) {
      setTimeout(() => {
        this.modelForm = { ...row };
        this.parsePhoto();
      });
    },
    parsePhoto() {
      if (this.modelForm["img"]) {
        this.formItems[3][0].fileList = [{
          name: this.modelForm["img"],
          url: this.modelForm["img"]
        }];
      }    
    },
    sure() {
      this.$api.articleAPI.updateArticle(this.modelForm).then(res => {
        if (res.data.code == 200) {
          this.$message.success("更新成功！");
          this.$parent.Init();
        }
      }).catch(err => {
        this.$message.error("请求错误！");
      })
    },
    back() {
      this.$parent.Init();
    }
  },
  mounted() {},
  watch: {
  }
};
</script>

<style>
</style>