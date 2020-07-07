<script>
import addArticle from "@/views/addArticle";
export default {
  name: "editArticle",
  mixins: [addArticle],
  data() {
    return {
      modelForm: {}
    };
  },
  methods: {
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
          this.$router.push("articleManage");
        }
      }).catch(err => {
        this.$message.error("请求错误！");
      })
    },
    back() {
      this.$router.push("articleManage");
    }
  },
  mounted() {
    this.$api.articleAPI.queryArticleById({
      articleId: this. $route.query.id
    }).then(res => {
      if (res.data.code == 200) {
        this.modelForm = res.data.data;
        this.parsePhoto();
      } else {
        this.$message.error("请求错误！");
      }
    })
  },
  watch: {
  }
};
</script>

<style>
</style>