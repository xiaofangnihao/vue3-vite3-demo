import { defineComponent } from "vue";
import UseDefault from "./examples/templateRef/useDefault.vue";
import UseSetup from "./examples/templateRef/useSetup.vue";
import ComputedComponent from "./examples/computed/index.vue";
import ProvideInject from "./examples/provideInject/index.vue";
import CompositionApi from "./examples/compositionApi/index.vue";
import UnknownModule from "./examples/unknownModule/index.vue";
import Props from "./examples/props/index.vue";

export default defineComponent({
  components: {
    UseDefault,
    UseSetup,
    ComputedComponent,
    ProvideInject,
    CompositionApi,
    UnknownModule,
    Props,
  },
});
