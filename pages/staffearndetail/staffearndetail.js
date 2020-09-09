// pages/staffearndetail/staffearndetail.js
let DB = wx.cloud.database()
Page({
  data: {
    customersList: [],
    customersname: [],
    admin:'',
    user:''
  },
  onLoad: function (options) {
    this.setData({
      user: options.user
    })
    let that = this
    DB.collection("customers").get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          customersList: res.data
        })
      }
    }),
    DB.collection("userlist").get({
      success(res){
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].name == that.data.user){
            that.setData({
              usermessage: res.data[i]
            })
            console.log(that.data.usermessage)
          }
        }
      }
    })
  },
})