export default {
  inheritAttrs: false,
  props: {
    // 传入的表单数据
    attrsData: {
      type: Object,
    },
  },
  data() {
    return {
      // 当前组件表单数据
      formData: {},
      // 默认表单值的数据
      defaultFormData: {}
    };
  },
  // computed: {
  //   formData: {
  //     get() {
  //       return this.getDefaultFormData(this.attrsData);
  //     },
  //     set(val) {
  //       this.updateFormData(val);
  //     },
  //   },
  // },
  methods: {
    // 表单数据更新
    updateFormData(formData) {
      this.$emit("updateForm", formData);
    },
    // 将空值设置默认值
    getDefaultFormData(
      currentFormData = this.attrsData,
      defaultData = this.defaultFormData
    ) {
      let _currentFormData = currentFormData || {};
      for (const key in defaultData) {
        if (!_currentFormData[key]) _currentFormData[key] = defaultData[key];
      }
      return _currentFormData;
    },
  },
  watch: {
    formData: {
      handler(val) {
        this.updateFormData(val);
      },
      deep: true,
      immediate: true,
    },
    attrsData: {
      handler(value) {
        // 所传入的表单有数据时，则用传入的数据，没有则有默认值
        this.formData = Object.keys(value).length ? value : this.getDefaultFormData(value);
      },
      deep: true,
      immediate: true,
    },
  },
};