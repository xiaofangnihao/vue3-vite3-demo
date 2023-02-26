import { computed, defineComponent, ref } from "vue";
import "./index.less";

export default defineComponent({
  inheritAttrs: false,
  emits: ["search", "reset"],
  props: {
    searchList: {
      type: Array,
      default: () => [],
    },
    searchForm: {
      type: Object,
      default: () => ({}),
    },
    labelWidth: String,
  },

  setup(props, { emit }) {
    const { searchList, searchForm } = props;
    const labelWidth = computed(() => {
      if (!props.labelWidth) return "100px";
      return typeof props.labelWidth === "string"
        ? props.labelWidth
        : `${props.labelWidth}px`;
    });

    // 获取对form的引用 在父组件中可以调用form实例
    const elForm = ref(null);

    function renderItem(item, index) {
      return (
        <el-col span={6}>
          <el-form-item key={item.prop} label={item.label} prop={item.prop}>
            {renderFormItem(item)}
          </el-form-item>
        </el-col>
      );
    }

    function renderFormItem(item) {
      switch (item.type) {
        case "input":
          return <BaseInput config={item} v-model={searchForm[item.prop]} />;
        case "select":
          return <BaseSelect config={item} v-model={searchForm[item.prop]} />;
        case "date":
          return <BaseDate config={item} v-model={searchForm[item.prop]} />;
        case "upload":
          return <BaseUpload />;
      }
    }

    function search() {
      console.log("搜索方法");
      emit("search");
    }

    function reset() {
      console.log("重置");
      emit("reset");
    }

    return {
      searchList,
      searchForm,
      elForm,
      labelWidth,
      renderItem,
      renderFormItem,
      search,
      reset,
    };
  },

  render() {
    return (
      <div class="search-form">
        <el-form
          ref="searchForm"
          model={this.searchForm}
          labelWidth={this.labelWidth}
        >
          <el-row>
            {this.searchList.map((item, index) => {
              return this.renderItem(item, index);
            })}
            <el-col span={6}>
              <el-form-item>
                <el-button class="search" onClick={this.search}>
                  查询
                </el-button>
                <el-button class="reset" type="info" onClick={this.reset}>
                  重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    );
  },
});
