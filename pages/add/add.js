// pages/add/add.js
import Toast from '@vant/weapp/toast/toast';
const DB = wx.cloud.database()
Page({
  data: {
    name: '',
    password: '',
    sno: '',
    imgs: [],
    a:''
  },
  onChangename(event) {
    let that = this
    console.log(event.detail.value)
    this.setData({
      name: event.detail.value
    })
    console.log(that.data.name)

  },
  onChangepassword(event) {
    let that = this

    console.log(event.detail.value)

    this.setData({
      password: event.detail.value
    })
    console.log(that.data.password)

  },
  onChangesno(event) {
    let that = this

    console.log(event.detail.value)

    this.setData({
      sno: event.detail.value
    })
    console.log(that.data.sno)

  },
  adduser: function (options) {
    let that = this
    DB.collection("userlist").add({
      data:{
        name: that.data.name,
        password: parseInt(that.data.password),
        sno: parseInt(that.data.sno),
        userimg: that.data.a,
        salesvolume: 0,
        sellout: 0,
        userearn: 0
      },
      success(res) {
        Toast.success('添加成功，3秒后返回');
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 3000)
      }
    })
  },
    // 上传图片
    chooseImg: function (e) {
      var that = this;
      var imgs = this.data.imgs;
      if (imgs.length >= 9) {
        this.setData({
          lenMore: 1
        });
        setTimeout(function () {
          that.setData({
            lenMore: 0
          });
        }, 2500);
        return false;
      }
      wx.chooseImage({
        // count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          that.setData({
            a:res.tempFilePaths[0]
          })
          var imgs = that.data.imgs;
          console.log(that.data.tempFilePaths + '----');
          for (var i = 0; i < tempFilePaths.length; i++) {
            if (imgs.length >= 9) {
              that.setData({
                imgs: imgs
              });
              return false;
            } else {
              imgs.push(tempFilePaths[i]);
            }
          }
          // console.log(imgs);
          that.setData({
            imgs: imgs
          });
        }
      });
    },
    // 删除图片
    deleteImg: function (e) {
      var imgs = this.data.imgs;
      var index = e.currentTarget.dataset.index;
      imgs.splice(index, 1);
      this.setData({
        imgs: imgs
      });
    },
    // 预览图片
    previewImg: function (e) {
      //获取当前图片的下标
      var index = e.currentTarget.dataset.index;
      //所有图片
      var imgs = this.data.imgs;
      wx.previewImage({
        //当前显示图片
        current: imgs[index],
        //所有图片
        urls: imgs
      })
    },
})