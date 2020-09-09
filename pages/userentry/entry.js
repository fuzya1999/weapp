// pages/entry/entry.js
Page({
  data: {
    admin:''
  },
  onLoad: function(option){
    let that = this
    that.setData({
      admin:option.toadmin
    })
    console.log(that.data.admin)
  },
  tochange:function(e){
    let that = this
    console.log(that.data.admin)
    let toadmin = that.data.admin
    wx.navigateTo({
      url: '/pages/program/program?toadmin'+'='
    +toadmin
    })
  },
  tochangetwo:function(e){
    let that = this
    console.log(that.data.admin)
    let toadmin = that.data.admin
    wx.navigateTo({
      url: '/pages/mine/mine?toadmin'+'='
    +toadmin
    })
  }
})