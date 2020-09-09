// pages/adminprogramdetail/adminprogramdetail.js
const DB = wx.cloud.database()

Page({

  data: {
    detailprduct: {},
    productname:'',
    customersList: [],
    customersname: [],
    admin:''
  },
  onLoad: function (option) {
    let that = this
    that.setData({
      admin: option.toadmin,
      productname: option.productname,
    })
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
          if(res.data[i].name == that.data.admin){
            that.setData({
              usermessage: res.data[i]
            })
            console.log(that.data.usermessage)
          }
        }
      }
    })
    DB.collection("products").get({
      success(res) {
        console.log("查询成功", res.data)
        that.setData({
          productList: res.data
        })
        for (let i = 0; i < that.data.productList.length; i++) {
          if (that.data.productList[i].product == that.data.productname){
            that.setData({
              detailprduct: that.data.productList[i],
            })
          }
        }
      }
    })
  }
})