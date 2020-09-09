// pages/staffearn/staffearn.js
let DB = wx.cloud.database()
Page({
  data: {
    userList: [],
    username:'',
    value: ''
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onLoad: function () {
    let that = this
    DB.collection("userlist").get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          userList: res.data
        })
        console.log(that.data.userList)
      }
    })
  },
  todetail: function(e){
    let user = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../staffearndetail/staffearndetail?user'+'='+user,
    })
  }
})