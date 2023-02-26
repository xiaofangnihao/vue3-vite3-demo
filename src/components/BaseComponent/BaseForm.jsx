import { computed, defineComponent, onMounted, ref, reactive } from "vue";
import "./BaseForm.less";

export default defineComponent({
  inheritAttrs: false,
  props: {
    formConfig: {
      type: Object,
      default: () => {},
    },
    formList: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
    selfRules: {
      type: Object,
      default: null,
    },
  },

  setup(props, { expose }) {
    // 让组件实例处于关闭状态, 不向父组件暴露任何东西
    // expose();
    function test() {
      console.log("我是子组件的方法");
    }
    const { formData, formList } = props;
    const labelWidth = computed(() => {
      if (!props.formConfig.labelWidth) return "150px";
      return typeof props.formConfig.labelWidth === "string"
        ? props.formConfig.labelWidth
        : `${props.formConfig.labelWidth}px`;
    });

    let rules = reactive({});

    function initRules() {
      if (props.selfRules) {
        rules = props.selfRules;
      } else {
        formList.flat().forEach((item) => {
          item.required &&
            (item.type === "input"
              ? (rules[item.prop] = [
                  {
                    required: true,
                    message: `请输入${item.label}`,
                    trigger: "blur",
                  },
                ])
              : (rules[item.prop] = [
                  {
                    required: true,
                    message: `请选择${item.label}`,
                    trigger: "change",
                  },
                ]));
        });
      }
    }

    initRules();

    // 获取对form的引用 在父组件中可以调用form实例
    const elForm = ref(null);

    onMounted(() => {
      // initRules();
      // console.log(rules);
    });

    function renderItems(item) {
      let len = 24 / item.length;
      return (
        <el-row>
          {item.map((child) => {
            return (
              <el-col span={len}>
                <el-form-item
                  key={child.prop}
                  label={child.label}
                  prop={child.prop}
                >
                  {renderFormItem(child)}
                </el-form-item>
              </el-col>
            );
          })}
        </el-row>
      );
    }

    function renderItem(item) {
      return (
        <el-row>
          <el-col>
            <el-form-item key={item.prop} label={item.label} prop={item.prop}>
              {renderFormItem(item)}
            </el-form-item>
          </el-col>
        </el-row>
      );
    }

    function renderFormItem(item) {
      switch (item.type) {
        case "input":
          return <BaseInput config={item} v-model={formData[item.prop]} />;
        case "select":
          return <BaseSelect config={item} v-model={formData[item.prop]} />;
        case "date":
          return <BaseDate config={item} v-model={formData[item.prop]} />;
        case "upload":
          return <BaseUpload />;
        case "cascader":
          return (
            <el-cascader
              v-model={formData[item.prop]}
              options={item.options}
              props={item.props}
              ref="cascader"
              placeholder={item.placeholder || "请选择"}
              onExpandChange={cascaderClick}
              onVisibleChange={cascaderClick}
            />
          );
      }
    }

    let cascader = ref(null);

    function cascaderClick() {
      setTimeout(function () {
        document.querySelectorAll(".el-cascader-node__label").forEach((el) => {
          el.onclick = function () {
            // 上一个兄弟元素
            this.previousElementSibling.click();
          };
        });
      }, 100);
    }

    return {
      test,
      elForm,
      labelWidth,
      formData,
      rules,
      initRules,
      renderItems,
      renderItem,
      renderFormItem,
      cascaderClick,
      cascader,
    };
  },

  render() {
    return (
      <div class="baseForm">
        <el-form
          ref="elForm"
          model={this.formData}
          labelWidth={this.labelWidth}
          rules={this.rules}
        >
          {this.formList.map((item) => {
            return Array.isArray(item)
              ? this.renderItems(item)
              : this.renderItem(item);
          })}
        </el-form>
      </div>
    );
  },
});
