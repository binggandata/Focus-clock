var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["概率类指标", "均值类指标"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

    proFormData: {
      title: "概率类",
      formData: {
        1: "",
        2: "",
        3: "",
        4: ""
      },
      options: [
        {
          title: "原始指标",
          key: "1",
          type: "number",
          rules: true
        },
        {
          title: "最小可检测相对提升",
          key: "2",
          type: "number",
          rules: true
        },
        {
          title: "分组总数",
          key: "3",
          type: "number",
          rules: true
        },
        {
          title: "置信水平",
          key: "95%",
          type: "selector",
          rules: true,
          option: {
            data: ["80%", "85%", "90%","95%"]
          }
        },
      ],
      rules: []
    },

    avgFormData: {
      title: "均值类",
      formData: {
        1: "",
        2: "",
        3: "",
        4: ""
      },
      options: [
        {
          title: "标准差",
          key: "1",
          type: "number",
          rules: true
        },
        {
          title: "最小可检测绝对提升",
          key: "2",
          type: "number",
          rules: true
        },
        {
          title: "分组总数",
          key: "3",
          type: "number",
          rules: true
        },
        {
          title: "置信水平",
          key: "95%",
          type: "selector",
          rules: true,
          option: {
            data: ["80%", "85%", "90%","95%"]
          }
        },
      ],
      rules: []
    },

    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    logs: [],
    toastHidden: true,
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length *that.data.activeIndex
        });
      }
    });
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: 'A/B测试样本量计算器'
    })

  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 提交表单 https://phpsdk.cn/plug/news/show.html?id=21065
  submitForm() {
    // 获取组件对象
    const myForm = this.selectComponent("#my-form");
    // 调用验证方法
    if (myForm.validate()) {
      console.log(myForm.data.formData);
    }
  }
})
