<script>
import froalaEditor from "@/components/froalaEditor";
import imgUpload from "@/components/imgUpload";
export default {
  name: "baseForm",
  props: {
    labelWidth: {
      type: String,
      default: "200px"
    },
    inline: {
      type: Boolean,
      default: true
    },
    modelForm: {
      type: Object,
      default: () => {}
    },
    formItems: {
      type: Array,
      default: () => []
    },
    isRules: {
      type: Boolean,
      default: false
    },
    formRef: String
  },
  components: {
    froalaEditor
  },
  data() {
    return {
      config: {
        language: "zh_cn",
        height: 300,
        imageUploadURL: "/v1/upload" //'http://i.froala.com/upload'
      }
    };
  },
  methods: {
    renderFormItem(item) {
      const { modelForm, config } = this;
      const { type, label, prop, placeholder, span, disabled } = item;
      const widthStyle = "width:100%";
      if (type == "input") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <el-input
                v-model={modelForm[prop]}
                placeholder={placeholder}
                style={widthStyle}
                disabled={disabled}
              ></el-input>
            </el-form-item>
          </el-col>
        );
      } else if (type == "editor") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <froala v-model={modelForm[prop]} ref="editor" config={config} />
            </el-form-item>
          </el-col>
        );
      } else if (type == "select") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <el-select v-model={modelForm[prop]}>
                {item.options.length &&
                  item.options.map(ele => {
                    return (
                      <el-option
                        key={ele.value}
                        label={ele.label}
                        value={ele.value}
                      ></el-option>
                    );
                  })}
              </el-select>
            </el-form-item>
          </el-col>
        );
      } else if (type == "upload") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <div style={widthStyle}>
                <imgUpload
                  action={item.action}
                  accept={item.accept}
                  disabled={item.disabled}
                  fileList={item.fileList}
                  limit={1}
                  beforeUpload={file => {
                    if (!item.accept) {
                      if (!/^image\/(jpeg|png|jpg|gif|bmp)$/.test(file.type)) {
                        this.$message.error("上传文件格式暂不支持");
                        return false;
                      }
                    }
                    item.beforeUpload && item.beforeUpload(file);
                  }}
                  changeFun={(file, fileList) => {
                    item.changeFun && item.changeFun(file, fileList);
                  }}
                  successFun={(res, file, fileList) => {
                    item.successFun && item.successFun(res, file, fileList);
                  }}
                  removeFun={(file, fileList) => {
                    item.removeFun && item.removeFun(file, fileList);
                  }}
                ></imgUpload>
              </div>
            </el-form-item>
          </el-col>
        );
      } else if (type == "textarea") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <el-input
                type="textarea"
                v-model={modelForm[prop]}
                placeholder={placeholder}
                style={widthStyle}
                disabled={disabled}
              ></el-input>
            </el-form-item>
          </el-col>
        );
      } else if (type == "switch") {
        return (
          <el-col span={span}>
            <el-form-item class="form_item" label={label} prop={prop}>
              <el-switch
                v-model={modelForm[prop]}
                disabled={disabled}
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        );
      }
    },
    rowRender(item) {
      return <el-row>{item.map(ele => this.renderFormItem(ele))}</el-row>;
    }
  },
  render(h) {
    const {
      formItems,
      renderFormItem,
      labelWidth,
      inline,
      modelForm,
      formRef,
      rowRender,
      formRules
    } = this;
    return (
      <el-form
        label-width={labelWidth}
        inline={inline}
        ref={formRef}
        rules={formRules}
        {...{ props: { model: modelForm } }}
      >
        {formItems.map(item => {
          return rowRender(item);
        })}
      </el-form>
    );
  },
  computed: {
    formRules() {
      if (!this.isRules) return null;
      let rules = {};
      if (this.formItems && this.formItems.length) {
        this.formItems.forEach(ele => {
          ele.forEach(key => {
            if (key.inRule) {
              let obj = {};
              rules[key.prop] = [
                {
                  ...obj,
                  required: true,
                  message: key.message,
                  trigger:
                    key.type === "input" || key.type === "textarea"
                      ? "blur"
                      : "change"
                }
              ];
            }
          });
        });
      }
      return rules;
    }
  }
};
</script>

<style lang="scss">
.form_item {
  display: table !important;
  width: 100% !important;
  .el-form-item__label {
    display: table-cell !important;
  }
  .el-form-item__content {
    display: table-cell !important;
  }
}
.el-form {
  padding-right: 10%;
}
</style>