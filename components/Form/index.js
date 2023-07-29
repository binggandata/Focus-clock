// components/Form/index.js
Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
      // 表单绑定数据，用于初始化
      formData: {
        type: Object,
        value: {}
      },
      // 表单配置
      options: {
        type: Array,
        value: []
      },
      // 表单验证规则
      rules: {
        type: Array,
        value: []
      },
      // 卡片标题
      title: {
        type: String,
        value: ""
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      fileKey: ""
    },
  
    /**
     * 组件生命周期函数-在组件布局完成后执行)
     */
    ready: function () {
      // 初始化表单验证
      this.addRules(this.properties.options);
      // 初始化上传文件事件
      this.setData({
        uplaodFile: this.uplaodFile.bind(this)
      });
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      // 初始化表单验证
      addRules(options) {
        for (let i = 0; i < options.length; i++) {
          // 判断用户是否已经自定义验证了
          var result = this.data.rules.some(function (item) {
            if (item.name == options[i].key) {
              return true;
            }
          });
  
          // 如果没有自定义就执行
          if (!result) {
            // 动态生成验证方法
            let data = {
              name: options[i].key,
              rules: {
                required: options[i].rules ? true : false,
                message: options[i].title + "是必填项"
              }
            };
  
            // 动态添加验证规则
            let index = this.data.rules.length;
            this.setData({
              [`rules[${index}]`]: data
            });
          }
        }
      },
  
      // 表单发生改变事件
      formInputChange(e) {
        // 获取key
        const { field } = e.currentTarget.dataset;
        // 动态修改值
        this.setData({
          [`formData.${field}`]: e.detail.value
        });
      },
  
      // 表单验证
      validate() {
        // 验证结果
        let isValidate = false;
  
        // 开始验证
        this.selectComponent("#form").validate((valid, errors) => {
          if (!valid) {
            // 验证不过
            // console.log('valid', valid, errors);
            const firstError = Object.keys(errors);
            if (firstError.length) {
              wx.showToast({
                icon: "error",
                title: errors[firstError[0]].message
              });
            }
          } else {
            // 验证通过
            isValidate = true;
          }
        });
  
        // 返回验证结果
        return isValidate;
      },
  
      // 临时存储图片上传指定的key
      formFileChange(event) {
        this.setData({
          fileKey: event.currentTarget.dataset.field
        });
      },
  
      // 图片上传
      uplaodFile(files) {
        // console.log('upload files', files);
        const tempFilePaths = files.tempFilePaths[0];
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            url: "url",
            filePath: tempFilePaths,
            name: "file",
            header: {
              "content-type": "multipart/form-data"
            },
            success: res => {
              // res.data 是由你们后端返回的相关数据
              const data = JSON.parse(res.data);
              console.log(data);
              let urls = [data.data];
              // 格式： {urls: ["后端返回的图片地址"]}
              resolve({
                urls: urls
              });
            },
            fial: () => {
              reject("error");
            }
          });
        });
      },
  
      // 图片上传成功
      uploadSuccess(e) {
        console.log(e.detail);
        // 获取图片指定的key
        const field = this.data.fileKey;
        let data = [
          {
            url: e.detail.urls[0]
          }
        ];
        // 动态赋值图片指定key的数据
        this.setData({
          [`formData.${field}`]: data
        });
        // console.log('upload success', e.detail);
      }
    }
  });